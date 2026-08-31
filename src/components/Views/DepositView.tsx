'use client';

import React, { useState } from 'react';
import { Copy, ShieldCheck, CheckCircle } from '@phosphor-icons/react';
import { CryptoIcon } from '@/components/CryptoIcons/CryptoIcon';

interface DepositViewProps {
  onShowToast: (msg: string) => void;
  onNavigate: (view: string) => void;
}

export const DepositView: React.FC<DepositViewProps> = ({ onShowToast, onNavigate }) => {
  const [tab, setTab] = useState<'crypto' | 'fiat'>('crypto');
  const [asset, setAsset] = useState<string>('USDT');
  const [network, setNetwork] = useState<string>('TRC20 (Tron)');
  const [fiatCurrency, setFiatCurrency] = useState<string>('USD');

  const copyAddress = () => {
    navigator.clipboard.writeText('TXk9qP2m8n7vQ4wLh8sZ7r9kP2m8n7vQ');
    onShowToast('✓ Deposit address copied to clipboard');
  };

  const cryptoOptions = ['USDT', 'BTC', 'ETH', 'SOL', 'BNB', 'OKN', 'XRP'];

  return (
    <section className="view active" id="view-deposit">
      <div className="section-title">
        <div>
          <span>Deposit Crypto &amp; Fiat Assets</span>
          <p className="text-dim" style={{ fontSize: '12px', marginTop: '2px' }}>
            Instant multi-chain ingestion directly to your segregated institutional cold custody account
          </p>
        </div>
        <div className="pill pill-brand" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ShieldCheck size={14} className="text-purple" /> Multi-Sig Segregated
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === 'crypto' ? 'active' : ''}`} onClick={() => setTab('crypto')}>
          Crypto Deposit
        </button>
        <button className={`tab ${tab === 'fiat' ? 'active' : ''}`} onClick={() => setTab('fiat')}>
          Fiat On-Ramp
        </button>
      </div>

      {tab === 'crypto' ? (
        <div className="dash-grid">
          <div className="card" style={{ padding: '24px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)' }}>
            {/* Quick Coin Picker */}
            <div className="field-row">
              <div className="field-label"><span>Select Asset</span></div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                {cryptoOptions.map((c) => (
                  <button
                    key={c}
                    className={`chip ${asset === c ? 'active' : ''}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px' }}
                    onClick={() => setAsset(c)}
                  >
                    <CryptoIcon sym={c} size={18} />
                    <span>{c}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="field-row">
              <div className="field-label"><span>Select Transfer Network</span></div>
              <select style={{ width: '100%' }} value={network} onChange={(e) => setNetwork(e.target.value)}>
                <option value="TRC20 (Tron)">TRC20 (Tron) — Recommended (~1 min, 20 blocks)</option>
                <option value="BEP20 (BNB Smart Chain)">BEP20 (BNB Smart Chain) (~1 min)</option>
                <option value="ERC20 (Ethereum)">ERC20 (Ethereum) (~3 min)</option>
                <option value="Solana">Solana Network (~30 sec)</option>
              </select>
            </div>

            <div className="qr-box" style={{ padding: '12px', background: '#FFFFFF', borderRadius: '10px', margin: '16px auto' }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <rect width="120" height="120" fill="#fff" />
                <g fill="#0A0E13">
                  <rect x="6" y="6" width="30" height="30" />
                  <rect x="84" y="6" width="30" height="30" />
                  <rect x="6" y="84" width="30" height="30" />
                  <rect x="14" y="14" width="14" height="14" fill="#fff" />
                  <rect x="92" y="14" width="14" height="14" fill="#fff" />
                  <rect x="14" y="92" width="14" height="14" fill="#fff" />
                  <rect x="46" y="6" width="6" height="6" />
                  <rect x="58" y="6" width="6" height="6" />
                  <rect x="46" y="18" width="6" height="6" />
                  <rect x="70" y="18" width="6" height="6" />
                  <rect x="46" y="46" width="6" height="6" />
                  <rect x="58" y="46" width="6" height="6" />
                  <rect x="70" y="46" width="6" height="6" />
                  <rect x="46" y="58" width="6" height="6" />
                  <rect x="82" y="58" width="6" height="6" />
                  <rect x="46" y="70" width="6" height="6" />
                  <rect x="58" y="70" width="6" height="6" />
                  <rect x="98" y="70" width="6" height="6" />
                  <rect x="46" y="82" width="6" height="6" />
                  <rect x="70" y="82" width="6" height="6" />
                  <rect x="58" y="94" width="6" height="6" />
                  <rect x="70" y="94" width="6" height="6" />
                  <rect x="82" y="94" width="6" height="6" />
                  <rect x="46" y="98" width="6" height="6" />
                </g>
              </svg>
            </div>

            <div className="addr-box" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
              <span className="font-mono text-white">TXk9qP2m8n7vQ4wLh8sZ7r9kP2m8n7vQ</span>
              <button onClick={copyAddress} style={{ color: 'var(--brand-light)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                <Copy size={15} /> Copy
              </button>
            </div>

            <div className="fee-breakdown" style={{ marginTop: '16px' }}>
              <div><span>Minimum Ingestion</span><span className="mono font-bold text-white">10.00 {asset}</span></div>
              <div><span>Network Gas Fee</span><span className="mono text-emerald font-bold">0.00 (Sender Pays)</span></div>
              <div><span>Expected Confirmation</span><span className="mono font-bold text-purple">~2 min (20 blocks)</span></div>
            </div>

            <p style={{ fontSize: '11px', color: 'var(--text-faint)', marginTop: '12px', textAlign: 'center' }}>
              Send only {asset} via {network} to this address. Sending an unsupported token may result in permanent loss.
            </p>
          </div>

          <div className="card" style={{ padding: '24px' }}>
            <div className="section-title" style={{ fontSize: '15px', marginBottom: '14px' }}>
              <span>Recent Ingestion Stream</span>
            </div>
            <div className="card table-wrap" style={{ border: 'none' }}>
              <table>
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Network</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="flex items-center gap-2">
                        <CryptoIcon sym="USDT" size={20} />
                        <span className="font-bold">USDT</span>
                      </div>
                    </td>
                    <td className="text-dim font-mono">TRC20</td>
                    <td className="mono up font-bold">+1,000.00</td>
                    <td><span className="pill pill-buy">Completed</span></td>
                    <td className="text-dim text-xs">Today, 09:14</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="flex items-center gap-2">
                        <CryptoIcon sym="BTC" size={20} />
                        <span className="font-bold">BTC</span>
                      </div>
                    </td>
                    <td className="text-dim font-mono">Bitcoin</td>
                    <td className="mono up font-bold">+0.0150</td>
                    <td><span className="pill pill-buy">Completed</span></td>
                    <td className="text-dim text-xs">Yesterday, 21:02</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="flex items-center gap-2">
                        <CryptoIcon sym="ETH" size={20} />
                        <span className="font-bold">ETH</span>
                      </div>
                    </td>
                    <td className="text-dim font-mono">ERC20</td>
                    <td className="mono font-bold text-white">+0.4200</td>
                    <td><span className="pill pill-neutral">Confirming (18/20)</span></td>
                    <td className="text-dim text-xs">Yesterday, 18:47</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="dash-grid">
          <div className="card" style={{ padding: '24px' }}>
            <div className="field-row">
              <div className="field-label"><span>Select Currency</span></div>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                {['USD', 'NGN', 'EUR', 'GBP', 'KES'].map((f) => (
                  <button
                    key={f}
                    className={`chip ${fiatCurrency === f ? 'active' : ''}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    onClick={() => setFiatCurrency(f)}
                  >
                    <CryptoIcon sym={f} size={18} />
                    <span>{f}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="field-row">
              <div className="field-label"><span>Payment Rail</span></div>
              <select style={{ width: '100%' }}>
                <option>Local Instant Bank Transfer (Zero Fee)</option>
                <option>Visa / Mastercard Debit (Apple Pay / Google Pay)</option>
                <option>Direct Mobile Money Clearing</option>
              </select>
            </div>

            <div className="field-row">
              <div className="field-label"><span>Deposit Amount</span></div>
              <input style={{ width: '100%' }} placeholder="0.00" defaultValue="500.00" />
            </div>

            <div className="fee-breakdown">
              <div><span>Processing Fee</span><span className="mono text-emerald">0.00% (Free for VIP 0+)</span></div>
              <div><span>Estimated Ingestion SLA</span><span className="mono text-purple font-bold">Instant – 5 minutes</span></div>
            </div>

            <button className="btn btn-primary oe-submit" style={{ width: '100%', marginTop: '16px', height: '44px', fontWeight: 700 }} onClick={() => onShowToast('✓ Fiat deposit gateway authorized')}>
              Continue to Secure Bank Gateway
            </button>
          </div>

          <div className="card" style={{ padding: '24px' }}>
            <div className="section-title" style={{ fontSize: '15px', marginBottom: '14px' }}>
              <span>Saved Payment Rails</span>
            </div>
            <div className="settings-row">
              <div>
                <div className="t">GTBank •••• 4821</div>
                <div className="d">Instant Bank Wire · NGN</div>
              </div>
              <span className="pill pill-buy">Default</span>
            </div>
            <div className="settings-row">
              <div>
                <div className="t">Visa Signature •••• 0071</div>
                <div className="d">Debit Card · USD</div>
              </div>
              <span className="pill pill-neutral cursor-pointer" onClick={() => onNavigate('payment-methods')}>Manage →</span>
            </div>
            <button className="btn btn-ghost" style={{ width: '100%', marginTop: '14px' }} onClick={() => onNavigate('payment-methods')}>
              + Add New Payment Method
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
