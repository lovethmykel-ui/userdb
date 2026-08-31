'use client';

import React, { useState } from 'react';
import { 
  Eye, 
  EyeSlash, 
  ArrowsLeftRight, 
  CreditCard,
  Wallet,
  DotsThree,
  CaretRight
} from '@phosphor-icons/react';
import { Coin, Corridor } from '@/lib/types';
import { CryptoIcon } from '@/components/CryptoIcons/CryptoIcon';

interface DashboardViewProps {
  coins: Coin[];
  corridors: Corridor[];
  onNavigate: (view: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  coins,
  onNavigate
}) => {
  const [isBalanceHidden, setIsBalanceHidden] = useState<boolean>(false);
  const [activeMarketTab, setActiveMarketTab] = useState<'favorites' | 'hot' | 'new' | 'gainers' | 'losers'>('hot');
  const [activeSubTab, setActiveSubTab] = useState<'spot' | 'alpha' | 'derivatives' | 'cfd'>('spot');

  // Filter Market Table by Tab
  const getFilteredCoins = () => {
    if (activeMarketTab === 'gainers') {
      return [...coins].sort((a, b) => b.chg - a.chg).slice(0, 6);
    }
    if (activeMarketTab === 'losers') {
      return [...coins].sort((a, b) => a.chg - b.chg).slice(0, 6);
    }
    if (activeMarketTab === 'new') {
      return coins.slice(-6);
    }
    return coins.slice(0, 6);
  };

  const filteredCoins = getFilteredCoins();

  return (
    <section className="view active" id="view-dashboard">
      
      {/* 1. Header & Balance Area */}
      <div className="dash-header-mobile">
        <div className="dash-header-content">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-dim)', fontSize: '14px', fontWeight: 500 }}>
              Total Assets
              <button 
                className="eye-toggle" 
                onClick={() => setIsBalanceHidden(!isBalanceHidden)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: 0 }}
              >
                {isBalanceHidden ? <EyeSlash size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="balance-massive font-mono">
              {isBalanceHidden ? '******' : '0.00'}
              <span className="cur">USD</span>
            </div>
            <div style={{ fontSize: '13px', color: '#2FBD8E', fontWeight: 600 }}>
              Today's P&L {isBalanceHidden ? '******' : '0.00 USD(0%)'}
            </div>
          </div>
          <div>
            <button className="btn-deposit-yellow" onClick={() => onNavigate('deposit')}>
              Deposit
            </button>
          </div>
        </div>
      </div>

      {/* 2. Quick Actions */}
      <div className="quick-actions-circle">
        <button className="qa-circle-btn" onClick={() => onNavigate('convert')}>
          <div className="qa-icon-wrap">
            <ArrowsLeftRight size={22} weight="bold" />
          </div>
          <span className="qa-label">Convert</span>
        </button>
        <button className="qa-circle-btn" onClick={() => onNavigate('p2p')}>
          <div className="qa-icon-wrap">
            <span style={{ fontSize: '11px', fontWeight: 'bold' }}>P2P</span>
          </div>
          <span className="qa-label">P2P Trading</span>
        </button>
        <button className="qa-circle-btn">
          <div className="qa-icon-wrap">
            <CreditCard size={22} weight="bold" />
          </div>
          <span className="qa-label">Card</span>
        </button>
        <button className="qa-circle-btn">
          <div className="qa-icon-wrap">
            <DotsThree size={24} weight="bold" />
          </div>
          <span className="qa-label">More</span>
        </button>
      </div>

      {/* 3. Promotional Cards */}
      <div style={{ padding: '0 16px', marginBottom: '24px' }}>
        <div className="card cursor-pointer" style={{ padding: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '60px', height: '60px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/cryptocurrency-icons/svg/icon/btc.svg" alt="promo" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 10px rgba(247, 147, 26, 0.5))' }} />
            </div>
            <div>
              <div style={{ color: 'var(--text-dim)', fontSize: '12px', marginBottom: '4px' }}>Event</div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>
                Grid Trading: Win an iPhone 17 Pro
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Explore Now <CaretRight size={12} />
              </div>
            </div>
          </div>
        </div>

        <div className="card cursor-pointer" style={{ padding: '16px', width: '50%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-dim)' }}>OKNEXUS Card</span>
            <CaretRight size={14} color="var(--text-dim)" />
          </div>
          <div style={{ background: 'linear-gradient(135deg, #e0e0e0, #ffffff)', borderRadius: '8px', padding: '12px', color: '#000', height: '60px', position: 'relative' }}>
            <span style={{ fontSize: '10px', fontWeight: 800 }}>OKN T</span>
            <span style={{ position: 'absolute', bottom: '8px', right: '12px', fontSize: '16px', fontWeight: 900, fontStyle: 'italic', color: '#1a1a1a' }}>VISA</span>
          </div>
          <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-dim)' }}>
            **** 1021
          </div>
        </div>
      </div>

      {/* 4. Markets Panel */}
      <div className="markets-panel-mobile">
        <div className="markets-mobile-tabs">
          <div className={`market-m-tab ${activeMarketTab === 'favorites' ? 'active' : ''}`} onClick={() => setActiveMarketTab('favorites')}>Favorites</div>
          <div className={`market-m-tab ${activeMarketTab === 'hot' ? 'active' : ''}`} onClick={() => setActiveMarketTab('hot')}>Hot</div>
          <div className={`market-m-tab ${activeMarketTab === 'new' ? 'active' : ''}`} onClick={() => setActiveMarketTab('new')}>New</div>
          <div className={`market-m-tab ${activeMarketTab === 'gainers' ? 'active' : ''}`} onClick={() => setActiveMarketTab('gainers')}>Gainers</div>
          <div className={`market-m-tab ${activeMarketTab === 'losers' ? 'active' : ''}`} onClick={() => setActiveMarketTab('losers')}>Losers</div>
        </div>

        <div className="market-m-subtabs">
          <div className={`m-subtab ${activeSubTab === 'spot' ? 'active' : ''}`} onClick={() => setActiveSubTab('spot')}>Spot</div>
          <div className={`m-subtab ${activeSubTab === 'alpha' ? 'active' : ''}`} onClick={() => setActiveSubTab('alpha')}>Alpha 🔥</div>
          <div className={`m-subtab ${activeSubTab === 'derivatives' ? 'active' : ''}`} onClick={() => setActiveSubTab('derivatives')}>Derivatives</div>
          <div className={`m-subtab ${activeSubTab === 'cfd' ? 'active' : ''}`} onClick={() => setActiveSubTab('cfd')}>CFD</div>
        </div>

        <div className="market-list-mobile">
          {filteredCoins.map((c) => (
            <div key={c.sym} className="market-list-row cursor-pointer" onClick={() => onNavigate('trade')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '40%' }}>
                <CryptoIcon sym={c.sym} size={28} />
                <div className="market-list-col">
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700 }}>{c.sym}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>/ USDT</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '2px' }}>Vol {c.vol}</div>
                </div>
              </div>

              <div className="market-list-col" style={{ width: '35%', alignItems: 'flex-end', paddingRight: '12px' }}>
                <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)' }} className="mono">
                  {c.price.toLocaleString('en-US', { minimumFractionDigits: c.price < 1 ? 4 : 2 })}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '2px' }}>
                  ${c.price.toLocaleString('en-US', { minimumFractionDigits: c.price < 1 ? 4 : 2 })}
                </div>
              </div>

              <div style={{ width: '25%', display: 'flex', justifyContent: 'flex-end' }}>
                <button className={`btn-price-pill ${c.chg >= 0 ? 'up' : 'down'}`}>
                  {c.chg > 0 ? '+' : ''}{c.chg}%
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
