
export enum Role {
  GUEST = 'GUEST',
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  STORE_MANAGER = 'STORE_MANAGER',
  DELIVERY_PARTNER = 'DELIVERY_PARTNER',
  MODERATOR = 'MODERATOR',
  FINANCE = 'FINANCE',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export enum PermissionAction {
  view = 'view',
  create = 'create',
  edit = 'edit',
  delete = 'delete',
  export = 'export',
  approve = 'approve',
  refund = 'refund',
  escalate = 'escalate',
  manage_users = 'manage_users',
  manage_rules = 'manage_rules'
}

export const ROLE_PERMISSIONS: Record<Role, PermissionAction[]> = {
  [Role.GUEST]: [PermissionAction.view],
  [Role.BUYER]: [PermissionAction.view, PermissionAction.create],
  [Role.SELLER]: [PermissionAction.view, PermissionAction.create, PermissionAction.edit],
  [Role.STORE_MANAGER]: [PermissionAction.view, PermissionAction.create, PermissionAction.edit, PermissionAction.export],
  [Role.DELIVERY_PARTNER]: [PermissionAction.view, PermissionAction.edit],
  [Role.MODERATOR]: [PermissionAction.view, PermissionAction.approve, PermissionAction.escalate],
  [Role.FINANCE]: [PermissionAction.view, PermissionAction.export, PermissionAction.refund],
  [Role.ADMIN]: [PermissionAction.view, PermissionAction.create, PermissionAction.edit, PermissionAction.export, PermissionAction.approve, PermissionAction.refund, PermissionAction.escalate, PermissionAction.manage_rules],
  [Role.SUPER_ADMIN]: Object.values(PermissionAction)
};

export enum World {
  ELECTRONICS = 'ELECTRONICS',
  CARS = 'CARS',
  REAL_ESTATE = 'REAL_ESTATE',
  INDUSTRIAL = 'INDUSTRIAL',
  FASHION = 'FASHION'
}

export interface User {
  id: string;
  name: string;
  role: Role;
  world: World;
  email: string;
  avatar?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  before?: any;
  after?: any;
  ip: string;
  device: string;
}

export interface NavSection {
  id: string;
  label: string;
  icon: string;
  tabs: NavTab[];
  requiredRole?: Role[];
}

export interface NavTab {
  id: string;
  label: string;
  subnav: SubNavItem[];
  requiredPermission?: PermissionAction;
}

export interface SubNavItem {
  id: string;
  label: string;
  component: string;
  icon?: string;
  requiredPermission?: PermissionAction;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  category: string;
  status: 'active' | 'draft' | 'under_review' | 'sold';
  stock: number;
  threshold: number;
  warehouseStock: Record<string, number>;
  sellerId: string;
  world: World;
  thumbnail: string;
  condition: 'New Epoch' | 'Certified Refurb' | 'Legacy Tech';
  region: 'North America' | 'European Union' | 'Southeast Asia' | 'Neutral Zone';
  sellerRating: number;
  deliveryMethod: 'Sky-Drone' | 'Hyper-Rail' | 'Surface' | 'Orbital';
}

export interface ListingTemplate {
  id: string;
  name: string;
  category: string;
  complexity: 'Basic' | 'High';
  usageCount: number;
  world: World;
  lastUsed: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  timestamp: string;
  world: World;
  trackingId?: string;
  manifestId?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isSystem?: boolean;
}

export interface Rule {
  id: string;
  name: string;
  description: string;
  condition: string;
  threshold: number;
  action: string;
  isActive: boolean;
}

export interface SystemState {
  incidentMode: boolean;
  incidentReason: string;
  lastUpdate: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
  status: 'published' | 'draft';
}

export interface Escalation {
  id: string;
  ticketId: string;
  reason: string;
  level: number;
  timestamp: string;
}
