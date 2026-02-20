
import React from 'react';
import { AppProvider, useApp } from './AppContext';
import { Shell } from './components/Layout/Shell';
import { CommandPalette } from './components/UI/CommandPalette';

// Home Imports
import { HomeKPI } from './sections/Home/Overview';
import { HomeRevenue, HomeListings, HomeRefunds } from './sections/Home/Revenue';
import { LiveOps } from './sections/Home/LiveOps';
import { InsightTrends, InsightConversion } from './sections/Home/Insights';
import { UserActions } from './sections/Home/Activity';
import { AuditFeed } from './sections/Admin/AuditFeed';

// Marketplace Imports
import { MarketBrowse } from './sections/Marketplace/Browse';
import { MarketDeals } from './sections/Marketplace/Deals';
import { MarketCategories } from './sections/Marketplace/Categories';
import { MarketCart } from './sections/Marketplace/Cart';
import { MarketMessages } from './sections/Marketplace/Messages';
import { FilterBuilder } from './sections/Marketplace/Filters';
import { CollectionsCurated } from './sections/Marketplace/Collections';
import { MarketComparison } from './sections/Marketplace/Comparison';
import { MarketMap } from './sections/Marketplace/Map';

// Sell & Inventory Imports
import { SellCreate } from './sections/Sell/ListingStudio';
import { SellBulk } from './sections/Sell/BulkImport';
import { SellTemplates } from './sections/Sell/ListingTemplates';
import { InvStock } from './sections/Inventory/Inventory';
import { InvWarehouses } from './sections/Inventory/Warehouses';
import { SerialTracker } from './sections/Inventory/SerialTracker';
import { StoreBuilder } from './sections/Sell/StoreBuilder';
import { StoreReviews } from './sections/Sell/ReviewManager';
import { MediaStudio } from './sections/Sell/MediaStudio';
import { RegionalOverrides } from './sections/Sell/RegionalOverrides';
import { VariantManager } from './sections/Sell/VariantManager';
import { SellCompliance } from './sections/Sell/Compliance';
import { PromotionsManager } from './sections/Sell/PromotionsManager';
import { QualityChecklist } from './sections/Sell/QualityChecklist';
import { AdSlotAuction } from './sections/Sell/AdSlotAuction';
import { SellDrafts } from './sections/Sell/Drafts';

// Orders & Logistics Imports
import { OrdersList } from './sections/Orders/OrdersList';
import { FulfillPick } from './sections/Orders/Fulfillment';
import { DelTracking } from './sections/Orders/Logistics';
import { DelCarriers } from './sections/Orders/Carriers';
import { DelRates } from './sections/Orders/Rates';
import { DelZones } from './sections/Orders/Zones';
import { DelHandover } from './sections/Orders/Handover';
import { RetRequests } from './sections/Orders/Returns';
import { InspectionHUD } from './sections/Orders/InspectionForm';

// Finance Imports
import { FinWallets } from './sections/Finance/Wallets';
import { FinPayouts } from './sections/Finance/Payouts';
import { FinEscrow } from './sections/Finance/Escrow';
import { FinInvoiceBuilder } from './sections/Finance/Invoicing';
import { TaxRules } from './sections/Finance/TaxRules';
import { ExchangeRates } from './sections/Finance/ExchangeRates';

// Safety & Trust Imports
import { SafeRules } from './sections/Admin/RuleBuilder';
import { SafeModeration } from './sections/Safety/Moderation';
import { SafeDisputes } from './sections/Safety/Disputes';
import { SafeVerification } from './sections/Safety/Verification';
import { SafeDocs } from './sections/Safety/Evidence';

// Support & Admin Imports
import { SupportInbox } from './sections/Support/SupportCenter';
import { SupportChat } from './sections/Support/LiveChat';
import { SupportCanned } from './sections/Support/CannedReplies';
import { SupportEscalations } from './sections/Support/Escalations';
import { SupportArticles } from './sections/Support/KnowledgeBase';
import { SupportRouting } from './sections/Support/Routing';
import { HoursManager } from './sections/Support/HoursManager';
import { AdminUsers } from './sections/Admin/UserDirectory';
import { AdminRoles } from './sections/Admin/Permissions';
import { AdminCMS } from './sections/Admin/CMS';
import { AdminConfig } from './sections/Admin/Config';
import { AdminIntegrations } from './sections/Admin/Integrations';
import { WorkflowEditor } from './sections/Admin/WorkflowEditor';
import { AdminCRM } from './sections/Admin/CRM';
import { TranslationManager } from './sections/Admin/TranslationManager';
import { SLAConfig } from './sections/Admin/SLAConfig';

