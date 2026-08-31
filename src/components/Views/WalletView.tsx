'use client';

import React, { useState } from 'react';
import { 
  ArrowDown, 
  ArrowUp, 
  PaperPlaneTilt, 
  Plus, 
  ArrowsLeftRight, 
  ShieldCheck, 
  LockKey 
} from '@phosphor-icons/react';
import { Coin } from '@/lib/types';
import { CryptoIcon } from '@/components/CryptoIcons/CryptoIcon';

interface WalletViewProps {
  coins: Coin[];
  onNavigate: (view: string) => void;
  onOpenDepositModal: () => void;
  onOpenWithdrawModal: () => void;
}

export const WalletView: React.FC<WalletViewProps> = ({
  coins,
  onNavigate,
  onOpenDepositModal,
  onOpenWithdrawModal
}) => {
  const [activeTab, setActiveTab] = useState<'assets' | 'history'>('assets');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const mockBalances: Record<string, number> = {
    BTC: 0.1842,
    ETH: 1.2040,
    USDT: 10540.22,
    SOL: 12.50,
    BNB: 2.10,
    XRP: 820.00,
    OKN: 1500.00,
    ADA: 0.00,
    DOGE: 0.00,
    TON: 4.20
  };

  const filteredCoins = coins.filter((c) => 
    c.sym.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="view active" id="view-wallet">
      <div className="section-title">
        <span>Institutional Asset Custody</span>
        <span className="text-dim text-xs">Multi-Signature Cold Storage Vaults</span>
      </div>

      {/* Summary Cards */}
      <div className="wallet-summary">
        <div className="card stat-card">
          <div className="l">Total Net Worth</div>
          <div className="v font-mono text-purple font-bold">$42,318.65</div>
        </div>
        <div className="card stat-card">
          <div className="l">Available Balance</div>
          <div className="v font-mono text-white font-bold">$39,120.10</div>
        </div>
        <div className="card stat-card">
          <div className="l">In Open Orders</div>
          <div className="v font-mono text-dim">$3,198.55</div>
        </div>
        <div className="card stat-card">
          <div className="l">Est. 24h P&amp;L</div>
          <div className="v up font-mono font-bold">+2.93% (+$1,204.11)</div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="badge-row">
        <div className="trust-badge">
          <ShieldCheck size={14} className="text-emerald" /> 95% Assets Secured in Offline Multi-Sig Cold Vaults
        </div>
        <div className="trust-badge">
          <LockKey size={14} className="text-purple" /> Hardware-Enforced Withdrawal Whitelist Active
        </div>
        <div className="trust-badge">
          <span className="dot" /> Merkle Tree Proof of Reserves: 104.8% Backed
        </div>
      </div>

      {/* Action Strip */}
      <div className="card" style={{ padding: '16px 18px', marginTop: '20px' }}>
        <div className="quick-actions" style={{ marginTop: 0 }}>
          <button className="qa-btn" onClick={onOpenDepositModal}>
            <span className="ic"><ArrowDown size={15} /></span> Deposit
          </button>
          <button className="qa-btn" onClick={onOpenWithdrawModal}>
            <span className="ic"><ArrowUp size={15} /></span> Withdraw
          </button>
          <button className="qa-btn" onClick={() => onNavigate('send')}>
            <span className="ic"><PaperPlaneTilt size={15} /></span> Send
          </button>
          <button className="qa-btn" onClick={() => onNavigate('buysell')}>
            <span className="ic"><Plus size={15} /></span> Buy Crypto
          </button>
          <button className="qa-btn" onClick={() => onNavigate('convert')}>
            <span className="ic"><ArrowsLeftRight size={15} /></span> Swap
          </button>
        </div>
      </div>

      {/* Assets & History Tabs */}
      <div className="wallet-toolbar" style={{ marginTop: '20px' }}>
        <div className="tabs" style={{ marginBottom: 0, border: 'none' }}>
          <button 
            className={`tab ${activeTab === 'assets' ? 'active' : ''}`}
            onClick={() => setActiveTab('assets')}
          >
            Assets
          </button>
          <button 
            className={`tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Deposit &amp; Withdrawal History
          </button>
        </div>

        <input 
          type="text" 
          className="search-input" 
          placeholder="Search asset..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '220px' }} 
        />
      </div>

      {/* Asset Table */}
      {activeTab === 'assets' ? (
        <div className="card table-wrap">
          <table>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Total Balance</th>
                <th>Available</th>
                <th>In Orders</th>
                <th>Value (USDT)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((c) => {
                const bal = mockBalances[c.sym] || 0;
                const avail = bal * 0.94;
                const inOrders = bal * 0.06;
                const valueUsdt = bal * c.price;

                return (
                  <tr key={c.sym}>
                    <td>
                      <div className="asset-cell">
                        <CryptoIcon sym={c.sym} size={28} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{c.sym}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{c.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="mono font-bold">{bal.toFixed(4)}</td>
                    <td className="mono text-white">{avail.toFixed(4)}</td>
                    <td className="mono text-dim">{inOrders.toFixed(4)}</td>
                    <td className="mono text-purple font-bold">${valueUsdt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <button className="btn btn-ghost" style={{ padding: '6px 9px', fontSize: '11.5px', marginRight: '4px' }} onClick={onOpenDepositModal}>
                        Deposit
                      </button>
                      <button className="btn btn-ghost" style={{ padding: '6px 9px', fontSize: '11.5px', marginRight: '4px' }} onClick={onOpenWithdrawModal}>
                        Withdraw
                      </button>
                      <button className="btn btn-ghost" style={{ padding: '6px 9px', fontSize: '11.5px', marginRight: '4px' }} onClick={() => onNavigate('trade')}>
                        Trade
                      </button>
                      <button className="btn btn-ghost" style={{ padding: '6px 9px', fontSize: '11.5px' }} onClick={() => onNavigate('earn')}>
                        Earn
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card table-wrap">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Asset</th>
                <th>Network</th>
                <th>Amount</th>
                <th>Status</th>
                <th>TxID / Address</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: 'Deposit', sym: 'USDT', net: 'TRC20', amt: '+1,000.00', status: 'Completed', tx: '0x384a...b48e', time: 'Today, 09:14' },
                { type: 'Deposit', sym: 'BTC', net: 'Bitcoin', amt: '+0.0150', status: 'Completed', tx: '38a4...091f', time: 'Yesterday, 21:02' },
                { type: 'Withdrawal', sym: 'ETH', net: 'ERC20', amt: '-0.1000', status: 'Completed', tx: '0x992c...f301', time: '19 Aug, 16:30' },
                { type: 'Deposit', sym: 'SOL', net: 'Solana', amt: '+4.5000', status: 'Completed', tx: '4w8x...99al', time: '15 Aug, 11:20' },
              ].map((tx, idx) => (
                <tr key={idx}>
                  <td>
                    <span className={`pill ${tx.type === 'Deposit' ? 'pill-buy' : 'pill-sell'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="font-bold">{tx.sym}</td>
                  <td className="text-dim">{tx.net}</td>
                  <td className={`mono font-bold ${tx.type === 'Deposit' ? 'up' : 'down'}`}>{tx.amt}</td>
                  <td><span className="pill pill-buy">{tx.status}</span></td>
                  <td className="mono text-dim">{tx.tx}</td>
                  <td className="text-dim text-xs">{tx.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
