'use client';

import React, { useState } from 'react';

interface ProfileViewProps {
  onShowToast: (msg: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onShowToast }) => {
  const [twoFa, setTwoFa] = useState<boolean>(true);
  const [whitelist, setWhitelist] = useState<boolean>(true);
  const [loginAlerts, setLoginAlerts] = useState<boolean>(true);

  return (
    <section className="view active" id="view-profile">
      <div className="section-title">
        <span>Account &amp; Institutional Security</span>
        <span className="text-dim text-xs">Biometrics, 2FA &amp; API Keys</span>
      </div>

      <div className="profile-grid">
        {/* Profile Sidebar */}
        <div className="card profile-side">
          <div className="avatar">TA</div>
          <div style={{ fontWeight: 600, fontSize: '16px' }}>Tobi A.</div>
          <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Institutional Tier Member since Mar 2025</div>
          <div className="kyc-badge">✓ Identity Verified — Level 2</div>

          <div className="tier-row">
            <span>VIP Fee Tier</span>
            <span className="mono font-bold text-purple">VIP 0 · 0.25%</span>
          </div>
          <div className="tier-row">
            <span>30d Notional Volume</span>
            <span className="mono font-bold text-white">$8,240.00</span>
          </div>
          <div className="tier-row">
            <span>Next Tier (VIP 1) at</span>
            <span className="mono font-bold text-emerald">$10,000.00</span>
          </div>
        </div>

        {/* Security, API Keys & Active Sessions */}
        <div>
          <div className="card settings-card">
            <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '4px' }}>
              <span>Security Protocols</span>
            </div>

            <div className="settings-row">
              <div>
                <div className="t">Two-Factor Authentication (TOTP)</div>
                <div className="d">Require 6-digit code from Google/YubiKey Authenticator at login and withdrawal</div>
              </div>
              <div
                className={`toggle ${twoFa ? 'on' : ''}`}
                onClick={() => {
                  setTwoFa(!twoFa);
                  onShowToast('✓ 2FA configuration updated');
                }}
              />
            </div>

            <div className="settings-row">
              <div>
                <div className="t">Withdrawal Whitelist Enforcement</div>
                <div className="d">Strictly restrict withdrawals to pre-approved, time-locked hardware addresses</div>
              </div>
              <div
                className={`toggle ${whitelist ? 'on' : ''}`}
                onClick={() => {
                  setWhitelist(!whitelist);
                  onShowToast('✓ Withdrawal whitelist enforcement updated');
                }}
              />
            </div>

            <div className="settings-row">
              <div>
                <div className="t">New Device Login Alerts</div>
                <div className="d">Dispatch instant push notification &amp; email when a new IP signs in</div>
              </div>
              <div
                className={`toggle ${loginAlerts ? 'on' : ''}`}
                onClick={() => {
                  setLoginAlerts(!loginAlerts);
                  onShowToast('✓ Login alerts updated');
                }}
              />
            </div>

            <div className="settings-row">
              <div>
                <div className="t">Anti-Phishing Verification Code</div>
                <div className="d">Custom cryptographic passphrase embedded in every genuine OKNexus communication</div>
              </div>
              <button className="pill pill-neutral cursor-pointer" onClick={() => onShowToast('✓ Anti-phishing code verified: #OK-PRO-992')}>
                Configured
              </button>
            </div>
          </div>

          <div className="card settings-card">
            <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '4px' }}>
              <span>Active API Keys</span>
            </div>

            <div className="settings-row">
              <div>
                <div className="t">trading-bot-01</div>
                <div className="d font-mono">Read + Spot Trading · IP Whitelisted · Created 12 Jun 2026</div>
              </div>
              <span className="pill pill-buy">Active</span>
            </div>

            <div className="settings-row">
              <div>
                <div className="t">portfolio-view</div>
                <div className="d font-mono">Read-Only Analytics · Created 3 Feb 2026</div>
              </div>
              <span className="pill pill-buy">Active</span>
            </div>

            <button className="btn btn-ghost" style={{ width: '100%', marginTop: '10px' }} onClick={() => onShowToast('✓ API key generator modal')}>
              + Generate New API Key
            </button>
          </div>

          <div className="card settings-card">
            <div className="section-title" style={{ fontSize: '14.5px', marginBottom: '4px' }}>
              <span>Active Terminal Sessions</span>
            </div>

            <div className="settings-row">
              <div>
                <div className="t">Google Chrome · Lagos, NG</div>
                <div className="d">This device · Latency 1.2ms · Active now</div>
              </div>
              <span className="pill pill-neutral">Current Session</span>
            </div>

            <div className="settings-row">
              <div>
                <div className="t">OKNexus Pro App · iPhone 15 Pro</div>
                <div className="d">Lagos, NG · 2 hours ago</div>
              </div>
              <button className="pill pill-neutral cursor-pointer" onClick={() => onShowToast('✓ Remote session revoked')}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
