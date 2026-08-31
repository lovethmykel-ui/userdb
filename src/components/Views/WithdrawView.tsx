'use client';

import React, { useState } from 'react';

interface WithdrawViewProps {
  onShowToast: (msg: string) => void;
  onNavigate: (view: string) => void;
}

export const WithdrawView: React.FC<WithdrawViewProps> = ({ onShowToast, onNavigate }) => {
  const [tab, setTab] = useState<'crypto' | 'fiat'>('crypto');
  const [amount, setAmount] = useState<string>('');
  const [asset, setAsset] = useState<string>('USDT');

  const maxBalance = 10540.22;
  const numAmount = parseFloat(amount.replace(/,/g, '')) || 0;
  const netFee = 1.00;
  const receiveAmount = Math.max(0, numAmount - netFee);

  return (
    <section className="view active" id="view-withdraw">
      <div className="section-title">
        <span>Withdraw Funds</span>
        <span className="text-dim text-xs">2FA Enforced Whitelist Protection</span>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === 'crypto' ? 'active' : ''}`} onClick={() => setTab('crypto')}>
          Crypto Withdrawal
        </button>
        <button className={`tab ${tab === 'fiat' ? 'active' : ''}`} onClick={() => setTab('fiat')}>
          Fiat Payout
        </button>
      </div>

      {tab === 'crypto' ? (
        <div className="dash-grid">
          <div className="card" style={{ padding: '22px' }}>
            <div className="field-row">
              <div className="field-label">
                <span>Select Asset</span>
                <span className="mono text-dim">Available: 10,540.22 USDT</span>
              </div>
              <select style={{ width: '100%' }} value={asset} onChange={(e) => setAsset(e.target.value)}>
                <option value="USDT">USDT (Tether USD)</option>
                <option value="BTC">BTC (Bitcoin)</option>
                <option value="ETH">ETH (Ethereum)</option>
              </select>
            </div>

            <div className="field-row">
              <div className="field-label"><span>Transfer Network</span></div>
              <select style={{ width: '100%' }}>
                <option>TRC20 (Tron) — 1.00 USDT Fee</option>
                <option>BEP20 (BNB Chain) — 0.80 USDT Fee</option>
                <option>ERC20 (Ethereum) — 4.50 USDT Fee</option>
              </select>
            </div>

            <div className="field-row">
              <div className="field-label"><span>Recipient Address</span></div>
              <input style={{ width: '100%' }} placeholder="Paste or select whitelisted address" />
            </div>

            <div className="field-row">
              <div className="field-label">
                <span>Withdrawal Amount</span>
                <button 
                  style={{ color: 'var(--brand)', cursor: 'pointer', fontWeight: 600 }}
                  onClick={() => setAmount(maxBalance.toString())}
                >
                  Max
                </button>
              </div>
              <input 
                style={{ width: '100%' }} 
                placeholder="0.00" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
              />
            </div>

            <div className="fee-breakdown">
              <div><span>Network Mining Fee</span><span className="mono">1.00 USDT</span></div>
              <div><span>Minimum Withdrawal</span><span className="mono">10.00 USDT</span></div>
              <div className="tot">
                <span>Estimated Receive</span>
                <span className="mono text-purple font-bold">{receiveAmount.toFixed(2)} USDT</span>
              </div>
            </div>

            <button 
              className="btn btn-primary oe-submit" 
              style={{ width: '100%', marginTop: '16px' }}
              onClick={() => onShowToast('✓ 2FA Security prompt sent to your authenticator device')}
            >
              Authorize Withdrawal
            </button>

            <p style={{ fontSize: '11px', color: 'var(--text-faint)', marginTop: '10px' }}>
              Withdrawals require multi-factor authorization. Amounts exceeding daily threshold require automated risk engine sign-off.
            </p>
          </div>

          <div className="card" style={{ padding: '22px' }}>
            <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '10px' }}>
              <span>Daily Limit &amp; Address Whitelist</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '14px' }}>
              <div className="stat-card" style={{ padding: 0 }}>
                <div className="l">Used Today</div>
                <div className="v font-mono text-white" style={{ fontSize: '16px' }}>$1,200.00</div>
              </div>
              <div className="stat-card" style={{ padding: 0 }}>
                <div className="l">Remaining Limit</div>
                <div className="v font-mono text-emerald" style={{ fontSize: '16px' }}>$98,800.00</div>
              </div>
            </div>

            <div className="badge-row" style={{ marginTop: '12px' }}>
              <div className="trust-badge">
                <span className="dot" /> Level 2 Verified Institutional Limit: $100,000 / 24h
              </div>
            </div>

            <div className="section-title" style={{ fontSize: '14.5px', margin: '20px 0 6px' }}>
              <span>Address Whitelist</span>
            </div>

            <div className="settings-row">
              <div>
                <div className="t">Cold Storage — Ledger Nano X</div>
                <div className="d font-mono">bc1q9h...4kz2 · Added 3 Jun 2026</div>
              </div>
              <span className="pill pill-buy">Whitelisted</span>
            </div>

            <div className="settings-row">
              <div>
                <div className="t">OKX Institutional Deposit</div>
                <div className="d font-mono">0xA9f2...11cD · Added 14 Jul 2026</div>
              </div>
              <span className="pill pill-buy">Whitelisted</span>
            </div>

            <button className="btn btn-ghost" style={{ width: '100%', marginTop: '8px' }} onClick={() => onNavigate('settings')}>
              + Add Whitelisted Address
            </button>
          </div>
        </div>
      ) : (
        <div className="dash-grid">
          <div className="card" style={{ padding: '22px' }}>
            <div className="field-row">
              <div className="field-label"><span>Select Currency</span></div>
              <select style={{ width: '100%' }}>
                <option>NGN (₦ - Nigerian Naira)</option>
                <option>USD ($ - US Dollar)</option>
                <option>EUR (€ - Euro)</option>
                <option>KES (KSh - Kenyan Shilling)</option>
              </select>
            </div>

            <div className="field-row">
              <div className="field-label"><span>Payout Method</span></div>
              <select style={{ width: '100%' }}>
                <option>Direct Bank Wire / Instant Settlement</option>
                <option>Mobile Money Direct</option>
              </select>
            </div>

            <div className="field-row">
              <div className="field-label"><span>Select Saved Account</span></div>
              <select style={{ width: '100%' }}>
                <option>GTBank •••• 4821 (Tobi A.)</option>
                <option>First Bank •••• 0093 (Tobi A.)</option>
              </select>
            </div>

            <div className="field-row">
              <div className="field-label"><span>Payout Amount</span></div>
              <input style={{ width: '100%' }} placeholder="0.00" defaultValue="450,000" />
            </div>

            <div className="fee-breakdown">
              <div><span>Payout Gateway Fee</span><span className="mono">0.50%</span></div>
              <div><span>Estimated Arrival SLA</span><span className="mono text-emerald">Sub-10 Minutes</span></div>
            </div>

            <button className="btn btn-primary oe-submit" style={{ width: '100%', marginTop: '16px' }} onClick={() => onShowToast('✓ Payout request submitted to bank')}>
              Execute Bank Payout
            </button>
          </div>

          <div className="card" style={{ padding: '22px' }}>
            <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '12px' }}>
              <span>Recent Fiat Payouts</span>
            </div>

            <div className="settings-row">
              <div>
                <div className="t">₦450,000 → GTBank</div>
                <div className="d">Settled via Instant NIBSS · 20 Aug 2026</div>
              </div>
              <span className="pill pill-buy">Completed</span>
            </div>

            <div className="settings-row">
              <div>
                <div className="t">$200.00 → Visa •••• 0071</div>
                <div className="d">Settled · 12 Aug 2026</div>
              </div>
              <span className="pill pill-buy">Completed</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
