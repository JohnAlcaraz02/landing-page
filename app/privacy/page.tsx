'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Privacy() {
  return (
    <div style={{ minHeight: '100vh', width: '100%', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
      {/* Header with Back Button */}
      <nav style={{ display: 'flex', alignItems: 'center', padding: '20px 30px', borderBottom: '1px solid #e5e5e5' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#5C8A52', fontWeight: '600', fontSize: '14px', transition: 'opacity 200ms ease' }} onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = '0.7'} onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = '1'}>
          <span style={{ fontSize: '18px' }}>←</span>
          Back
        </Link>
      </nav>

      {/* Privacy Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 30px', width: '100%' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111111', marginBottom: '20px', lineHeight: '1.2' }}>
          Privacy Policy
        </h1>
        
        <div style={{ fontSize: '16px', lineHeight: '1.8', color: '#444444' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#356239', marginTop: '40px', marginBottom: '16px' }}>
            Local Use, Cloud Sync, and Optional AI Features
          </h2>
          
          <p style={{ marginBottom: '20px' }}>
            Tarsi is designed to work locally on your device by default. If you use Tarsi without an account or subscription, your budgeting information remains on your device except when you choose to export, back up, or share it yourself.
          </p>

          <p style={{ marginBottom: '20px' }}>
            Tarsi also offers an optional Tarsi Cloud subscription. If you choose to subscribe, we may collect and store the information needed to create and maintain your account, sync your data across your devices, manage your subscription status, and provide cloud access to the features you request.
          </p>

          <p style={{ marginBottom: '20px' }}>
            Tarsi may also offer optional AI features that use the Gemini API to generate responses or assist with app features. When you use those AI features, the content you submit for that request may be sent to the AI service provider only to process your request and return a result.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#356239', marginTop: '40px', marginBottom: '16px' }}>
            Data Protection
          </h2>

          <p style={{ marginBottom: '20px' }}>
            We do not sell your personal information. We do not use advertising trackers for third-party ad targeting, and we do not use your financial data for data brokerage.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#356239', marginTop: '40px', marginBottom: '16px' }}>
            Support Communication
          </h2>

          <p style={{ marginBottom: '20px' }}>
            If you contact support by email, we use the information you send only to respond, troubleshoot, and support your request.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#356239', marginTop: '40px', marginBottom: '16px' }}>
            Policy Updates
          </h2>

          <p style={{ marginBottom: '40px' }}>
            If this privacy policy changes, this page will be updated to reflect the current version. Continued use of Tarsi after an update means you accept the revised policy.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: 'auto', width: '100%', backgroundColor: '#ffffff', padding: '32px 12px', borderTop: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1500px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '60px' }}>
          <div style={{ fontSize: '14px', color: '#888888', fontWeight: '500' }}>
            Copyright 2026 Tarsi. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/privacy" style={{ fontSize: '14px', color: '#888888', textDecoration: 'none', fontWeight: '500', transition: 'color 200ms ease' }} onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#5C8A52'} onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = '#888888'}>Privacy</Link>
            <a href="#" style={{ fontSize: '14px', color: '#888888', textDecoration: 'none', fontWeight: '500', transition: 'color 200ms ease' }} onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#5C8A52'} onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = '#888888'}>Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
