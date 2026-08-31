'use client';

import React, { useState } from 'react';
import { CryptoIcon } from '@/components/CryptoIcons/CryptoIcon';
import { ArrowsDownUp, CaretDown, ShieldCheck, Sparkle, Lightning } from '@phosphor-icons/react';

interface ConvertViewProps {
  onShowToast: (msg: string) => void;
}

export const ConvertView: React.FC<ConvertViewProps> = ({ onShowToast }) => {
  const [fromAsset, setFromAsset] = useState<string>('USDT');
  const [toAsset, setToAsset] = useState<string>('BTC');
  const [fromAmount, setFromAmount] = useState<string>('1000.00');

  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState<boolean>(false);
  const [isToDropdownOpen, setIsToDropdownOpen] = useState<boolean>(false);

  const availableCoins = ['USDT', 'BTC', 'ETH', 'SOL', 'BNB', 'OKN', 'XRP'];

  const prices: Record<string, number> = {
    USDT: 1.0,
    BTC: 67214.50,
    ETH: 3542.18,
    SOL: 178.34,
    BNB: 612.90,
    OKN: 0.4187,
    XRP: 0.6120
  };

  const numFrom = parseFloat(fromAmount.replace(/,/g, '')) || 0;
  const fromPriceUsdt = prices[fromAsset] || 1;
  const toPriceUsdt = prices[toAsset] || 1;
  
  const fromValInUsdt = numFrom * fromPriceUsdt;
  const toAmount = (fromValInUsdt / toPriceUsdt).toFixed(toPriceUsdt > 100 ? 6 : 2);
  const feeSpread = (fromValInUsdt * 0.002).toFixed(2);

  const handleFlip = () => {
    const prevFrom = fromAsset;
    setFromAsset(toAsset);
    setToAsset(prevFrom);
  };

  return (
    <section className="view active" id="view-convert">
      <div className="section-title">
        <div>
          <span>Instant Institutional Converter</span>
          <p className="text-dim" style={{ fontSize: '12px', marginTop: '2px' }}>
            Zero-slippage conversion with locked OTC liquidity &amp; no network gas fees
          </p>
        </div>
        <div className="pill pill-brand" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Lightning size={13} className="text-purple" /> Sub-Second Execution
        </div>
      </div>

      <div className="convert-wrap">
        <div className="card convert-card" style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)' }}>
          {/* From Box */}
          <div className="swap-box" style={{ position: 'relative' }}>
            <div className="l">
              <span>You Pay</span>
              <span className="mono">Available: 10,540.22 {fromAsset}</span>
            </div>
            <div className="swap-row">
              <input
                type="text"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.00"
                style={{ fontSize: '26px', color: '#FFFFFF', fontWeight: 700 }}
              />
              <div 
                className="swap-asset cursor-pointer" 
                onClick={() => setIsFromDropdownOpen(!isFromDropdownOpen)}
                style={{ background: 'var(--surface-hover)', border: '1px solid var(--border)' }}
              >
                <CryptoIcon sym={fromAsset} size={22} />
                <span className="font-bold text-white">{fromAsset}</span>
                <CaretDown size={12} className="text-dim" />
              </div>
            </div>

            {/* From Dropdown Menu */}
            {isFromDropdownOpen && (
              <div 
                className="card scrollhide" 
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: '14px',
                  width: '180px',
                  maxHeight: '220px',
                  overflowY: 'auto',
                  zIndex: 30,
                  background: 'var(--surface)',
                  border: '1px solid var(--brand-dim)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                  padding: '6px'
                }}
              >
                {availableCoins.filter(c => c !== toAsset).map(c => (
                  <div
                    key={c}
                    className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-[var(--surface-hover)]"
                    onClick={() => {
                      setFromAsset(c);
                      setIsFromDropdownOpen(false);
                    }}
                    style={{ padding: '8px 10px', borderRadius: '6px' }}
                  >
                    <CryptoIcon sym={c} size={20} />
                    <span className="font-bold text-xs text-white">{c}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Flip Button */}
          <div className="swap-mid">
            <button 
              onClick={handleFlip} 
              title="Invert Direction"
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--brand)',
                boxShadow: '0 0 12px rgba(139, 92, 246, 0.4)',
                color: 'var(--brand-light)'
              }}
            >
              <ArrowsDownUp size={16} />
            </button>
          </div>

          {/* To Box */}
          <div className="swap-box" style={{ position: 'relative' }}>
            <div className="l">
              <span>You Receive (Estimated)</span>
              <span className="mono">Rate locked for 15s</span>
            </div>
            <div className="swap-row">
              <input 
                type="text" 
                value={toAmount} 
                disabled 
                style={{ fontSize: '26px', color: 'var(--brand-light)', fontWeight: 700 }}
              />
              <div 
                className="swap-asset cursor-pointer" 
                onClick={() => setIsToDropdownOpen(!isToDropdownOpen)}
                style={{ background: 'var(--surface-hover)', border: '1px solid var(--border)' }}
              >
                <CryptoIcon sym={toAsset} size={22} />
                <span className="font-bold text-white">{toAsset}</span>
                <CaretDown size={12} className="text-dim" />
              </div>
            </div>

            {/* To Dropdown Menu */}
            {isToDropdownOpen && (
              <div 
                className="card scrollhide" 
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: '14px',
                  width: '180px',
                  maxHeight: '220px',
                  overflowY: 'auto',
                  zIndex: 30,
                  background: 'var(--surface)',
                  border: '1px solid var(--brand-dim)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                  padding: '6px'
                }}
              >
                {availableCoins.filter(c => c !== fromAsset).map(c => (
                  <div
                    key={c}
                    className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-[var(--surface-hover)]"
                    onClick={() => {
                      setToAsset(c);
                      setIsToDropdownOpen(false);
                    }}
                    style={{ padding: '8px 10px', borderRadius: '6px' }}
                  >
                    <CryptoIcon sym={c} size={20} />
                    <span className="font-bold text-xs text-white">{c}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Real-time Rate Indicator */}
          <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '12px', display: 'flex', justifyContent: 'space-between', padding: '0 4px' }}>
            <span>Settlement Rate</span>
            <span className="mono font-bold text-white">
              1 {fromAsset} = {(fromPriceUsdt / toPriceUsdt).toFixed(toPriceUsdt > 100 ? 6 : 4)} {toAsset}
            </span>
          </div>

          {/* Fee & Liquidity Breakdown */}
          <div className="fee-breakdown" style={{ marginTop: '12px', background: 'var(--surface-2)', border: '1px solid var(--border-soft)' }}>
            <div>
              <span>Market Maker Spread (0.20%)</span>
              <span className="mono font-bold text-white">{feeSpread} USDT</span>
            </div>
            <div>
              <span>Network Execution Gas</span>
              <span className="mono text-emerald font-bold">0.00 (Zero Gas Internal)</span>
            </div>
            <div className="tot">
              <span>Net Invoiced</span>
              <span className="mono text-purple font-bold">{fromAmount} {fromAsset}</span>
            </div>
          </div>

          <button 
            className="btn btn-primary oe-submit" 
            style={{ width: '100%', marginTop: '16px', height: '44px', fontSize: '14px', letterSpacing: '0.3px' }}
            onClick={() => onShowToast(`✓ Successfully converted ${fromAmount} ${fromAsset} to ${toAmount} ${toAsset}`)}
          >
            Execute Instant Conversion
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '12px', fontSize: '11px', color: 'var(--text-faint)' }}>
            <ShieldCheck size={14} className="text-emerald" />
            <span>Multi-asset settlement verified by OKNexus Liquidity Engine</span>
          </div>
        </div>
      </div>
    </section>
  );
};
