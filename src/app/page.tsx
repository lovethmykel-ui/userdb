'use client';

import React, { useState, useEffect } from 'react';
import { 
  SquaresFour, 
  ChartLineUp, 
  ArrowsLeftRight, 
  Wallet,
  List
} from '@phosphor-icons/react';
import { Navbar } from '@/components/Navigation/Navbar';
import { DashboardView } from '@/components/Views/DashboardView';
import { MarketsView } from '@/components/Views/MarketsView';
import { TradeView } from '@/components/Views/TradeView';
import { ConvertView } from '@/components/Views/ConvertView';
import { BuySellView } from '@/components/Views/BuySellView';
import { P2PView } from '@/components/Views/P2PView';
import { WalletView } from '@/components/Views/WalletView';
import { EarnView } from '@/components/Views/EarnView';
import { AnalyticsView } from '@/components/Views/AnalyticsView';
import { ExploreView } from '@/components/Views/ExploreView';
import { OTCView } from '@/components/Views/OTCView';
import { MoreView } from '@/components/Views/MoreView';
import { DepositView } from '@/components/Views/DepositView';
import { WithdrawView } from '@/components/Views/WithdrawView';
import { SendView } from '@/components/Views/SendView';
import { AlertsView } from '@/components/Views/AlertsView';
import { VerificationView } from '@/components/Views/VerificationView';
import { PaymentMethodsView } from '@/components/Views/PaymentMethodsView';
import { ReferralsView } from '@/components/Views/ReferralsView';
import { RewardsView } from '@/components/Views/RewardsView';
import { SupportView } from '@/components/Views/SupportView';
import { SettingsView } from '@/components/Views/SettingsView';
import { ProfileView } from '@/components/Views/ProfileView';

import { DepositModal } from '@/components/Modals/DepositModal';
import { WithdrawModal } from '@/components/Modals/WithdrawModal';

import { 
  initialCoins, 
  initialCorridors, 
  initialAlerts, 
  initialEarnProducts, 
  initialP2PMerchants, 
  initialOTCOffers 
} from '@/lib/data';
import { Coin, AlertItem, OpenTradeOrder } from '@/lib/types';

