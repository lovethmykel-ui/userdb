'use client';

import React, { useState } from 'react';

interface SettingsViewProps {
  onNavigate: (view: string) => void;
  onShowToast: (msg: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onNavigate, onShowToast }) => {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    theme: true,
    priceAlerts: true,
    orderFills: true,
    p2pMessages: true,
    productNews: false,
    payWithOkn: true,
    orderConfirm: false,
  });

  const toggle = (key: string) => {
    setToggles((prev) => {
      const next = !prev[key];
      onShowToast(`✓ Preference updated`);
      return { ...prev, [key]: next };
    });
  };

  return (
    <section className="view active" id="view-settings">
      <div className="section-title">
        <span>Platform Settings &amp; Preferences</span>
        <span className="text-dim text-xs">Customization &amp; Notifications</span>
      </div>

      <div className="card settings-card">
        <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '2px' }}>
          <span>Display &amp; Localization</span>
        </div>
        <div className="settings-row">
          <div>
            <div className="t">Base Currency</div>
            <div className="d">Prices and portfolio values are computed in this currency</div>
          </div>
          <select style={{ width: '120px' }}>
            <option>USD ($)</option>
            <option>NGN (₦)</option>
            <option>EUR (€)</option>
            <option>IDR (Rp)</option>
          </select>
        </div>
        <div className="settings-row">
          <div>
            <div className="t">Interface Language</div>
            <div className="d">Localized terminal language</div>
          </div>
          <select style={{ width: '120px' }}>
            <option>English</option>
            <option>Français</option>
            <option>Bahasa</option>
          </select>
        </div>
        <div className="settings-row">
          <div>
            <div className="t">Dark Theme Mode</div>
            <div className="d">Institutional Charcoal &amp; Electric Purple styling</div>
          </div>
          <div
            className={`toggle ${toggles.theme ? 'on' : ''}`}
            onClick={() => toggle('theme')}
          />
        </div>
        <div className="settings-row">
          <div>
            <div className="t">Default Landing View</div>
            <div className="d">The screen shown immediately upon platform launch</div>
          </div>
          <select style={{ width: '120px' }}>
            <option>Dashboard</option>
            <option>Trade</option>
            <option>Markets</option>
          </select>
        </div>
      </div>

      <div className="card settings-card">
        <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '2px' }}>
          <span>Notifications &amp; Triggers</span>
        </div>
        <div className="settings-row">
          <div>
            <div className="t">Price Alert Push Notifications</div>
            <div className="d">Trigger alerts when threshold limits are breached</div>
          </div>
          <div
            className={`toggle ${toggles.priceAlerts ? 'on' : ''}`}
            onClick={() => toggle('priceAlerts')}
          />
        </div>
        <div className="settings-row">
          <div>
            <div className="t">Limit &amp; Stop Order Fills</div>
            <div className="d">Notify upon execution or partial fill of open orders</div>
          </div>
          <div
            className={`toggle ${toggles.orderFills ? 'on' : ''}`}
            onClick={() => toggle('orderFills')}
          />
        </div>
        <div className="settings-row">
          <div>
            <div className="t">P2P Trade &amp; Escrow Chat Alerts</div>
            <div className="d">Notify upon buyer fiat payment and escrow releases</div>
          </div>
          <div
            className={`toggle ${toggles.p2pMessages ? 'on' : ''}`}
            onClick={() => toggle('p2pMessages')}
          />
        </div>
      </div>

      <div className="card settings-card">
        <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '2px' }}>
          <span>Trading Execution Rules</span>
        </div>
        <div className="settings-row">
          <div>
            <div className="t">Pay Trading Fees in OKN (20% Discount)</div>
            <div className="d">Automatically burn OKN balance to reduce spot &amp; margin maker/taker fees</div>
          </div>
          <div
            className={`toggle ${toggles.payWithOkn ? 'on' : ''}`}
            onClick={() => toggle('payWithOkn')}
          />
        </div>
        <div className="settings-row">
          <div>
            <div className="t">Order Confirmation Prompts</div>
            <div className="d">Display confirmation dialog prior to routing large market orders</div>
          </div>
          <div
            className={`toggle ${toggles.orderConfirm ? 'on' : ''}`}
            onClick={() => toggle('orderConfirm')}
          />
        </div>
      </div>

      <div className="card settings-card">
        <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '2px' }}>
          <span>Account &amp; Governance Quick Links</span>
        </div>
        <div className="settings-row">
          <div>
            <div className="t">Two-Factor Authentication &amp; Security</div>
            <div className="d">Authenticator app, active sessions, API keys</div>
          </div>
          <button className="pill pill-neutral cursor-pointer" onClick={() => onNavigate('profile')}>
            Manage →
          </button>
        </div>
        <div className="settings-row">
          <div>
            <div className="t">KYC Verification &amp; Tier Limits</div>
            <div className="d">Level 2 verified · $100,000 daily limit</div>
          </div>
          <button className="pill pill-neutral cursor-pointer" onClick={() => onNavigate('verification')}>
            Manage →
          </button>
        </div>
      </div>
    </section>
  );
};
