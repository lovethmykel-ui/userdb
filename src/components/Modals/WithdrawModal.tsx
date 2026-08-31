'use client';

import React, { useState } from 'react';
import { X, ShieldCheck } from '@phosphor-icons/react';
import { CryptoIcon } from '@/components/CryptoIcons/CryptoIcon';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const [selectedAsset, setSelectedAsset] = useState<string>('USDT');
  const [amount, setAmount] = useState<string>('');

  if (!isOpen) return null;

  const numAmt = parseFloat(amount) || 0;
  const receiveAmt = Math.max(0, numAmt - 1.0);

  const handleSubmit = () => {
    onClose();
    onShowToast('✓ Withdrawal authorized — multi-sig processing initiated');
  };

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ boxShadow: '0 16px 48px rgba(0, 0, 0, 0.7)' }}>
        <div className="modal-head">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-emerald" />
            <h3>Withdraw Digital Assets</h3>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-dim)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Quick Token Selector */}
        <div className="field-row">
          <div className="field-label">
            <span>Select Asset</span>
            <span className="mono text-dim">Available: 10,540.22 {selectedAsset}</span>
          </div>
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
          <div className="field-label"><span>Destination Address</span></div>
          <input style={{ width: '100%' }} placeholder="Paste whitelisted destination address" />
        </div>

        <div className="field-row">
          <div className="field-label">
            <span>Withdrawal Amount</span>
            <button 
              style={{ color: 'var(--brand)', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => setAmount('10540.22')}
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

        <div className="fee-breakdown" style={{ marginTop: '12px' }}>
          <div><span>Network Mining Gas</span><span className="mono font-bold text-white">1.00 {selectedAsset}</span></div>
          <div><span>Estimated Net Receive</span><span className="mono text-purple font-bold">{receiveAmt.toFixed(2)} {selectedAsset}</span></div>
        </div>

        <button
          className="btn btn-primary oe-submit"
          style={{ marginTop: '16px', width: '100%', height: '44px', fontWeight: 700 }}
          onClick={handleSubmit}
        >
          Confirm Withdrawal
        </button>

        <p style={{ fontSize: '11px', color: 'var(--text-faint)', marginTop: '10px', textAlign: 'center' }}>
          Withdrawals over your daily limit require multi-sig security review prior to on-chain broadcast.
        </p>
      </div>
    </div>
  );
};
