'use client';

import React, { useState } from 'react';

interface SendViewProps {
  onShowToast: (msg: string) => void;
}

export const SendView: React.FC<SendViewProps> = ({ onShowToast }) => {
  const [tab, setTab] = useState<'external' | 'oknexus'>('external');
  const [amount, setAmount] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');

  return (
    <section className="view active" id="view-send">
      <div className="section-title">
        <span>Transfer &amp; Send</span>
        <span className="text-dim text-xs">On-Chain &amp; Zero-Fee OKNexus Direct</span>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === 'external' ? 'active' : ''}`} onClick={() => setTab('external')}>
          External Blockchain Address
        </button>
        <button className={`tab ${tab === 'oknexus' ? 'active' : ''}`} onClick={() => setTab('oknexus')}>
          OKNexus User ID / Email (Zero-Fee)
        </button>
      </div>

      <div className="dash-grid">
        <div className="card" style={{ padding: '22px' }}>
          {tab === 'external' ? (
            <div>
              <div className="field-row">
                <div className="field-label">
                  <span>Asset</span>
                  <span className="mono text-dim">Available: 10,540.22 USDT</span>
                </div>
                <select style={{ width: '100%' }}>
                  <option>USDT (Tether USD)</option>
                  <option>BTC (Bitcoin)</option>
                  <option>ETH (Ethereum)</option>
                </select>
              </div>

              <div className="field-row">
                <div className="field-label"><span>Transfer Network</span></div>
                <select style={{ width: '100%' }}>
                  <option>TRC20 (Tron)</option>
                  <option>ERC20 (Ethereum)</option>
                </select>
              </div>

              <div className="field-row">
                <div className="field-label"><span>Recipient Address</span></div>
                <input 
                  style={{ width: '100%' }} 
                  placeholder="Paste external blockchain address" 
                  value={recipient} 
                  onChange={(e) => setRecipient(e.target.value)} 
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="field-row">
                <div className="field-label"><span>Asset</span></div>
                <select style={{ width: '100%' }}>
                  <option>USDT (Tether USD)</option>
                  <option>BTC (Bitcoin)</option>
                  <option>OKN (OKNexus Token)</option>
                </select>
              </div>

              <div className="field-row">
                <div className="field-label"><span>Recipient User</span></div>
                <input 
                  style={{ width: '100%' }} 
                  placeholder="Username (e.g. @NairaKing), email, or UID" 
                  value={recipient} 
                  onChange={(e) => setRecipient(e.target.value)} 
                />
              </div>
            </div>
          )}

          <div className="field-row">
            <div className="field-label"><span>Transfer Amount</span></div>
            <input 
              style={{ width: '100%' }} 
              placeholder="0.00" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
            />
          </div>

          <div className="fee-breakdown">
            <div>
              <span>Transfer Fee</span>
              <span className="mono text-emerald">
                {tab === 'oknexus' ? '0.00 (Zero-Fee Internal)' : '1.00 USDT'}
              </span>
            </div>
            <div className="tot">
              <span>Recipient Receives</span>
              <span className="mono text-purple font-bold">
                {amount ? (tab === 'oknexus' ? amount : Math.max(0, parseFloat(amount) - 1).toFixed(2)) : '0.00'}
              </span>
            </div>
          </div>

          <button
            className="btn btn-primary oe-submit"
            style={{ width: '100%', marginTop: '16px' }}
            onClick={() => onShowToast('✓ Transfer authorized — transaction broadcasted')}
          >
            Review &amp; Execute Send
          </button>

          <p style={{ fontSize: '11px', color: 'var(--text-faint)', marginTop: '10px' }}>
            Sends to other OKNexus users are instant, off-chain, and 100% free. External blockchain transactions broadcast to the decentralized network.
          </p>
        </div>

        <div className="card" style={{ padding: '22px' }}>
          <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '12px' }}>
            <span>Recent Transfers</span>
          </div>

          <div className="settings-row">
            <div>
              <div className="t">→ 0xA9f2...11cD</div>
              <div className="d">0.05 ETH · ERC20 · 19 Aug 2026</div>
            </div>
            <span className="pill pill-buy">Completed</span>
          </div>

          <div className="settings-row">
            <div>
              <div className="t">→ @NairaKing</div>
              <div className="d">150.00 USDT · Internal Direct · 10 Aug 2026</div>
            </div>
            <span className="pill pill-buy">Completed</span>
          </div>
        </div>
      </div>
    </section>
  );
};
