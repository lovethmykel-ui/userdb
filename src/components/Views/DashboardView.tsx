'use client';

import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  EyeSlash, 
  ArrowDown, 
  ArrowUp, 
  PaperPlaneTilt, 
  Plus, 
  ArrowsLeftRight, 
  ShieldCheck,
  Lightning,
  Sparkle,
  TrendUp
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
  corridors,
  onNavigate
}) => {
  const [isBalanceHidden, setIsBalanceHidden] = useState<boolean>(false);
  const [activeMarketTab, setActiveMarketTab] = useState<'trending' | 'gainers' | 'new'>('trending');

  // Filter Market Table by Tab
  const getFilteredCoins = () => {
    if (activeMarketTab === 'gainers') {
      return [...coins].sort((a, b) => b.chg - a.chg).slice(0, 6);
    }
    if (activeMarketTab === 'new') {
      return coins.slice(-6);
    }
    return coins.slice(0, 6);
  };

  const filteredCoins = getFilteredCoins();

  // Draw Corridor Sparklines
  useEffect(() => {
    corridors.forEach((c) => {
      const canvas = document.getElementById(`corridor-spark-${c.code}`) as HTMLCanvasElement;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const w = 130;
      const h = 24;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, w, h);
      const points = [100, 101, 99, 102, 104, 103, 106, 108, 107, 110];
      const min = Math.min(...points);
      const max = Math.max(...points);
      const range = max - min || 1;
      const color = c.chg >= 0 ? '#2FBD8E' : '#F1667A';

      ctx.beginPath();
      points.forEach((p, i) => {
        const x = (i / (points.length - 1)) * w;
        const y = h - ((p - min) / range) * (h * 0.75) - 3;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, c.chg >= 0 ? 'rgba(47,189,142,0.2)' : 'rgba(241,102,122,0.2)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fill();
    });
  }, [corridors]);

  // Draw Table Sparklines
  useEffect(() => {
    filteredCoins.forEach((c) => {
      const canvas = document.getElementById(`dash-spark-${c.sym}`) as HTMLCanvasElement;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const w = 90;
      const h = 26;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, w, h);
      const points = [50, 52, 49, 54, 56, 53, 58, 62, 60, 65];
      const min = Math.min(...points);
      const max = Math.max(...points);
      const range = max - min || 1;
      const color = c.chg >= 0 ? '#2FBD8E' : '#F1667A';

      ctx.beginPath();
      points.forEach((p, i) => {
        const x = (i / (points.length - 1)) * w;
        const y = h - ((p - min) / range) * (h * 0.75) - 3;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }, [filteredCoins]);

  return (
    <section className="view active" id="view-dashboard">
      {/* Top Banner Grid */}
      <div className="dash-grid">
        {/* Estimated Balance Card */}
        <div className="card balance-card">
          <div className="balance-label">
            <span>Estimated Total Net Worth</span>
            <button 
              className="eye-toggle" 
              onClick={() => setIsBalanceHidden(!isBalanceHidden)}
              title={isBalanceHidden ? 'Show balance' : 'Hide balance'}
            >
              {isBalanceHidden ? <EyeSlash size={15} /> : <Eye size={15} />}
            </button>
          </div>
          
          <div className="balance-amount">
            <span>{isBalanceHidden ? '••••••••' : '42,318.65'}</span>
            <span className="cur font-mono">USDT</span>
          </div>
          
          <div className="balance-sub font-mono">
            ▲ +1,204.11 (2.93%) today
          </div>

          {/* Quick Action Buttons */}
          <div className="quick-actions">
            <button className="qa-btn" onClick={() => onNavigate('deposit')}>
              <span className="ic"><ArrowDown size={15} /></span>
              Deposit
            </button>
            <button className="qa-btn" onClick={() => onNavigate('withdraw')}>
              <span className="ic"><ArrowUp size={15} /></span>
              Withdraw
            </button>
            <button className="qa-btn" onClick={() => onNavigate('send')}>
              <span className="ic"><PaperPlaneTilt size={15} /></span>
              Send
            </button>
            <button className="qa-btn" onClick={() => onNavigate('buysell')}>
              <span className="ic"><Plus size={15} /></span>
              Buy Crypto
            </button>
            <button className="qa-btn" onClick={() => onNavigate('convert')}>
              <span className="ic"><ArrowsLeftRight size={15} /></span>
              Convert
            </button>
          </div>
        </div>

        {/* OTC Block Trading Desk Card */}
        <div className="card okn-card cursor-pointer" onClick={() => onNavigate('okn')}>
          <div>
            <div className="okn-top">
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Institutional Block Liquidity</div>
                <div className="okn-price text-white">Private OTC Desk</div>
              </div>
              <div className="pill pill-brand">Zero Slippage</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginTop: '14px' }}>
              <div className="stat-card" style={{ padding: 0 }}>
                <div className="l">Min. Ticket</div>
                <div className="v font-mono" style={{ fontSize: '15px' }}>$10,000</div>
              </div>
              <div className="stat-card" style={{ padding: 0 }}>
                <div className="l">Live Blocks</div>
                <div className="v font-mono text-purple" style={{ fontSize: '15px' }}>37</div>
              </div>
              <div className="stat-card" style={{ padding: 0 }}>
                <div className="l">Settlement SLA</div>
                <div className="v font-mono text-emerald" style={{ fontSize: '15px' }}>&lt; 15 min</div>
              </div>
            </div>
          </div>

          <div className="okn-perk">
            Request guaranteed firm quotes for high-volume orders with direct multi-sig cold custody settlement.
          </div>
        </div>
      </div>

      {/* Corridor Pulse Section */}
      <div className="corridor-wrap">
        <div className="corridor-head">
          <div>
            <h3>Corridor Pulse</h3>
            <p>Institutional local fiat on/off-ramp settlement across African and Asian gateways</p>
          </div>
          <button className="link cursor-pointer" onClick={() => onNavigate('p2p')}>
            View all corridors →
          </button>
        </div>

        <div className="corridor-track scrollhide">
          {corridors.map((c) => (
            <div key={c.code} className="corridor-tile cursor-pointer" onClick={() => onNavigate('p2p')}>
              <div className={`corridor-region ${c.region}`}>
                {c.region === 'af' ? 'AFRICA' : 'ASIA'}
              </div>
              <div className="corridor-pair font-bold">USDT / {c.code}</div>
              <div className="corridor-rate text-white">{c.rate}</div>
              <div className={`corridor-change ${c.chg >= 0 ? 'up' : 'down'} font-mono`}>
                {c.chg >= 0 ? '▲' : '▼'} {Math.abs(c.chg)}%
              </div>
              <canvas className="corridor-spark" id={`corridor-spark-${c.code}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Markets Table + Recent Activity Split */}
      <div className="dash-grid" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
        <div className="card" style={{ padding: '16px 0' }}>
          <div style={{ padding: '0 16px' }}>
            <div className="tabs">
              <div 
                className={`tab ${activeMarketTab === 'trending' ? 'active' : ''}`}
                onClick={() => setActiveMarketTab('trending')}
              >
                Trending
              </div>
              <div 
                className={`tab ${activeMarketTab === 'gainers' ? 'active' : ''}`}
                onClick={() => setActiveMarketTab('gainers')}
              >
                Top Gainers
              </div>
              <div 
                className={`tab ${activeMarketTab === 'new' ? 'active' : ''}`}
                onClick={() => setActiveMarketTab('new')}
              >
                New Listings
              </div>
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Price</th>
                  <th>24h Change</th>
                  <th>24h Volume</th>
                  <th>Trend</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredCoins.map((c) => (
                  <tr key={c.sym}>
                    <td>
                      <div className="asset-cell">
                        <CryptoIcon sym={c.sym} size={28} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{c.sym}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{c.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="mono font-bold text-white">${c.price.toLocaleString('en-US', { minimumFractionDigits: c.price < 1 ? 4 : 2 })}</td>
                    <td className={c.chg >= 0 ? 'up font-bold mono' : 'down font-bold mono'}>
                      {c.chg >= 0 ? '+' : ''}{c.chg}%
                    </td>
                    <td className="mono text-dim">${c.vol}</td>
                    <td>
                      <canvas className="spark" id={`dash-spark-${c.sym}`} />
                    </td>
                    <td>
                      <button className="btn btn-ghost" onClick={() => onNavigate('trade')}>
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="card" style={{ padding: '16px' }}>
          <div className="section-title" style={{ marginBottom: '12px', fontSize: '15px' }}>
            <span>Recent Activity</span>
            <span className="link cursor-pointer" onClick={() => onNavigate('analytics')}>History →</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { t: "Buy BTC Filled", d: "0.0231 BTC @ 67,105.10 USDT", time: "2m ago" },
              { t: "TRC20 Ingestion Confirmed", d: "500.00 USDT · Block #68,912,410", time: "41m ago" },
              { t: "P2P Escrow Settlement", d: "Sold 100 USDT to Ade_FX (₦161,190)", time: "3h ago" },
              { t: "Cold Custody Sweep", d: "0.10 ETH to Multi-Sig Vault", time: "1d ago" },
              { t: "Daily Yield Compounded", d: "+$4.12 USDT Flexible Vault", time: "1d ago" },
            ].map((i, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: idx === 4 ? 'none' : '1px solid var(--border-soft)' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500 }}>{i.t}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', marginTop: '4px' }}>{i.d}</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '11px', color: 'var(--text-faint)' }}>
                  {i.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
