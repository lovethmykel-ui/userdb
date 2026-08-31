'use client';

import React from 'react';

interface PaymentMethodsViewProps {
  onShowToast: (msg: string) => void;
}

export const PaymentMethodsView: React.FC<PaymentMethodsViewProps> = ({ onShowToast }) => {
  return (
    <section className="view active" id="view-payment-methods">
      <div className="section-title">
        <span>Saved Payment Methods</span>
        <span className="text-dim text-xs">Fiat &amp; P2P Settlement Rails</span>
      </div>

      <div className="card settings-card">
        <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '4px' }}>
          <span>Bank Accounts</span>
        </div>
        <div className="settings-row">
          <div>
            <div className="t">GTBank •••• 4821</div>
            <div className="d">NGN · Tobi A. · Instant Automated Clearing</div>
          </div>
          <span className="pill pill-buy">Default</span>
        </div>
        <div className="settings-row">
          <div>
            <div className="t">First Bank •••• 0093</div>
            <div className="d">NGN · Tobi A.</div>
          </div>
          <button className="pill pill-neutral cursor-pointer" onClick={() => onShowToast('✓ Set First Bank as default payout account')}>
            Set Default
          </button>
        </div>
        <button className="btn btn-ghost" style={{ width: '100%', marginTop: '10px' }} onClick={() => onShowToast('✓ Bank account setup modal')}>
          + Add Bank Account
        </button>
      </div>

      <div className="card settings-card">
        <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '4px' }}>
          <span>Debit / Credit Cards</span>
        </div>
        <div className="settings-row">
          <div>
            <div className="t">Visa Signature •••• 0071</div>
            <div className="d">Expires 08/28 · USD / Global Card Rail</div>
          </div>
          <button className="pill pill-neutral cursor-pointer" onClick={() => onShowToast('✓ Card detached')}>
            Remove
          </button>
        </div>
        <button className="btn btn-ghost" style={{ width: '100%', marginTop: '10px' }} onClick={() => onShowToast('✓ Card authorization form opened')}>
          + Add Card
        </button>
      </div>

      <div className="card settings-card">
        <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '4px' }}>
          <span>Mobile Money &amp; Regional Wallets</span>
        </div>
        <div className="settings-row">
          <div>
            <div className="t">M-Pesa •••• 2290</div>
            <div className="d">KES · Safaricom Direct</div>
          </div>
          <button className="pill pill-neutral cursor-pointer" onClick={() => onShowToast('✓ Method updated')}>
            Manage
          </button>
        </div>
        <button className="btn btn-ghost" style={{ width: '100%', marginTop: '10px' }} onClick={() => onShowToast('✓ Mobile money connection prompt')}>
          + Add Mobile Money Method
        </button>
      </div>
    </section>
  );
};
