
import { DB } from './db_engine';
import { rulesEngine } from './rules_engine';
import { Role, World, User, Product, Order, Rule, AuditLog, SystemState } from '../types';

class NexusOSKernel {
  private logAction(userId: string, action: string, entity: string, before?: any, after?: any) {
    const user = DB.users.find(u => u.id === userId);
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toISOString(),
      userId,
      userName: user?.name || 'System',
      action,
      entity,
      before,
      after,
      ip: '10.0.35.201',
      device: 'Nexus Core v4.2'
    };
    DB.auditLogs.unshift(newLog);
    DB.save();
    return newLog;
  }

  getSystemStatus(): SystemState {
    return DB.system;
  }

  async toggleIncidentMode(userId: string, active: boolean, reason: string) {
    const before = { ...DB.system };
    DB.system.incidentMode = active;
    DB.system.incidentReason = reason;
    DB.system.lastUpdate = new Date().toISOString();
    this.logAction(userId, 'SYSTEM_LOCKDOWN_TOGGLE', 'Kernel Global', before, DB.system);
    DB.save();
  }

  getProducts(world: World) {
    return DB.products.filter(p => p.world === world);
  }

  getAuditLogs() {
    return DB.auditLogs;
  }

  async updateUserRole(adminId: string, userId: string, role: Role) {
    const user = DB.users.find(u => u.id === userId);
    if (!user) return;
    const before = user.role;
    user.role = role;
    this.logAction(adminId, 'UPDATE_ROLE', userId, { role: before }, { role });
    DB.save();
  }

  async setRuleStatus(userId: string, ruleId: string, active: boolean) {
    const rule = DB.rules.find(r => r.id === ruleId);
    if (!rule) return;
    const before = rule.isActive;
    rule.isActive = active;
    this.logAction(userId, 'TOGGLE_RULE', ruleId, { active: before }, { active });
    DB.save();
  }

  getModerationQueue() {
    return DB.products.filter(p => p.status === 'under_review');
  }

  async createProduct(userId: string, product: Partial<Product>) {
    if (DB.system.incidentMode) throw new Error("Kernel is in lockdown mode.");
    
    const newProduct: Product = {
      id: `p-${Date.now()}`,
      title: product.title || 'Draft Product',
      price: product.price || 0,
      currency: 'USD',
      category: product.category || 'General',
      status: 'active',
      stock: product.stock || 1,
      threshold: product.threshold || 5,
      warehouseStock: product.warehouseStock || {},
      sellerId: userId,
      world: product.world || World.ELECTRONICS,
      thumbnail: product.thumbnail || `https://picsum.photos/seed/${Math.random()}/400/300`,
      condition: product.condition || 'New Epoch',
      region: product.region || 'North America',
      sellerRating: product.sellerRating || 5.0,
      deliveryMethod: product.deliveryMethod || 'Surface'
    };

    const interventions = await rulesEngine.evaluateProduct(newProduct);
    if (interventions.includes('ROUTE_MODERATION')) {
      newProduct.status = 'under_review';
      this.logAction('system', 'RULE_INTERVENTION', newProduct.id, 'status:active', 'status:under_review');
    }

    DB.products.unshift(newProduct);
    this.logAction(userId, 'CREATE_PRODUCT', newProduct.id, null, newProduct);
    DB.save();
    return newProduct;
  }

  async processOrderTransition(userId: string, orderId: string, nextStatus: Order['status']) {
    const order = DB.orders.find(o => o.id === orderId);
    if (!order) throw new Error("Order not found");

    const before = { ...order };
    order.status = nextStatus;
    
    if (nextStatus === 'delivered') {
      const sellerWallet = DB.wallets[order.sellerId];
      if (sellerWallet) {
        sellerWallet.balance += order.total;
        sellerWallet.escrow -= order.total;
      }
    }

    this.logAction(userId, 'TRANSITION_ORDER', orderId, before, order);
    DB.save();
    return order;
  }

  async createOrder(buyerId: string, productId: string) {
    if (DB.system.incidentMode) throw new Error("Market acquisition paused during incident.");
    
    const product = DB.products.find(p => p.id === productId);
    if (!product || product.stock <= 0) throw new Error("Invalid Product");

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      productId,
      buyerId,
      sellerId: product.sellerId,
      status: 'pending',
      total: product.price,
      timestamp: new Date().toISOString(),
      world: product.world,
      trackingId: `TRK-${Math.random().toString(36).substring(7).toUpperCase()}`
    };

    const interventions = await rulesEngine.evaluateOrder(newOrder);
    if (interventions.includes('HOLD_PAYOUT')) {
      this.logAction('system', 'RULE_TRIGGERED', newOrder.id, null, 'FISCAL_HOLD_APPLIED');
    }

    product.stock -= 1;
    DB.orders.unshift(newOrder);
    
    if (!DB.wallets[product.sellerId]) DB.wallets[product.sellerId] = { balance: 0, escrow: 0 };
    DB.wallets[product.sellerId].escrow += product.price;

    this.logAction(buyerId, 'ORDER_CREATED', newOrder.id, null, newOrder);
    DB.save();
    return newOrder;
  }

  async deleteRule(userId: string, ruleId: string) {
    const index = DB.rules.findIndex(r => r.id === ruleId);
    if (index > -1) {
      this.logAction(userId, 'DELETE_RULE', ruleId);
      DB.rules.splice(index, 1);
      DB.save();
    }
  }

  async addRule(userId: string, rule: Rule) {
    DB.rules.push(rule);
    this.logAction(userId, 'ADD_RULE', rule.id);
    DB.save();
  }
}

export const kernel = new NexusOSKernel();