// Settings Imports
import { SetAccount } from './sections/Settings/Profile';
import { SetSecurity } from './sections/Settings/Security';
import { SetAPI } from './sections/Settings/Developer';
import { SetLayout } from './sections/Settings/Preferences';
import { DeviceManager } from './sections/Settings/DeviceManager';

const SectionRenderer: React.FC = () => {
  const { activeSubItem } = useApp();

  const components: { [key: string]: React.ReactNode } = {
    // HOME
    HomeKPI: <HomeKPI />,
    HomeRevenue: <HomeRevenue />,
    HomeListings: <HomeListings />,
    HomeRefunds: <HomeRefunds />,
    LiveOps: <LiveOps />,
    LiveIncidents: <LiveOps />,
    LiveQueue: <LiveOps />,
    LiveSLA: <LiveOps />,
    InsightTrends: <InsightTrends />,
    InsightConversion: <InsightConversion />,
    InsightHealth: <InsightTrends />,
    AuditFeed: <AuditFeed />,
    UserActions: <UserActions />,
    SystemEvents: <UserActions />,

    // MARKETPLACE
    MarketBrowse: <MarketBrowse />,
    MarketMap: <MarketMap />,
    MarketCart: <MarketCart />,
    MarketMessages: <MarketMessages />,
    MarketNew: <MarketBrowse />,
    MarketNear: <MarketMap />,
    MarketDeals: <MarketDeals />,
    MarketCategories: <MarketCategories />,
    MarketAttributes: <MarketCategories />,
    MarketBrands: <MarketCategories />,
    FilterBuilder: <FilterBuilder />,
    SavedFilters: <FilterBuilder />,
    MarketSorting: <FilterBuilder />,
    MarketTemplates: <MarketBrowse />,
    MarketMedia: <MediaStudio />,
    MarketSpecs: <MarketBrowse />,
    MarketComparison: <MarketComparison />,
    CollectionsCurated: <CollectionsCurated />, 
    CollectionsSeasonal: <CollectionsCurated />,
    CollectionsEditorial: <CollectionsCurated />,

    // SELL / STORES
    SellCreate: <SellCreate />,
    SellBulk: <SellBulk />,
    SellTemplates: <SellTemplates />,
    SellVariants: <VariantManager />,
    SellDrafts: <SellDrafts />,
    MediaStudio: <MediaStudio />,
    RegionalOverrides: <RegionalOverrides />,
    VariantManager: <VariantManager />,
    InvStock: <InvStock />,
    InvWarehouses: <InvWarehouses />,
    InvBundles: <InvStock />,
    InvSerial: <SerialTracker />,
    StoreBuilder: <StoreBuilder />,
    StoreSections: <StoreBuilder />,
    StorePolicies: <StoreBuilder />,
    StoreReviews: <StoreReviews />,
    SellCoupons: <PromotionsManager />,
    SellFlash: <PromotionsManager />,
    SellAds: <AdSlotAuction />,
    SellDocs: <SellCompliance />,
    SellRestrictions: <QualityChecklist />,
    SellBrand: <SellCompliance />,
    Compliance: <SellCompliance />,

    // ORDERS
    OrdersList: <OrdersList />,
    OrdersPending: <OrdersList />,
    OrdersShipped: <OrdersList />,
    OrdersDelivered: <OrdersList />,
    OrdersCancelled: <OrdersList />,
    FulfillPick: <FulfillPick />,
    FulfillSlips: <FulfillPick />,
    FulfillBatch: <FulfillPick />,
    FulfillSLA: <SLAConfig />,
    DelCarriers: <DelCarriers />,
    DelRates: <DelRates />,
    DelZones: <DelZones />,
    DelHandover: <DelHandover />,
    DelTracking: <DelTracking />,
    RetRequests: <RetRequests />,
    RetInspect: <InspectionHUD />,
    RetRestock: <InspectionHUD />,
    RetDisputes: <SafeDisputes />,

    // PAYMENTS
    FinBuyerWallets: <FinWallets type="buyer" />,
    FinSellerWallets: <FinWallets type="seller" />,
    FinEscrow: <FinEscrow />,
    FinPayoutSchedule: <FinPayouts />,
    FinPayoutApproval: <ExchangeRates />,
    FinBankAcc: <FinPayouts />,
    FinInvoiceBuilder: <FinInvoiceBuilder />,
    FinCreditNotes: <FinInvoiceBuilder />,
    FinReceipts: <FinInvoiceBuilder />,
    FinSalesRep: <HomeRevenue />,
    FinFeeRep: <HomeRevenue />,
    FinChargebacks: <HomeRevenue />,
    FinExports: <HomeRevenue />,
    FinTaxVAT: <TaxRules />,
    FinTaxRegional: <TaxRules />,
    FinTaxReports: <TaxRules />,

    // SAFETY
    SafeListings: <SafeModeration type="listing" />,
    SafeSellers: <SafeModeration type="seller" />,
    SafeReports: <SafeModeration type="listing" />,
    SafeKYC: <SafeVerification />,
    SafeDocs: <SafeDocs />,
    SafeAddr: <SafeVerification />,
    SafeDisputes: <SafeDisputes />,
    SafeMediation: <SafeDisputes />,
    SafeResTemp: <SupportCanned />,
    SafeRules: <SafeRules />,
    SafeThresholds: <SafeRules />,
    SafeBlocks: <SafeRules />,
    SafeWatchlists: <SafeRules />,
    SafeAttach: <SafeDocs />,
    SafeMsgExp: <SafeDocs />,
    SafeTimeline: <SafeDocs />,

    // SUPPORT
    SupportInbox: <SupportInbox />,
    SupportTags: <SupportInbox />,
    SupportCanned: <SupportCanned />,
    SupportAssign: <SupportInbox />,
    SupportEscalations: <SupportEscalations />,
    SupportChat: <SupportChat />,
    SupportChatHist: <SupportChat />,
    SupportKBCats: <SupportArticles />,
    SupportArticles: <SupportArticles />,
    SupportKBVers: <SupportArticles />,
    SupportRouting: <SupportRouting />,
    SupportPriority: <SupportRouting />,
    SupportHours: <HoursManager />,

    // ADMIN
    AdminUsers: <AdminUsers />,
    AdminRoles: <AdminRoles />,
    AdminSuspensions: <AdminUsers />,
    AdminTokens: <AdminUsers />,
    AdminCMS: <AdminCMS />,
    AdminBanners: <AdminCMS />,
    AdminNav: <WorkflowEditor />,
    AdminFooter: <AdminCMS />,
    AdminConfig: <AdminConfig />,
    AdminReg: <TranslationManager />,
    AdminLang: <TranslationManager />,
    AdminThemes: <AdminConfig />,
    AdminIntPay: <AdminIntegrations />,
    AdminIntComm: <AdminIntegrations />,
    AdminIntShip: <AdminIntegrations />,
    AdminIntWeb: <AdminIntegrations />,
    AdminSysLogs: <AuditFeed />,
    AdminErrLogs: <AuditFeed />,
    AdminCRM: <AdminCRM />,

    // SETTINGS
    SetAccount: <SetAccount />,
    SetCompany: <SetAccount />,
    SetAddr: <SetAccount />,
    SetSecurity: <SetSecurity />,
    SetDevices: <DeviceManager />,
    SetSessions: <DeviceManager />,
    SetPwdPol: <DeviceManager />,
    SetNotif: <SetLayout />,
    SetLayout: <SetLayout />,
    SetDefaults: <SetLayout />,
    SetAPI: <SetAPI />,
    SetWebhooks: <SetAPI />,
    SetSandbox: <SetAPI />,
  };

  return (
    <div className="h-full overflow-hidden">
      {components[activeSubItem.component] || (
        <div className="flex flex-col items-center justify-center h-full text-zinc-100 space-y-4">
          <div className="w-20 h-20 border-2 border-dashed border-zinc-200 rounded-[2.5rem] flex items-center justify-center bg-zinc-50 shadow-inner">
             <svg className="w-10 h-10 text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-300 font-bold">Module Isolated: {activeSubItem.label}</p>
          <p className="text-zinc-400 text-xs italic">Nexus Kernel awaiting hardware link (v2035.4)</p>
        </div>
      )}
    </div>
  );
};

const MainContent: React.FC = () => {
  return (
    <Shell>
      <CommandPalette />
      <SectionRenderer />
    </Shell>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
};

export default App;
