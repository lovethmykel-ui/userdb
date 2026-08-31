'use client';

import React, { useState } from 'react';
import { AlertItem, Coin } from '@/lib/types';
import { Trash } from '@phosphor-icons/react';

interface AlertsViewProps {
  alerts: AlertItem[];
  coins: Coin[];
  onAddAlert: (sym: string, cond: 'above' | 'below', target: number) => void;
  onToggleAlert: (id: number) => void;
  onDeleteAlert: (id: number) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  alerts,
  coins,
  onAddAlert,
  onToggleAlert,
  onDeleteAlert
}) => {
  const [sym, setSym] = useState<string>('BTC');
  const [cond, setCond] = useState<'above' | 'below'>('above');
  const [target, setTarget] = useState<string>('');

  const handleCreate = () => {
    const num = parseFloat(target);
    if (!num || num <= 0) return;
    onAddAlert(sym, cond, num);
    setTarget('');
  };

  return (
    <section className="view active" id="view-alerts">
      <div className="section-title">
        <span>Real-Time Price Alerts</span>
        <span className="text-dim text-xs">Low-Latency Push &amp; Webhook Triggers</span>
      </div>

      {/* Creation Bar */}
      <div className="card alert-form">
        <div className="field-row">
          <div className="field-label"><span>Select Asset</span></div>
          <select value={sym} onChange={(e) => setSym(e.target.value)} style={{ width: '100%' }}>
            {coins.map((c) => (
              <option key={c.sym} value={c.sym}>{c.sym} — {c.name}</option>
            ))}
          </select>
        </div>

        <div className="field-row">
          <div className="field-label"><span>Trigger Condition</span></div>
          <select value={cond} onChange={(e) => setCond(e.target.value as 'above' | 'below')} style={{ width: '100%' }}>
            <option value="above">Price rises above (▲)</option>
            <option value="below">Price falls below (▼)</option>
          </select>
        </div>

        <div className="field-row">
          <div className="field-label"><span>Target Threshold Price (USDT)</span></div>
          <input
            type="text"
            placeholder="e.g. 70000"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" style={{ height: '38px', padding: '0 20px' }} onClick={handleCreate}>
          Create Alert
        </button>
      </div>

      {/* Active Alerts List */}
      <div className="card" style={{ padding: '4px 0', marginTop: '16px' }}>
        <div style={{ padding: '14px 18px 0', fontWeight: 600, fontSize: '13.5px' }}>
          Active Alerts ({alerts.filter((a) => a.active).length})
        </div>

        <div style={{ padding: '10px 0' }}>
          {alerts.length === 0 ? (
            <div className="empty-state">
              No price alerts yet — set your first threshold trigger above to receive instant multi-channel notifications.
            </div>
          ) : (
            alerts.map((a) => {
              const coin = coins.find((c) => c.sym === a.sym) || { price: 0, color: '#8B5CF6' };
              return (
                <div key={a.id} className="alert-row">
                  <div className="alert-left">
                    <div className="coin-ic" style={{ background: coin.color, width: '32px', height: '32px', fontSize: '13px' }}>
                      {a.sym.slice(0, 2)}
                    </div>
                    <div>
                      <div className="alert-cond font-bold">
                        {a.sym} {a.cond === 'above' ? '▲ rises above' : '▼ falls below'} ${a.target.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="alert-meta text-dim">
                        Current Market Price: ${coin.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>

                  <div className="alert-actions">
                    <span className={`pill ${a.active ? 'pill-buy' : 'pill-neutral'}`}>
                      {a.active ? 'Active' : 'Paused'}
                    </span>
                    <div
                      className={`toggle ${a.active ? 'on' : ''}`}
                      onClick={() => onToggleAlert(a.id)}
                    />
                    <button
                      style={{ color: 'var(--sell)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      onClick={() => onDeleteAlert(a.id)}
                    >
                      <Trash size={14} /> Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
