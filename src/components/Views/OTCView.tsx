'use client';

import React, { useState } from 'react';
import { OTCOffer } from '@/lib/types';
import { CryptoIcon } from '@/components/CryptoIcons/CryptoIcon';
import { 
  ShieldCheck, 
  ArrowsDownUp, 
  Handshake, 
  Clock, 
  LockKey, 
  Sparkle,
  CheckCircle 
} from '@phosphor-icons/react';

interface OTCViewProps {
  otcOffers: OTCOffer[];
  onShowToast: (msg: string) => void;
}

export const OTCView: React.FC<OTCViewProps> = ({ otcOffers, onShowToast }) => {
  const [quoteSide, setQuoteSide] = useState<'buy' | 'sell'>('buy');
  const [bookSide, setBookSide] = useState<'buy' | 'sell'>('buy');
  const [quoteAmount, setQuoteAmount] = useState<string>('50000.00');
  const [selectedAsset, setSelectedAsset] = useState<string>('BTC');

  const btcPrice = 67214.50;
  const numAmount = parseFloat(quoteAmount.replace(/,/g, '')) || 0;
  const receiveEst = (numAmount / btcPrice).toFixed(4);

  const filteredOffers = otcOffers.filter((o) => o.side === bookSide);

  return (
    <section className="view active" id="view-okn">
      <div className="section-title">
        <div>
          <span>Institutional OTC &amp; Block Trading Desk</span>
          <p className="text-dim" style={{ fontSize: '12px', marginTop: '2px' }}>
            High-volume execution ($10,000+) with zero order-book slippage and dedicated cold custody settlement
          </p>
        </div>
        <div className="pill pill-brand" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <LockKey size={13} className="text-purple" /> Direct Multi-Sig Custody
        </div>
      </div>

      <div className="dash-grid">
        {/* Request a Quote Form */}
        <div className="card" style={{ padding: '24px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '15px', fontWeight: 700 }}>Request a Private Quote</span>
            <span className="pill pill-buy">T+0 Instant Delivery</span>
          </div>

          <div className="tabs" style={{ marginBottom: '16px' }}>
            <button
              className={`tab ${quoteSide === 'buy' ? 'active' : ''}`}
              onClick={() => setQuoteSide('buy')}
            >
              Buy Crypto
            </button>
            <button
              className={`tab ${quoteSide === 'sell' ? 'active' : ''}`}
              onClick={() => setQuoteSide('sell')}
            >
              Sell Crypto
            </button>
          </div>

          {/* Settlement Asset (From) */}
          <div className="swap-box">
            <div className="l">
              <span>Settlement Volume</span>
              <span className="mono">Min. Order $10,000</span>
            </div>
            <div className="swap-row">
              <input
                type="text"
                value={quoteAmount}
                onChange={(e) => setQuoteAmount(e.target.value)}
                style={{ fontSize: '24px', color: '#FFFFFF', fontWeight: 700 }}
              />
              <div className="swap-asset" style={{ background: 'var(--surface-hover)', border: '1px solid var(--border)' }}>
                <CryptoIcon sym="USDT" size={22} />
                <span className="font-bold text-white">USDT</span>
              </div>
            </div>
          </div>

          <div className="swap-mid">
            <button title="Invert Direction" style={{ background: 'var(--surface-2)', border: '1px solid var(--brand)', color: 'var(--brand-light)' }}>
              <ArrowsDownUp size={15} />
            </button>
          </div>

          {/* Target Asset (To) */}
          <div className="swap-box">
            <div className="l">
              <span>Indicative Receiving Amount</span>
              <span className="mono">Locked 60s Quote</span>
            </div>
            <div className="swap-row">
              <input 
                type="text" 
                value={receiveEst} 
                disabled 
                style={{ fontSize: '24px', color: 'var(--brand-light)', fontWeight: 700 }}
              />
              <div className="swap-asset" style={{ background: 'var(--surface-hover)', border: '1px solid var(--border)' }}>
                <CryptoIcon sym={selectedAsset} size={22} />
                <span className="font-bold text-white">{selectedAsset}</span>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', marginTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Dealer Benchmark Price</span>
            <span className="mono font-bold text-white">1 BTC = 67,214.50 USDT</span>
          </div>

          <button
            className="btn btn-primary oe-submit"
            style={{ width: '100%', marginTop: '16px', height: '44px', fontWeight: 700 }}
            onClick={() => onShowToast('✓ Private OTC quote locked — dealer settlement channel opened')}
          >
            Request Firm Institutional Quote
          </button>

          <p style={{ fontSize: '11px', color: 'var(--text-faint)', marginTop: '10px', textAlign: 'center' }}>
            Quotes are firm for a 60-second execution window — funds are released upon counterparty multi-sig confirmation.
          </p>
        </div>

        {/* Why Trade OTC Desk */}
        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="section-title" style={{ fontSize: '15px', marginBottom: '14px' }}>
              <span>Institutional Liquidity Standards</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="okn-perk" style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid var(--brand-dim)' }}>
                <strong className="text-purple">Guaranteed Zero Slippage:</strong> Settle large block tickets without impacting public order book depth.
              </div>
              <div className="okn-perk" style={{ background: 'rgba(47, 189, 142, 0.08)', border: '1px solid rgba(47, 189, 142, 0.25)', color: 'var(--buy)' }}>
                <strong className="text-emerald">Tri-Party Custody Protection:</strong> Assets are protected by segregated multi-signature cold storage vaults.
              </div>
              <div className="okn-perk" style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', color: '#38BDF8' }}>
                <strong className="text-white">Sub-15 Minute Delivery:</strong> Automated on-chain wire settlement directly to your designated whitelisted address.
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', marginTop: '20px' }}>
            <div className="stat-card" style={{ padding: '12px', background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)' }}>
              <div className="l">Min. Ticket</div>
              <div className="v font-mono text-white" style={{ fontSize: '16px' }}>$10,000</div>
            </div>
            <div className="stat-card" style={{ padding: '12px', background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)' }}>
              <div className="l">Active Offers</div>
              <div className="v font-mono text-purple" style={{ fontSize: '16px' }}>37 Desks</div>
            </div>
            <div className="stat-card" style={{ padding: '12px', background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)' }}>
              <div className="l">Avg. Settlement</div>
              <div className="v font-mono text-emerald" style={{ fontSize: '16px' }}>&lt; 15 min</div>
            </div>
          </div>
        </div>
      </div>

      {/* Live OTC Order Book */}
      <div className="section-title" style={{ marginTop: '28px' }}>
        <span>Live Institutional OTC Liquidity Book</span>
      </div>

      <div className="p2p-toolbar">
        <div className="tabs" style={{ marginBottom: 0, border: 'none' }}>
          <button
            className={`tab ${bookSide === 'buy' ? 'active' : ''}`}
            onClick={() => setBookSide('buy')}
          >
            Buy Offers
          </button>
          <button
            className={`tab ${bookSide === 'sell' ? 'active' : ''}`}
            onClick={() => setBookSide('sell')}
          >
            Sell Offers
          </button>
        </div>

        <select style={{ width: '120px' }}>
          <option>USDT</option>
          <option>BTC</option>
          <option>ETH</option>
        </select>

        <select style={{ width: '160px' }}>
          <option>All Block Sizes</option>
          <option>$10K – $50K</option>
          <option>$50K – $250K</option>
          <option>$250K+</option>
        </select>
      </div>

      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Counterparty Desk</th>
              <th>Asset</th>
              <th>Benchmark Price</th>
              <th>Available Size</th>
              <th>Min / Max</th>
              <th>Settlement SLA</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOffers.map((o) => (
              <tr key={o.id}>
                <td className="font-bold text-white">{o.name}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <CryptoIcon sym={o.asset} size={20} />
                    <span className="font-bold">{o.asset}</span>
                  </div>
                </td>
                <td className="mono font-bold text-white">
                  ${o.price.toLocaleString('en-US', { minimumFractionDigits: o.price < 10 ? 3 : 2 })}
                </td>
                <td className="mono text-purple font-bold">${o.size}</td>
                <td className="mono text-dim">${o.min} – ${o.max}</td>
                <td className="text-emerald font-mono">{o.settle}</td>
                <td>
                  <button
                    className={`btn ${o.side === 'buy' ? 'btn-buy' : 'btn-sell'}`}
                    style={{ padding: '6px 16px', fontWeight: 700 }}
                    onClick={() => onShowToast(`✓ Initiated private OTC escrow with ${o.name}`)}
                  >
                    {o.side === 'buy' ? 'Buy Block' : 'Sell Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
