'use client';

import React, { useState } from 'react';
import { CryptoIcon } from '@/components/CryptoIcons/CryptoIcon';
import { ArrowsDownUp, ShieldCheck, CreditCard, Bank, DeviceMobile } from '@phosphor-icons/react';

interface BuySellViewProps {
  onShowToast: (msg: string) => void;
}

export const BuySellView: React.FC<BuySellViewProps> = ({ onShowToast }) => {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [payAmount, setPayAmount] = useState<string>('200.00');
  const [fiatCurrency, setFiatCurrency] = useState<string>('USD');
  const [cryptoAsset, setCryptoAsset] = useState<string>('BTC');

  const btcPrice = 67214.50;
  const numPay = parseFloat(payAmount.replace(/,/g, '')) || 0;
  const receiveEst = side === 'buy' ? (numPay / btcPrice).toFixed(6) : (numPay * btcPrice).toFixed(2);

  return (
    <section className="view active" id="view-buysell">
      <div className="section-title">
        <div>
          <span>Instant Fiat On/Off-Ramp</span>
          <p className="text-dim" style={{ fontSize: '12px', marginTop: '2px' }}>
            Direct bank wire, debit card, and mobile money fiat rails with locked rates
          </p>
        </div>
        <div className="pill pill-brand">Instant Settlement</div>
      </div>

      <div className="dash-grid">
        <div className="card" style={{ padding: '24px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)' }}>
          <div className="tabs">
            <button className={`tab ${side === 'buy' ? 'active' : ''}`} onClick={() => setSide('buy')}>
              Buy Crypto
            </button>
            <button className={`tab ${side === 'sell' ? 'active' : ''}`} onClick={() => setSide('sell')}>
              Sell to Fiat
            </button>
          </div>

          <div className="swap-box">
            <div className="l">
              <span>{side === 'buy' ? 'You Spend' : 'You Sell'}</span>
              <span className="mono">Available: 10,540.22 USDT</span>
            </div>
            <div className="swap-row">
              <input
                type="text"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                style={{ fontSize: '24px', color: '#FFFFFF', fontWeight: 700 }}
              />
              <div className="swap-asset" style={{ background: 'var(--surface-hover)', border: '1px solid var(--border)' }}>
                <CryptoIcon sym={fiatCurrency} size={22} />
                <span className="font-bold text-white">{fiatCurrency}</span>
              </div>
            </div>
          </div>

          <div className="swap-mid">
            <button title="Invert Direction" style={{ background: 'var(--surface-2)', border: '1px solid var(--brand)', color: 'var(--brand-light)' }}>
              <ArrowsDownUp size={16} />
            </button>
          </div>

          <div className="swap-box">
            <div className="l">
              <span>{side === 'buy' ? 'You Receive (Estimated)' : 'You Receive in Bank'}</span>
              <span className="mono">Locked 15s quote</span>
            </div>
            <div className="swap-row">
              <input 
                type="text" 
                value={receiveEst} 
                disabled 
                style={{ fontSize: '24px', color: 'var(--brand-light)', fontWeight: 700 }}
              />
              <div className="swap-asset" style={{ background: 'var(--surface-hover)', border: '1px solid var(--border)' }}>
                <CryptoIcon sym={cryptoAsset} size={22} />
                <span className="font-bold text-white">{cryptoAsset}</span>
              </div>
            </div>
          </div>

          <div className="field-row" style={{ marginTop: '14px' }}>
            <div className="field-label"><span>Payment Rail</span></div>
            <select style={{ width: '100%' }}>
              <option>Instant Bank Transfer (NIBSS / SEPA / ACH)</option>
              <option>Visa / Mastercard Debit (Apple Pay / Google Pay)</option>
              <option>Mobile Money (M-Pesa / GCash / Maya)</option>
              <option>Unified Spot USDT Balance</option>
            </select>
          </div>

          <div className="fee-breakdown">
            <div><span>Guaranteed Rate</span><span className="mono">1 BTC = 67,214.50 USD</span></div>
            <div><span>Gateway Network Fee</span><span className="mono text-emerald">0.00 (Waived for Tier 1)</span></div>
            <div className="tot">
              <span>Total Settlement</span>
              <span className="mono text-purple font-bold">{payAmount} {fiatCurrency}</span>
            </div>
          </div>

          <button
            className={`btn ${side === 'buy' ? 'btn-primary' : 'btn-sell'} oe-submit`}
            style={{ width: '100%', marginTop: '16px', height: '44px', fontWeight: 700 }}
            onClick={() => onShowToast(`✓ Successfully executed ${side.toUpperCase()} order for ${receiveEst} BTC`)}
          >
            {side === 'buy' ? 'Buy BTC Instantly' : 'Sell BTC to Fiat'}
          </button>
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <div className="section-title" style={{ fontSize: '15px', marginBottom: '14px' }}>
            <span>Recent Gateway Settlements</span>
          </div>

          <div className="settings-row">
            <div>
              <div className="t">Bought 0.0031 BTC</div>
              <div className="d">Card payment · 21 Aug 2026</div>
            </div>
            <span className="mono font-bold text-white">$210.00</span>
          </div>

          <div className="settings-row">
            <div>
              <div className="t">Sold 50.00 USDT</div>
              <div className="d">Instant Bank Payout · 18 Aug 2026</div>
            </div>
            <span className="mono font-bold text-emerald">₦80,620</span>
          </div>

          <div className="settings-row">
            <div>
              <div className="t">Bought 0.42 SOL</div>
              <div className="d">Custody Balance · 15 Aug 2026</div>
            </div>
            <span className="mono font-bold text-white">$74.90</span>
          </div>

          <div className="badge-row" style={{ marginTop: '18px' }}>
            <div className="trust-badge">
              <ShieldCheck size={14} className="text-emerald" /> Direct deposit to your segregated Spot balance
            </div>
            <div className="trust-badge">
              <ShieldCheck size={14} className="text-purple" /> Rate locked for 15 seconds during payment authorization
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
