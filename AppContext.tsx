
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Role, World, User, NavSection, NavTab, SubNavItem, AuditLog, Product, Rule, Order, CartItem, Message, ROLE_PERMISSIONS, PermissionAction, SystemState, ListingTemplate } from './types';
import { NAVIGATION } from './constants';
import { NexusAPI } from './services/api_service';
import { DB } from './api/db_engine';
import { kernel } from './api/nexus_os_kernel';

interface AppContextType {
  activeSection: NavSection;
  activeTab: NavTab;
  activeSubItem: SubNavItem;
  activeWorld: World;
  activeProductId: string | null;
  currentUser: User;
  auditLogs: AuditLog[];
  products: Product[];
  orders: Order[];
  rules: Rule[];
  users: User[];
  templates: ListingTemplate[];
  cart: CartItem[];
  messages: Message[];
  system: SystemState;
  
  setActiveSectionById: (id: string) => void;
  setActiveTabById: (id: string) => void;
  setActiveSubItemById: (id: string) => void;
  setActiveWorld: (world: World) => void;
  setActiveProductId: (id: string | null) => void;
  
  // Cart Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  
  // Service Handlers
  createProduct: (p: Partial<Product>) => Promise<void>;
  createTemplate: (t: Partial<ListingTemplate>) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
  toggleRule: (id: string) => Promise<void>;
  updateUserRole: (id: string, role: Role) => Promise<void>;
  processOrder: (id: string, status: Order['status']) => Promise<void>;
  purchaseProduct: (productId: string) => Promise<void>;
  checkoutCart: () => Promise<void>;
  sendMessage: (text: string) => void;
  refreshState: () => void;
  resetKernel: () => void;
  toggleIncidentMode: (active: boolean, reason: string) => Promise<void>;
  
  // Auth Helpers
  switchUser: (userId: string) => void;
  hasPermission: (action: PermissionAction) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(DB.users[0]);
  const [activeSection, setActiveSection] = useState<NavSection>(NAVIGATION[0]);
  const [activeTab, setActiveTab] = useState<NavTab>(NAVIGATION[0].tabs[0]);
  const [activeSubItem, setActiveSubItem] = useState<SubNavItem>(NAVIGATION[0].tabs[0].subnav[0]);
  const [activeWorld, setActiveWorld] = useState<World>(World.ELECTRONICS);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [rules, setRules] = useState<Rule[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [templates, setTemplates] = useState<ListingTemplate[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [system, setSystem] = useState<SystemState>(DB.system);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'm-1', senderId: 'system', text: 'Secure Link Established. Protocol 2035.4 active.', timestamp: new Date().toISOString(), isSystem: true }
  ]);

  const refreshState = () => {
    setProducts([...DB.products]);
    setOrders([...DB.orders]);
    setRules([...DB.rules]);
    setUsers([...DB.users]);
    setTemplates([...DB.templates]);
    setAuditLogs([...DB.auditLogs]);
    setSystem({ ...DB.system });
  };

  const resetKernel = () => {
    DB.reset();
    refreshState();
  };

  const switchUser = (id: string) => {
    const user = DB.users.find(u => u.id === id);
    if (user) {
      setCurrentUser(user);
      setActiveSectionById('home');
    }
  };

  const hasPermission = (action: PermissionAction): boolean => {
    return ROLE_PERMISSIONS[currentUser.role].includes(action);
  };

  useEffect(() => {
    refreshState();
  }, [activeWorld]);

  const setActiveSectionById = (id: string) => {
    const section = NAVIGATION.find(s => s.id === id);
    if (section) {
      setActiveSection(section);
      setActiveTab(section.tabs[0]);
      setActiveSubItem(section.tabs[0].subnav[0]);
      setActiveProductId(null);
    }
  };

  const setActiveTabById = (id: string) => {
    const tab = activeSection.tabs.find(t => t.id === id);
    if (tab) {
      setActiveTab(tab);
      setActiveSubItem(tab.subnav[0]);
      setActiveProductId(null);
    }
  };

  const setActiveSubItemById = (id: string) => {
    const item = activeTab.subnav.find(i => i.id === id);
    if (item) {
      setActiveSubItem(item);
      setActiveProductId(null);
    }
  };

  const addToCart = (product: Product) => {
    if (system.incidentMode) {
      alert("Cart Acquisition Paused: System Lockdown Active");
      return;
    }
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const createProduct = async (p: Partial<Product>) => {
    await NexusAPI.submitListing(currentUser.id, { ...p, world: activeWorld });
    refreshState();
  };

  const createTemplate = async (t: Partial<ListingTemplate>) => {
    const newT: ListingTemplate = {
        id: `tmpl-${Date.now()}`,
        name: t.name || 'Untitled Template',
        category: t.category || 'General',
        complexity: t.complexity || 'Basic',
        usageCount: 0,
        world: activeWorld,
        lastUsed: new Date().toISOString().split('T')[0]
    };
    DB.templates.unshift(newT);
    DB.save();
    refreshState();
  };

  const deleteTemplate = async (id: string) => {
    const idx = DB.templates.findIndex(t => t.id === id);
    if (idx > -1) {
        DB.templates.splice(idx, 1);
        DB.save();
        refreshState();
    }
  };

  const toggleRule = async (id: string) => {
    const rule = rules.find(r => r.id === id);
    if (rule) {
      await NexusAPI.toggleSafetyRule(currentUser.id, id, !rule.isActive);
      refreshState();
    }
  };

  const purchaseProduct = async (productId: string) => {
    try {
      await kernel.createOrder(currentUser.id, productId);
      refreshState();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const checkoutCart = async () => {
    if (system.incidentMode) {
      alert("Checkout Paused: System Lockdown Active");
      return;
    }
    for (const item of cart) {
      await purchaseProduct(item.product.id);
    }
    clearCart();
  };

  const sendMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toISOString()
    }]);
  };

  const updateUserRole = async (id: string, role: Role) => {
    await NexusAPI.updateRole(currentUser.id, id, role);
    refreshState();
  };

  const processOrder = async (id: string, status: Order['status']) => {
    await NexusAPI.updateOrderStatus(currentUser.id, id, status);
    refreshState();
  };

  const toggleIncidentMode = async (active: boolean, reason: string) => {
    await kernel.toggleIncidentMode(currentUser.id, active, reason);
    refreshState();
  };

  return (
    <AppContext.Provider value={{
      activeSection, activeTab, activeSubItem, activeWorld, activeProductId,
      currentUser, auditLogs, products, orders, rules, users, templates,
      cart, messages, system,
      setActiveSectionById, setActiveTabById, setActiveSubItemById, setActiveWorld, setActiveProductId,
      addToCart, removeFromCart, clearCart,
      createProduct, createTemplate, deleteTemplate, toggleRule, updateUserRole, processOrder, purchaseProduct, checkoutCart, sendMessage, refreshState, resetKernel, toggleIncidentMode,
      switchUser, hasPermission
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
