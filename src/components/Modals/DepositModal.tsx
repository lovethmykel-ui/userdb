'use client';

import React, { useState } from 'react';
import { Copy, X, ShieldCheck } from '@phosphor-icons/react';
import { CryptoIcon } from '@/components/CryptoIcons/CryptoIcon';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const [selectedAsset, setSelectedAsset] = useState<string>('USDT');

  if (!isOpen) return null;

  const copyAddr = () => {
    navigator.clipboard.writeText('TXk9qP2m8n7vQ4wLh8sZ7r9kP2m8n7vQ');
    onShowToast('✓ Deposit address copied');
  };

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ boxShadow: '0 16px 48px rgba(0, 0, 0, 0.7)' }}>
        <div className="modal-head">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-purple" />
            <h3>Deposit Digital Assets</h3>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-dim)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Quick Token Selector */}
        <div className="field-row">
          <div className="field-label"><span>Select Asset</span></div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
            {['USDT', 'BTC', 'ETH', 'SOL', 'BNB', 'OKN'].map((c) => (
              <button
                key={c}
                className={`chip ${selectedAsset === c ? 'active' : ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 10px' }}
                onClick={() => setSelectedAsset(c)}
              >
                <CryptoIcon sym={c} size={16} />
                <span>{c}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="field-row">
          <div className="field-label"><span>Deposit Network</span></div>
          <select style={{ width: '100%' }}>
            <option>TRC20 (Tron) — Recommended (~1 min)</option>
            <option>BEP20 (BNB Smart Chain)</option>
            <option>ERC20 (Ethereum)</option>
            <option>Solana</option>
          </select>
        </div>

        <div className="qr-box" style={{ padding: '10px', background: '#FFFFFF', borderRadius: '10px', margin: '14px auto' }}>
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
          <button onClick={copyAddr} style={{ color: 'var(--brand-light)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, cursor: 'pointer' }}>
            <Copy size={15} /> Copy
          </button>
        </div>

        <p style={{ fontSize: '11px', color: 'var(--text-faint)', marginTop: '12px', textAlign: 'center' }}>
          Send only {selectedAsset} to this designated segregated custody address.
        </p>
      </div>
    </div>
  );
};
