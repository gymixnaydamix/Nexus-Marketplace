
import { kernel } from '../api/nexus_os_kernel';
import { World, Role, Product, Order } from '../types';
import { DB } from '../api/db_engine';

/**
 * NexusOS API Client
 * This service mimics a network-based API client but interacts 
 * directly with the Nexus OS Kernel in memory.
 */
export const NexusAPI = {
  // Discovery
  fetchProducts: (world: World) => kernel.getProducts(world),
  
  // Inventory
  submitListing: (userId: string, data: Partial<Product>) => kernel.createProduct(userId, data),
  
  // Operations
  fetchOrders: () => DB.orders,
  updateOrderStatus: (userId: string, orderId: string, status: Order['status']) => 
    kernel.processOrderTransition(userId, orderId, status),

  // Governance
  fetchAuditLogs: () => kernel.getAuditLogs(),
  updateRole: (adminId: string, userId: string, role: Role) => 
    kernel.updateUserRole(adminId, userId, role),
    
  toggleSafetyRule: (userId: string, ruleId: string, active: boolean) => 
    kernel.setRuleStatus(userId, ruleId, active),

  // Finance
  fetchModerationQueue: () => kernel.getModerationQueue(),

  // EXPORT LOGIC (New Functional Methods)
  generateExport: async (sectors: string[], format: string) => {
    let data: any = {};
    if (sectors.includes('Listing Manifest')) data.listings = DB.products;
    if (sectors.includes('Revenue Ledger')) data.orders = DB.orders;
    if (sectors.includes('Operational Logs')) data.audit = DB.auditLogs;
    if (sectors.includes('Identity Matrix')) data.users = DB.users;

    const content = JSON.stringify(data, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nexus_export_${Date.now()}.${format.toLowerCase().includes('json') ? 'json' : 'csv'}`;
    link.click();
    URL.revokeObjectURL(url);
  },

  performAudit: async () => {
    // Cross-verify escrow totals
    const totalOrdersInEscrow = DB.orders
      .filter(o => o.status === 'processing' || o.status === 'pending')
      .reduce((sum, o) => sum + o.total, 0);
    
    const actualEscrowInWallets = Object.values(DB.wallets)
      .reduce((sum, w) => sum + w.escrow, 0);

    return {
      match: totalOrdersInEscrow === actualEscrowInWallets,
      calculated: totalOrdersInEscrow,
      actual: actualEscrowInWallets,
      timestamp: new Date().toISOString()
    };
  }
};
