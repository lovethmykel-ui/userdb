'use client';

import React, { useState, useEffect } from 'react';
import { Coin } from '@/lib/types';
import { CryptoIcon } from '@/components/CryptoIcons/CryptoIcon';
import { Star } from '@phosphor-icons/react';

interface MarketsViewProps {
  coins: Coin[];
  onNavigate: (view: string) => void;
}

export const MarketsView: React.FC<MarketsViewProps> = ({ coins, onNavigate }) => {
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>(['BTC', 'ETH', 'OKN']);

  const toggleFavorite = (sym: string) => {
    setFavorites((prev) => 
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const getFilteredCoins = () => {
    let result = coins.filter((c) => 
      c.sym.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filter === 'favorites') {
      result = result.filter((c) => favorites.includes(c.sym));
    } else if (filter === 'gainers') {
      result = result.filter((c) => c.chg > 0).sort((a, b) => b.chg - a.chg);
    } else if (filter === 'losers') {
      result = result.filter((c) => c.chg < 0).sort((a, b) => a.chg - b.chg);
    } else if (filter === 'new') {
      result = result.slice(-4);
    }
    return result;
  };

  const filtered = getFilteredCoins();

  // Draw Markets Page Sparklines
  useEffect(() => {
    filtered.forEach((c) => {
      const canvas = document.getElementById(`mspark-${c.sym}`) as HTMLCanvasElement;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const w = 90;
      const h = 26;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, w, h);
      const points = [40, 42, 39, 45, 48, 47, 52, 56, 54, 60];
      const min = Math.min(...points);
      const max = Math.max(...points);
      const range = max - min || 1;
      const color = c.chg >= 0 ? '#2FBD8E' : '#F1667A';

      ctx.beginPath();
      points.forEach((p, i) => {
        const x = (i / (points.length - 1)) * w;
        const y = h - ((p - min) / range) * (h * 0.75) - 3;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }, [filtered]);

  return (
    <section className="view active" id="view-markets">
      <div className="section-title">
        <span>Markets Overview</span>
        <span className="text-dim text-xs">Tier-1 Multi-Chain Liquidity Indices</span>
      </div>

      {/* Toolbar */}
      <div className="markets-toolbar">
        <input
          type="text"
          className="search-input"
          placeholder="Search coin or pair..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="filters">
          {(['all', 'favorites', 'gainers', 'losers', 'new'] as const).map((f) => (
            <button
              key={f}
              className={`chip ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'favorites' ? '★ Favorites' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Markets Table */}
      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th style={{ width: '30px' }}></th>
              <th>Asset</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>24h High</th>
              <th>24h Low</th>
              <th>24h Volume</th>
              <th>Trend</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => {
              const isFav = favorites.includes(c.sym);
              return (
                <tr key={c.sym}>
                  <td 
                    style={{ color: isFav ? 'var(--brand)' : 'var(--text-faint)', cursor: 'pointer' }}
                    onClick={() => toggleFavorite(c.sym)}
                  >
                    <Star size={16} weight={isFav ? 'fill' : 'regular'} />
                  </td>
                  <td>
                    <div className="asset-cell">
                      <CryptoIcon sym={c.sym} size={28} />
                      <div>
                        <div style={{ fontWeight: 600 }}>{c.sym}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{c.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="mono font-bold text-white">${c.price.toLocaleString('en-US', { minimumFractionDigits: c.price < 1 ? 4 : 2 })}</td>
                  <td className={c.chg >= 0 ? 'up font-bold mono' : 'down font-bold mono'}>
                    {c.chg >= 0 ? '+' : ''}{c.chg}%
                  </td>
                  <td className="mono text-white">${c.high24h.toLocaleString('en-US', { minimumFractionDigits: c.price < 1 ? 4 : 2 })}</td>
                  <td className="mono text-dim">${c.low24h.toLocaleString('en-US', { minimumFractionDigits: c.price < 1 ? 4 : 2 })}</td>
                  <td className="mono text-white">${c.vol}</td>
                  <td>
                    <canvas className="spark" id={`mspark-${c.sym}`} />
                  </td>
                  <td>
                    <button className="btn btn-ghost" onClick={() => onNavigate('trade')}>
                      Trade
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
