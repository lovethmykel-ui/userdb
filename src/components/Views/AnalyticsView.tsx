'use client';

import React, { useEffect } from 'react';
import { Coin } from '@/lib/types';

interface AnalyticsViewProps {
  coins: Coin[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ coins }) => {
  const mockBalances: Record<string, number> = {
    BTC: 0.1842,
    ETH: 1.204,
    USDT: 10540.22,
    SOL: 12.5,
    BNB: 2.1,
    XRP: 820,
    OKN: 1500
  };

  const rows = Object.keys(mockBalances)
    .map((sym) => {
      const c = coins.find((x) => x.sym === sym) || { price: 1, color: '#8B5CF6' };
      return { sym, val: mockBalances[sym] * c.price, color: c.color };
    })
    .filter((r) => r.val > 0)
    .sort((a, b) => b.val - a.val);

  const total = rows.reduce((s, r) => s + r.val, 0);

  // Draw 30D Portfolio Canvas Area Chart
  useEffect(() => {
    const canvas = document.getElementById('analyticsPnlChart') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 600;
    const h = 220;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, w, h);
    const series = [
      38500, 39100, 38800, 39400, 40100, 39800, 40500, 40200, 41000, 40800,
      41200, 41500, 41100, 41800, 42100, 41900, 42400, 42100, 42600, 42318
    ];

    const min = Math.min(...series);
    const max = Math.max(...series);
    const range = max - min || 1;

    // Grid lines
    ctx.strokeStyle = '#1A222C';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
      const gy = 20 + ((h - 40) / 3) * i;
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(w, gy);
      ctx.stroke();
    }

    // Chart Line
    ctx.beginPath();
    series.forEach((v, i) => {
      const x = (i / (series.length - 1)) * w;
      const y = h - 20 - ((v - min) / range) * (h - 40);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#8B5CF6';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(139,92,246,0.3)');
    grad.addColorStop(1, 'rgba(139,92,246,0)');
    ctx.fillStyle = grad;
    ctx.fill();
  }, [coins]);

  return (
    <section className="view active" id="view-analytics">
      <div className="section-title">
        <span>Portfolio Analytics &amp; Performance</span>
        <span className="text-dim text-xs">Unified Multi-Asset Accounting</span>
      </div>

      <div className="analytics-grid">
        <div className="card stat-card">
          <div className="l">Total Net Portfolio Value</div>
          <div className="v font-mono text-purple font-bold">$42,318.65</div>
        </div>
        <div className="card stat-card">
          <div className="l">All-Time Net Realized P&amp;L</div>
          <div className="v up font-mono font-bold">+$6,204.90</div>
        </div>
        <div className="card stat-card">
          <div className="l">30-Day Win Rate</div>
          <div className="v font-mono text-emerald font-bold">64.2%</div>
        </div>
        <div className="card stat-card">
          <div className="l">30-Day Notional Volume</div>
          <div className="v font-mono text-white font-bold">$8,240.00</div>
        </div>
      </div>

      <div className="analytics-split">
        <div className="card" style={{ padding: '18px 20px' }}>
          <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '12px' }}>
            <span>Portfolio Value Curve (Last 30 Days)</span>
          </div>
          <canvas id="analyticsPnlChart" style={{ width: '100%', height: '220px' }} />
        </div>

        <div className="card" style={{ padding: '18px 20px' }}>
          <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '6px' }}>
            <span>Asset Allocation Distribution</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
            {rows.map((r) => {
              const pct = (r.val / total) * 100;
              return (
                <div key={r.sym} className="alloc-row">
                  <span className="alloc-sym">{r.sym}</span>
                  <div className="alloc-bar">
                    <span style={{ width: `${pct.toFixed(1)}%`, background: r.color }} />
                  </div>
                  <span className="alloc-pct">{pct.toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="dash-grid" style={{ gridTemplateColumns: '1fr 1fr', marginTop: '16px' }}>
        <div className="card" style={{ padding: '18px 20px' }}>
          <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '10px' }}>
            <span>Trading Performance Summary</span>
          </div>
          <div className="settings-row"><div className="t">Total Executed Trades (30d)</div><span className="mono font-bold text-white">128</span></div>
          <div className="settings-row"><div className="t">Average Ticket Size</div><span className="mono font-bold text-white">$64.40</span></div>
          <div className="settings-row"><div className="t">Best Performing Asset</div><span className="mono up font-bold">SOL (+18.4%)</span></div>
          <div className="settings-row"><div className="t">Worst Performing Asset</div><span className="mono down font-bold">XRP (−6.2%)</span></div>
        </div>

        <div className="card" style={{ padding: '18px 20px' }}>
          <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '10px' }}>
            <span>Fee Optimization Metrics</span>
          </div>
          <div className="settings-row"><div className="t">Spot Trading Fees Paid (30d)</div><span className="mono font-bold text-white">$20.60</span></div>
          <div className="settings-row"><div className="t">Settled in OKN (20% Discount)</div><span className="mono text-purple font-bold">42%</span></div>
          <div className="settings-row"><div className="t">P2P Escrow Transaction Fees</div><span className="mono text-emerald font-bold">$0.00 (Zero Fee)</span></div>
          <div className="settings-row"><div className="t">Current VIP Tier Status</div><span className="mono text-white font-bold">VIP 0 · 0.25% Maker / Taker</span></div>
        </div>
      </div>
    </section>
  );
};
