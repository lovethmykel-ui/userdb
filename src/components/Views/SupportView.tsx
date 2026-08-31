'use client';

import React, { useState } from 'react';

interface SupportViewProps {
  onShowToast: (msg: string) => void;
}

export const SupportView: React.FC<SupportViewProps> = ({ onShowToast }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How long do cryptocurrency deposits take to confirm?',
      a: 'Most deposits confirm within 1-3 minutes, depending on blockchain congestion. TRC20 and Solana deposits require only 20 block confirmations.'
    },
    {
      q: 'Why is my fiat withdrawal or crypto transfer under manual review?',
      a: 'Withdrawals exceeding daily tier limits or triggering risk heuristic anomalies are queued for automated security audit to protect cold storage funds.'
    },
    {
      q: 'How does the P2P Escrow protection system safeguard funds?',
      a: 'The seller\'s crypto is cryptographically locked in escrow upon order creation. Escrow is only released after the seller verifies fiat receipt in their bank account.'
    },
    {
      q: 'What are the minimum trade sizes and settlement rules for the OTC Desk?',
      a: 'OKNexus OTC quotes are available for block trades starting at $10,000, with guaranteed zero slippage and sub-15 minute delivery.'
    },
  ];

  return (
    <section className="view active" id="view-support">
      <div className="section-title">
        <span>Institutional Help Center &amp; Support</span>
        <span className="text-dim text-xs">24/7 Dedicated Concierge</span>
      </div>

      <div className="dash-grid">
        {/* FAQs */}
        <div className="card" style={{ padding: '22px' }}>
          <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '12px' }}>
            <span>Frequently Asked Questions</span>
          </div>

          <div>
            {faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
                <div 
                  className="faq-q" 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  <span>{openFaq === idx ? '−' : '＋'}</span>
                </div>
                {openFaq === idx && (
                  <div className="faq-a" style={{ display: 'block' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Ticket */}
        <div className="card" style={{ padding: '22px' }}>
          <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '12px' }}>
            <span>Submit a Priority Ticket</span>
          </div>

          <div className="field-row">
            <div className="field-label"><span>Issue Category</span></div>
            <select style={{ width: '100%' }}>
              <option>Deposit &amp; Ingestion Issue</option>
              <option>Withdrawal &amp; Custody Query</option>
              <option>P2P Escrow Dispute Mediation</option>
              <option>Account Security &amp; 2FA Reset</option>
              <option>OTC Block Trade Inquiries</option>
            </select>
          </div>

          <div className="field-row">
            <div className="field-label"><span>Subject</span></div>
            <input style={{ width: '100%' }} placeholder="Brief summary of your query" />
          </div>

          <div className="field-row">
            <div className="field-label"><span>Detailed Description</span></div>
            <textarea
              style={{
                width: '100%',
                minHeight: '90px',
                fontFamily: 'inherit',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text)',
                padding: '9px 11px',
                fontSize: '13px'
              }}
              placeholder="Provide transaction IDs, error logs, or relevant details..."
            />
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '8px' }}
            onClick={() => onShowToast('✓ Priority Ticket Submitted — #OK-48213 (Avg. reply: 8 min)')}
          >
            Submit Priority Ticket
          </button>

          <div className="section-title" style={{ fontSize: '13.5px', margin: '20px 0 6px' }}>
            <span>Your Active Tickets</span>
          </div>

          <div className="settings-row">
            <div>
              <div className="t">#OK-48102 — Withdrawal Whitelist Sync</div>
              <div className="d">Opened 18 Aug 2026 · Tier 1 Support Agent</div>
            </div>
            <span className="pill pill-buy">Resolved</span>
          </div>
        </div>
      </div>
    </section>
  );
};
