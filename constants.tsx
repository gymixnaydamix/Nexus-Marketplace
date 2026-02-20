
import React from 'react';
import { NavSection, World, Role } from './types';

export const WORLD_CONFIG = {
  [World.ELECTRONICS]: {
    color: 'blue',
    hex: '#007AFF',
    icon: '⚡',
    label: 'Electronics World',
    categories: ['Smartphones', 'Laptops', 'Wearables', 'Gaming', 'IoT']
  },
  [World.CARS]: {
    color: 'red',
    hex: '#FF3B30',
    icon: '🚗',
    label: 'Cars World',
    categories: ['Electric', 'Autonomous', 'Utility', 'Luxury', 'Parts']
  },
  [World.REAL_ESTATE]: {
    color: 'emerald',
    hex: '#34C759',
    icon: '🏠',
    label: 'Real Estate World',
    categories: ['Smart Studios', 'Modular Villas', 'Cloud Spaces', 'Land', 'Industrial']
  },
  [World.INDUSTRIAL]: {
    color: 'amber',
    hex: '#F59E0B',
    icon: '🏗️',
    label: 'Industrial World',
    categories: ['Heavy Mach.', 'Solar Arrays', 'Robotics', 'Materials']
  },
  [World.FASHION]: {
    color: 'pink',
    hex: '#FF2D55',
    icon: '👕',
    label: 'Fashion World',
    categories: ['Clothes', 'Shoes', 'Accessories', 'Tech-Wear']
  }
};

const ICONS = {
  kpi: 'M13 10V3L4 14h7v7l9-11h-7z',
  revenue: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  listings: 'M4 6h16M4 10h16M4 14h16M4 18h16',
  refunds: 'M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6',
  incidents: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  queue: 'M4 6h16M4 12h16m-7 6h7',
  sla: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  browse: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  cart: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
  chat: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
  delivery: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1m-4 0h4',
  blueprint: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  crm: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  media: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  map: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
  variants: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'
};

export const NAVIGATION: NavSection[] = [
  {
    id: 'home',
    label: 'Home',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 v4a1 1 0 001 1m-6 0h6',
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        subnav: [
          { id: 'kpi', label: 'Dashboard', component: 'HomeKPI', icon: ICONS.kpi },
          { id: 'revenue', label: 'Sales', component: 'HomeRevenue', icon: ICONS.revenue },
          { id: 'listings', label: 'Listings', component: 'HomeListings', icon: ICONS.listings },
          { id: 'refunds', label: 'Refunds', component: 'HomeRefunds', icon: ICONS.refunds }
        ]
      }
    ]
  },
  {
    id: 'marketplace',
    label: 'Marketplace',
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    tabs: [
      {
        id: 'browse',
        label: 'Discovery',
        subnav: [
          { id: 'feed', label: 'Feed', component: 'MarketBrowse', icon: ICONS.browse },
          { id: 'near_me', label: 'Near Me', component: 'MarketMap', icon: ICONS.map },
          { id: 'cart', label: 'Cart', component: 'MarketCart', icon: ICONS.cart },
          { id: 'messages', label: 'Messages', component: 'MarketMessages', icon: ICONS.chat },
          { id: 'deals', label: 'Deals', component: 'MarketDeals', icon: ICONS.revenue }
        ]
      }
    ]
  },
  {
    id: 'sell',
    label: 'Sell / Stores',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 v5m-4 0h4',
    requiredRole: [Role.SELLER, Role.STORE_MANAGER, Role.ADMIN, Role.SUPER_ADMIN],
    tabs: [
      {
        id: 'listings',
        label: 'Listings',
        subnav: [
          { id: 'create', label: 'Create', component: 'SellCreate', icon: ICONS.listings },
          { id: 'media', label: 'Media Studio', component: 'MediaStudio', icon: ICONS.media },
          { id: 'bulk', label: 'Bulk Import', component: 'SellBulk', icon: ICONS.blueprint },
          { id: 'templates', label: 'Templates', component: 'SellTemplates', icon: ICONS.blueprint },
          { id: 'variants', label: 'Variants', component: 'SellVariants', icon: ICONS.variants },
          { id: 'drafts', label: 'Drafts', component: 'SellDrafts', icon: ICONS.blueprint }
        ]
      }
    ]
  },
  {
    id: 'delivery',
    label: 'Orders',
    icon: ICONS.delivery,
    requiredRole: [Role.BUYER, Role.SELLER, Role.DELIVERY_PARTNER, Role.ADMIN, Role.SUPER_ADMIN],
    tabs: [
      {
        id: 'orders',
        label: 'Orders',
        subnav: [
          { id: 'all', label: 'All Orders', component: 'OrdersList', icon: ICONS.queue },
          { id: 'pending', label: 'Pending', component: 'OrdersList', icon: ICONS.incidents },
          { id: 'shipped', label: 'Shipped', component: 'OrdersList', icon: ICONS.delivery }
        ]
      }
    ]
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    requiredRole: [Role.FINANCE, Role.ADMIN, Role.SUPER_ADMIN],
    tabs: [
      {
        id: 'wallets',
        label: 'Wallets',
        subnav: [
          { id: 'buyer_wallets', label: 'Buyer Wallets', component: 'FinBuyerWallets', icon: ICONS.revenue },
          { id: 'seller_wallets', label: 'Seller Wallets', component: 'FinSellerWallets', icon: ICONS.revenue }
        ]
      }
    ]
  },
  {
    id: 'trust',
    label: 'Safety',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-7.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    requiredRole: [Role.MODERATOR, Role.ADMIN, Role.SUPER_ADMIN],
    tabs: [
      {
        id: 'moderation',
        label: 'Moderation',
        subnav: [
          { id: 'listings', label: 'Review Queue', component: 'SafeListings', icon: ICONS.incidents }
        ]
      }
    ]
  },
  {
    id: 'support',
    label: 'Support',
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
    tabs: [
      {
        id: 'inbox',
        label: 'Tickets',
        subnav: [
          { id: 'tickets', label: 'Inbox', component: 'SupportInbox', icon: ICONS.browse }
        ]
      }
    ]
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    requiredRole: [Role.ADMIN, Role.SUPER_ADMIN],
    tabs: [
      {
        id: 'crm',
        label: 'System',
        subnav: [
          { id: 'vendor_registry', label: 'Vendors', component: 'AdminCRM', icon: ICONS.blueprint },
          { id: 'actor_lifecycle', label: 'Users', component: 'AdminCRM', icon: ICONS.chat },
          { id: 'ops_pipelines', label: 'Pipelines', component: 'AdminCRM', icon: ICONS.delivery },
          { id: 'backend_nodes', label: 'Infrastructure', component: 'AdminCRM', icon: ICONS.sla }
        ]
      }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    tabs: [
      {
        id: 'profile',
        label: 'Account',
        subnav: [
          { id: 'account', label: 'Profile', component: 'SetAccount', icon: ICONS.sla }
        ]
      }
    ]
  }
];
