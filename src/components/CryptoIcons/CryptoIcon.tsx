'use client';

import React, { useState } from 'react';

interface CryptoIconProps {
  sym: string;
  size?: number;
  className?: string;
}

export const CryptoIcon: React.FC<CryptoIconProps> = ({ sym, size = 26, className = '' }) => {
  const [error, setError] = useState(false);
  const uppercaseSym = (sym || '').toUpperCase();
  const lowercaseSym = (sym || '').toLowerCase();

  // Specific fallback for fiat or missing tokens
  if (error || ['USD', 'NGN', 'EUR', 'GBP', 'KES', 'IDR', 'PHP'].includes(uppercaseSym)) {
    return (
      <div
        className={`flex items-center justify-center rounded-full font-bold text-white uppercase ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          fontSize: `${size * 0.38}px`,
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          lineHeight: 1
        }}
      >
        {uppercaseSym === 'USD' ? '$' : 
         uppercaseSym === 'NGN' ? '₦' : 
         uppercaseSym === 'EUR' ? '€' : 
         uppercaseSym === 'GBP' ? '£' : 
         uppercaseSym.slice(0, 2)}
      </div>
    );
  }

  return (
    <img
      src={`/new-crypto-logos/SVG/${lowercaseSym}.svg`}
      alt={`${sym} icon`}
      width={size}
      height={size}
      className={className}
      onError={() => setError(true)}
      style={{ display: 'block', borderRadius: '50%' }}
    />
  );
};
