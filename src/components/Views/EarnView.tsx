'use client';

import React from 'react';
import { EarnProduct } from '@/lib/types';
import { CryptoIcon } from '@/components/CryptoIcons/CryptoIcon';
import { TrendUp, Sparkle, ShieldCheck } from '@phosphor-icons/react';

interface EarnViewProps {
  earnProducts: EarnProduct[];
  onShowToast: (msg: string) => void;
  onNavigate: (view: string) => void;
}

export const EarnView: React.FC<EarnViewProps> = ({
  earnProducts,
  onShowToast,
  onNavigate
}) => {
  return (
    <section className="view active" id="view-earn">
      <div className="section-title">
        <span>OKNexus Yield &amp; Earn Vaults</span>
        <span className="text-dim text-xs">Principal Protected Daily Payouts</span>
      </div>

      <div className="card earn-hero">
        <div>
          <div style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>Active Earning Balance</div>
          <div className="balance-amount" style={{ fontSize: '28px', marginTop: '4px' }}>
            <span>$1,842.00</span>
            <span className="cur font-mono" style={{ fontSize: '14px' }}>USDT</span>
          </div>
          <div className="balance-sub font-mono">
            ▲ +$4.12 USDT yield settled today
          </div>
        </div>

        <button className="btn btn-primary" onClick={() => onShowToast('✓ Displaying your active yield positions')}>
          View Active Vaults
        </button>
      </div>

      <div className="section-title" style={{ fontSize: '15px', marginTop: '20px' }}>
        <span>Flexible Yield Products</span>
      </div>

      <div className="earn-grid">
        {earnProducts.map((p) => (
          <div key={p.sym} className="card earn-card">
            <div className="asset-cell">
              <CryptoIcon sym={p.sym} size={28} />
              <div>
                <div style={{ fontWeight: 600 }}>{p.sym} Flexible</div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Automated compounding</div>
              </div>
            </div>

            <div className="apy font-mono">
              {p.apy}% <span style={{ fontSize: '13px', color: 'var(--text-dim)', fontWeight: 500 }}>APY</span>
            </div>

            <div className="apy-sub">
              {p.note}
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => onShowToast(`✓ Subscribed to ${p.sym} Flexible Vault`)}
            >
              Subscribe Vault
            </button>
          </div>
        ))}
      </div>

      <div className="card earn-teaser">
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>Seeking Higher Native Staking Yield?</div>
          <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '2px' }}>
            Institutional Staking Pools — delegate tokens directly to validator proof-of-stake nodes — is launching soon.
          </div>
        </div>
        <button className="pill pill-neutral cursor-pointer" onClick={() => onNavigate('explore')}>
          See Roadmap →
        </button>
      </div>
    </section>
  );
};
