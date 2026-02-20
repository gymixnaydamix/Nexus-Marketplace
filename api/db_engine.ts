
import { World, Role, User, Product, Order, Rule, AuditLog, SystemState, ListingTemplate } from '../types';

const STORAGE_KEY = 'NEXUS_OS_KERNEL_STATE_V1';

export interface DBState {
  users: User[];
  products: Product[];
  orders: Order[];
  rules: Rule[];
  auditLogs: AuditLog[];
  templates: ListingTemplate[];
  wallets: Record<string, { balance: number; escrow: number }>;
  system: SystemState;
}

const INITIAL_STATE: DBState = {
  system: {
    incidentMode: false,
    incidentReason: '',
    lastUpdate: new Date().toISOString()
  },

  users: [
    { id: 'u-1', name: 'Alex Rivera', role: Role.SUPER_ADMIN, world: World.ELECTRONICS, email: 'admin@nexus.os' },
    { id: 'u-2', name: 'Jordan Vane', role: Role.SELLER, world: World.FASHION, email: 'jordan@vane.fashion' },
    { id: 'u-3', name: 'Lia Sky', role: Role.BUYER, world: World.FASHION, email: 'lia@sky.res' },
    { id: 'u-4', name: 'Marcus Chen', role: Role.MODERATOR, world: World.ELECTRONICS, email: 'marcus@nexus.os' },
    { id: 'u-5', name: 'Elena Vance', role: Role.DELIVERY_PARTNER, world: World.CARS, email: 'elena@nexus.logistics' },
    { id: 'u-6', name: 'Titan Realty', role: Role.SELLER, world: World.REAL_ESTATE, email: 'ops@titan.re' },
  ],

  products: [
    { id: 'p-e1', title: 'Nexus Fold Pro 2035', price: 2499, currency: 'USD', category: 'Smartphones', status: 'active', stock: 120, threshold: 25, warehouseStock: { 'WH-NE-01': 80 }, sellerId: 'u-1', world: World.ELECTRONICS, thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600', condition: 'New Epoch', region: 'North America', sellerRating: 4.9, deliveryMethod: 'Sky-Drone' },
    { id: 'p-c1', title: 'Aether X-1 Hovercraft', price: 85000, currency: 'USD', category: 'Autonomous', status: 'active', stock: 2, threshold: 1, warehouseStock: { 'WH-EU-05': 2 }, sellerId: 'u-5', world: World.CARS, thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600', condition: 'New Epoch', region: 'European Union', sellerRating: 4.7, deliveryMethod: 'Orbital' },
    { id: 'p-r1', title: 'Zen Pod Modular Villa', price: 450000, currency: 'USD', category: 'Modular Villas', status: 'active', stock: 5, threshold: 2, warehouseStock: { 'WH-AS-09': 5 }, sellerId: 'u-6', world: World.REAL_ESTATE, thumbnail: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=600', condition: 'New Epoch', region: 'Southeast Asia', sellerRating: 5.0, deliveryMethod: 'Surface' },
    { id: 'p-cl1', title: 'Carbon-Fiber Tuxedo', price: 850, currency: 'USD', category: 'Clothes', status: 'active', stock: 30, threshold: 5, warehouseStock: { 'WH-NE-01': 30 }, sellerId: 'u-2', world: World.FASHION, thumbnail: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600', condition: 'New Epoch', region: 'North America', sellerRating: 4.8, deliveryMethod: 'Sky-Drone' },
  ],

  templates: [
    { id: 'tmpl-1', name: 'Standard Neural Interface', category: 'Smartphones', complexity: 'Basic', usageCount: 42, world: World.ELECTRONICS, lastUsed: '2035-05-10' },
    { id: 'tmpl-2', name: 'Luxury Modular Unit', category: 'Modular Villas', complexity: 'High', usageCount: 5, world: World.REAL_ESTATE, lastUsed: '2035-05-12' },
  ],

  orders: [
    { id: 'ord-101', productId: 'p-e1', buyerId: 'u-3', sellerId: 'u-1', status: 'processing', total: 2499, timestamp: '2035-05-10T14:30:00Z', world: World.ELECTRONICS, trackingId: 'TRK-992-AX', manifestId: 'MNF-10293' },
    { id: 'ord-102', productId: 'p-cl1', buyerId: 'u-3', sellerId: 'u-2', status: 'pending', total: 850, timestamp: '2035-05-11T10:15:00Z', world: World.FASHION, trackingId: 'TRK-112-BV' },
  ],

  rules: [
    { id: 'r-1', name: 'High-Value Fashion Escrow', description: 'Manual review for luxury clothes/shoes > $5,000', condition: 'price > 5000', threshold: 5000, action: 'HOLD_PAYOUT', isActive: true },
    { id: 'r-2', name: 'New Entity Scrutiny', description: 'Flag listings from accounts < 30 days old', condition: 'sellerAge < 30', threshold: 30, action: 'ROUTE_MODERATION', isActive: true },
  ],

  auditLogs: [
    { id: 'log-1', timestamp: '2035-05-12T08:00:00Z', userId: 'u-1', userName: 'Alex Rivera', action: 'BOOT_KERNEL', entity: 'Kernel Core v4.2', ip: '10.0.35.201', device: 'Nexus Primary' },
  ],
  
  wallets: {
    'u-1': { balance: 1000000, escrow: 0 },
    'u-2': { balance: 45000, escrow: 1200 },
    'u-3': { balance: 850000, escrow: 2499 },
    'u-4': { balance: 2500, escrow: 0 },
    'u-5': { balance: 12400, escrow: 0 },
    'u-6': { balance: 5000000, escrow: 0 },
  }
};

class DBManager {
  private state: DBState;

  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY);
    this.state = saved ? JSON.parse(saved) : INITIAL_STATE;
  }

  get users() { return this.state.users; }
  get products() { return this.state.products; }
  get orders() { return this.state.orders; }
  get rules() { return this.state.rules; }
  get templates() { return this.state.templates; }
  get auditLogs() { return this.state.auditLogs; }
  get wallets() { return this.state.wallets; }
  get system() { return this.state.system; }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
  }

  reset() {
    this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
    this.save();
  }
}

export const DB = new DBManager();