export default function Home() {
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [coins, setCoins] = useState<Coin[]>(initialCoins);
  const [corridors, setCorridors] = useState(initialCorridors);
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [earnProducts, setEarnProducts] = useState(initialEarnProducts);
  const [p2pMerchants, setP2pMerchants] = useState(initialP2PMerchants);
  const [otcOffers, setOtcOffers] = useState(initialOTCOffers);

  const [currentBtcPrice, setCurrentBtcPrice] = useState<number>(67214.50);
  const [openOrders, setOpenOrders] = useState<OpenTradeOrder[]>([
    { id: '1', pair: 'BTC/USDT', type: 'Limit', side: 'Buy', price: 66500.00, amt: 0.05, filled: '0%', total: 3325.00, time: '14:20' },
    { id: '2', pair: 'ETH/USDT', type: 'Limit', side: 'Sell', price: 3600.00, amt: 0.80, filled: '40%', total: 2880.00, time: '13:45' }
  ]);

  // Modal States
  const [isDepositOpen, setIsDepositOpen] = useState<boolean>(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState<boolean>(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 2400);
  };

  // Live Price Simulation Tick
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.49) * 28;
      setCurrentBtcPrice((prev) => {
        const next = Math.max(1000, prev + delta);
        setCoins((cList) => 
          cList.map((c) => c.sym === 'BTC' ? { ...c, price: next } : c)
        );
        return next;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Alert Handlers
  const handleAddAlert = (sym: string, cond: 'above' | 'below', target: number) => {
    const newAlert: AlertItem = {
      id: Date.now(),
      sym,
      cond,
      target,
      active: true
    };
    setAlerts((prev) => [newAlert, ...prev]);
    showToast(`✓ Alert created for ${sym} ${cond} $${target}`);
  };

  const handleToggleAlert = (id: number) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  const handleDeleteAlert = (id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    showToast('✓ Alert removed');
  };

  // Trade Handlers
  const handlePlaceOrder = (order: OpenTradeOrder) => {
    setOpenOrders((prev) => [order, ...prev]);
  };

  const handleCancelOrder = (id: string) => {
    setOpenOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const activeAlertCount = alerts.filter((a) => a.active).length;

  return (
    <>
      {/* Navigation */}
      <Navbar
        activeView={activeView}
        onSelectView={(v) => setActiveView(v)}
        onOpenDepositModal={() => setIsDepositOpen(true)}
        onOpenWithdrawModal={() => setIsWithdrawOpen(true)}
        activeAlertCount={activeAlertCount}
      />

      {/* Main Viewport Container */}
      <main>
        {activeView === 'dashboard' && (
          <DashboardView
            coins={coins}
            corridors={corridors}
            onNavigate={(v) => setActiveView(v)}
          />
        )}

        {activeView === 'markets' && (
          <MarketsView
            coins={coins}
            onNavigate={(v) => setActiveView(v)}
          />
        )}

        {activeView === 'trade' && (
          <TradeView
            currentPrice={currentBtcPrice}
            openOrders={openOrders}
            onPlaceOrder={handlePlaceOrder}
            onCancelOrder={handleCancelOrder}
            onShowToast={showToast}
          />
        )}

        {activeView === 'convert' && (
          <ConvertView onShowToast={showToast} />
        )}

        {activeView === 'buysell' && (
          <BuySellView onShowToast={showToast} />
        )}

        {activeView === 'p2p' && (
          <P2PView merchants={p2pMerchants} onShowToast={showToast} />
        )}

        {activeView === 'wallet' && (
          <WalletView
            coins={coins}
            onNavigate={(v) => setActiveView(v)}
            onOpenDepositModal={() => setIsDepositOpen(true)}
            onOpenWithdrawModal={() => setIsWithdrawOpen(true)}
          />
        )}

        {activeView === 'earn' && (
          <EarnView
            earnProducts={earnProducts}
            onShowToast={showToast}
            onNavigate={(v) => setActiveView(v)}
          />
        )}

        {activeView === 'analytics' && (
          <AnalyticsView coins={coins} />
        )}

        {activeView === 'explore' && (
          <ExploreView onShowToast={showToast} />
        )}

        {activeView === 'okn' && (
          <OTCView otcOffers={otcOffers} onShowToast={showToast} />
        )}

        {activeView === 'more' && (
          <MoreView onNavigate={(v) => setActiveView(v)} />
        )}

        {activeView === 'deposit' && (
          <DepositView onShowToast={showToast} onNavigate={(v) => setActiveView(v)} />
        )}

        {activeView === 'withdraw' && (
          <WithdrawView onShowToast={showToast} onNavigate={(v) => setActiveView(v)} />
        )}

        {activeView === 'send' && (
          <SendView onShowToast={showToast} />
        )}

        {activeView === 'alerts' && (
          <AlertsView
            alerts={alerts}
            coins={coins}
            onAddAlert={handleAddAlert}
            onToggleAlert={handleToggleAlert}
            onDeleteAlert={handleDeleteAlert}
          />
        )}

        {activeView === 'verification' && (
          <VerificationView onShowToast={showToast} />
        )}

        {activeView === 'payment-methods' && (
          <PaymentMethodsView onShowToast={showToast} />
        )}

        {activeView === 'referrals' && (
          <ReferralsView onShowToast={showToast} />
        )}

        {activeView === 'rewards' && (
          <RewardsView onShowToast={showToast} />
        )}

        {activeView === 'support' && (
          <SupportView onShowToast={showToast} />
        )}

        {activeView === 'settings' && (
          <SettingsView onNavigate={(v) => setActiveView(v)} onShowToast={showToast} />
        )}

        {activeView === 'profile' && (
          <ProfileView onShowToast={showToast} />
        )}
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-inner">
          <div>© 2026 OKNexus Institutional Exchange. Digital assets carry risk — trade responsibly.</div>
          <div className="footer-links">
            <span onClick={() => setActiveView('analytics')}>Fee Schedule</span>
            <span onClick={() => setActiveView('wallet')}>Proof of Reserves (104.8%)</span>
            <span onClick={() => setActiveView('profile')}>Security &amp; Cold Storage</span>
            <span onClick={() => setActiveView('explore')}>API Documentation</span>
            <span onClick={() => setActiveView('support')}>Help Center</span>
            <span onClick={() => setActiveView('verification')}>Terms of Service</span>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onShowToast={showToast}
      />

      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        onShowToast={showToast}
      />

      {/* Mobile Bottom Navigation */}
      <div className="mobile-bottom-nav">
        <button 
          className={`mobile-nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveView('dashboard')}
        >
          <SquaresFour size={24} weight={activeView === 'dashboard' ? "fill" : "regular"} />
          Home
        </button>
        <button 
          className={`mobile-nav-item ${activeView === 'markets' ? 'active' : ''}`}
          onClick={() => setActiveView('markets')}
        >
          <ChartLineUp size={24} weight={activeView === 'markets' ? "fill" : "regular"} />
          Markets
        </button>
        <button 
          className={`mobile-nav-item ${activeView === 'trade' ? 'active' : ''}`}
          onClick={() => setActiveView('trade')}
        >
          <ArrowsLeftRight size={24} weight={activeView === 'trade' ? "bold" : "regular"} />
          Trade
        </button>
        <button 
          className={`mobile-nav-item ${activeView === 'wallet' ? 'active' : ''}`}
          onClick={() => setActiveView('wallet')}
        >
          <Wallet size={24} weight={activeView === 'wallet' ? "fill" : "regular"} />
          Assets
        </button>
        <button 
          className="mobile-nav-item"
          onClick={() => {
            // We use a small hack here to trigger the mobile menu in the Navbar.
            // Ideally, we'd lift the state, but we can simulate a click on the hamburger button.
            const hamburger = document.querySelector('.hamburger-btn') as HTMLButtonElement;
            if (hamburger) hamburger.click();
          }}
        >
          <List size={24} />
          Menu
        </button>
      </div>

      {/* Interactive Toast */}
      <div className={`toast ${isToastVisible ? 'show' : ''}`} id="toast">
        {toastMessage}
      </div>
    </>
  );
}
