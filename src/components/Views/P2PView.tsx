'use client';

import React, { useState } from 'react';
import { P2PMerchant } from '@/lib/types';
import { CryptoIcon } from '@/components/CryptoIcons/CryptoIcon';
import { ShieldCheck, UserCircle, CheckCircle, Clock } from '@phosphor-icons/react';

interface P2PViewProps {
  merchants: P2PMerchant[];
  onShowToast: (msg: string) => void;
}

export const P2PView: React.FC<P2PViewProps> = ({ merchants, onShowToast }) => {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('NGN');
  const [selectedCrypto, setSelectedCrypto] = useState<string>('USDT');

  const filteredMerchants = merchants.filter((m) => m.currency === selectedCurrency);

  const fiatOptions = [
    { code: 'NGN', name: 'NGN (₦)' },
    { code: 'KES', name: 'KES (KSh)' },
    { code: 'GHS', name: 'GHS (GH₵)' },
    { code: 'IDR', name: 'IDR (Rp)' },
    { code: 'PHP', name: 'PHP (₱)' },
  ];

  return (
    <section className="view active" id="view-p2p">
      <div className="section-title">
        <div>
          <span>P2P Peer-to-Peer Corridor Trading</span>
          <p className="text-dim" style={{ fontSize: '12px', marginTop: '2px' }}>
            Zero fees, multi-currency escrow protection, and instant bank settlement across Africa &amp; Asia
          </p>
        </div>
        <div className="pill pill-brand" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ShieldCheck size={14} className="text-purple" /> 100% Escrow Protection
        </div>
      </div>

      {/* Toolbar */}
      <div className="p2p-toolbar">
        <div className="tabs" style={{ marginBottom: 0, border: 'none' }}>
          <button
            className={`tab ${side === 'buy' ? 'active' : ''}`}
            onClick={() => setSide('buy')}
          >
            Buy {selectedCrypto}
          </button>
          <button
            className={`tab ${side === 'sell' ? 'active' : ''}`}
            onClick={() => setSide('sell')}
          >
            Sell {selectedCrypto}
          </button>
        </div>

        {/* Crypto Quick Chips */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {['USDT', 'BTC', 'OKN', 'ETH'].map((sym) => (
            <button
              key={sym}
              className={`chip ${selectedCrypto === sym ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px' }}
              onClick={() => setSelectedCrypto(sym)}
            >
              <CryptoIcon sym={sym} size={18} />
              <span>{sym}</span>
            </button>
          ))}
        </div>

        <select style={{ width: '160px' }}>
          <option>All Payment Methods</option>
          <option>Bank Transfer</option>
          <option>Mobile Money</option>
          <option>M-Pesa</option>
          <option>GCash</option>
          <option>Maya</option>
        </select>

        {/* Fiat Currency Selector */}
        <select 
          value={selectedCurrency} 
          onChange={(e) => setSelectedCurrency(e.target.value)}
          style={{ width: '130px' }}
        >
          {fiatOptions.map((f) => (
            <option key={f.code} value={f.code}>{f.name}</option>
          ))}
        </select>
      </div>

      {/* Merchant Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredMerchants.length === 0 ? (
          <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-dim)' }}>
            No verified merchants currently online for {selectedCurrency}. Switch fiat currencies above.
          </div>
        ) : (
          filteredMerchants.map((m) => (
            <div key={m.id} className="card merchant-card" style={{ padding: '18px 22px' }}>
              <div className="merchant-info">
                <div className="merchant-avatar" style={{ border: '2px solid var(--brand-dim)', background: 'var(--surface-2)' }}>
                  {m.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="merchant-name">
                    <span className="text-white font-bold">{m.name}</span>
                    <span className="pill pill-buy" style={{ fontSize: '10px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <CheckCircle size={11} /> {m.rate}% Completion
                    </span>
                  </div>
                  <div className="merchant-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{m.trades.toLocaleString()} orders</span>
                    <span>·</span>
                    <span className="text-dim flex items-center gap-1">
                      <Clock size={12} /> avg. release 3.5 min
                    </span>
                  </div>
                  <div style={{ marginTop: '8px', display: 'flex', gap: '6px' }}>
                    {m.pay.map((p, idx) => (
                      <span key={idx} className="pay-chip font-medium">{p}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="merchant-right">
                <div className="merchant-price font-mono text-white" style={{ fontSize: '19px' }}>
                  {m.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span style={{ fontSize: '13px', color: 'var(--text-dim)' }}>{m.currency}</span>
                </div>
                <div className="merchant-limits font-mono text-dim" style={{ margin: '4px 0 10px' }}>
                  Limit {m.min} – {m.max} {m.currency}
                </div>
                <button
                  className={`btn ${side === 'buy' ? 'btn-buy' : 'btn-sell'}`}
                  style={{ padding: '9px 24px', fontWeight: 700, fontSize: '13.5px' }}
                  onClick={() => onShowToast(`✓ Opened ${side.toUpperCase()} order with merchant ${m.name}`)}
                >
                  {side === 'buy' ? `Buy ${selectedCrypto}` : `Sell ${selectedCrypto}`}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Escrow Protection Workflow */}
      <div className="card" style={{ padding: '22px 24px', marginTop: '22px' }}>
        <div className="section-title" style={{ marginBottom: '16px' }}>
          <span>How Escrow Protects Every P2P Trade</span>
          <span className="pill pill-brand">Zero-Fraud Protocol</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
          <div className="stat-card" style={{ padding: '14px', background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)' }}>
            <div className="pill pill-brand" style={{ marginBottom: '8px', width: 'fit-content' }}>Step 1</div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-dim)', lineHeight: 1.5 }}>
              Buyer places order — seller's crypto is locked in smart contract escrow automatically.
            </div>
          </div>

          <div className="stat-card" style={{ padding: '14px', background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)' }}>
            <div className="pill pill-brand" style={{ marginBottom: '8px', width: 'fit-content' }}>Step 2</div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-dim)', lineHeight: 1.5 }}>
              Buyer transfers local fiat currency directly and marks the order as paid.
            </div>
          </div>

          <div className="stat-card" style={{ padding: '14px', background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)' }}>
            <div className="pill pill-brand" style={{ marginBottom: '8px', width: 'fit-content' }}>Step 3</div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-dim)', lineHeight: 1.5 }}>
              Seller verifies payment in bank/wallet app and confirms release to the buyer.
            </div>
          </div>

          <div className="stat-card" style={{ padding: '14px', background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)' }}>
            <div className="pill pill-brand" style={{ marginBottom: '8px', width: 'fit-content' }}>Dispute Support</div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-dim)', lineHeight: 1.5 }}>
              24/7 dedicated mediation reviews bank receipt evidence to release locked funds.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
