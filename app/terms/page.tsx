'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Terms() {
  return (
    <div style={{ minHeight: '100vh', width: '100%', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
      {/* Header with Back Button */}
      <nav style={{ display: 'flex', alignItems: 'center', padding: '20px 30px', borderBottom: '1px solid #e5e5e5' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#5C8A52', fontWeight: '600', fontSize: '14px', transition: 'opacity 200ms ease' }} onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = '0.7'} onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = '1'}>
          <span style={{ fontSize: '18px' }}>←</span>
          Back
        </Link>
      </nav>

      {/* Terms Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 30px', width: '100%' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111111', marginBottom: '20px', lineHeight: '1.2' }}>
          Terms of Service
        </h1>
        
        <div style={{ fontSize: '16px', lineHeight: '1.8', color: '#444444' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#356239', marginTop: '40px', marginBottom: '16px' }}>
            Simple Terms for Using Tarsi
          </h2>
          
          <p style={{ marginBottom: '20px' }}>
            Tarsi is provided as a personal budgeting tool for individual use. You are responsible for how you use the app and for keeping your device and backups secure.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#356239', marginTop: '40px', marginBottom: '16px' }}>
            Pricing and Subscriptions
          </h2>

          <p style={{ marginBottom: '20px' }}>
            Tarsi may be available as a one-time purchase, and it may also offer an optional Tarsi Cloud subscription for cloud sync across supported devices and access to Gemini API-powered AI features. The subscription is optional and is not required to use the local, on-device features of the app.
          </p>

          <p style={{ marginBottom: '20px' }}>
            If you purchase a Tarsi Cloud subscription through the App Store, billing, renewals, cancellations, refunds, and other platform purchase policies are handled by Apple under Apple's own terms. Unless stated otherwise in the App Store listing, subscriptions automatically renew until canceled through your Apple account settings.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#356239', marginTop: '40px', marginBottom: '16px' }}>
            Features and Service Changes
          </h2>

          <p style={{ marginBottom: '20px' }}>
            Cloud sync and AI features depend on internet connectivity, third-party services, and compatible app versions. We may change, improve, limit, or discontinue optional cloud or AI features if needed for security, legal, technical, or product reasons.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#356239', marginTop: '40px', marginBottom: '16px' }}>
            AI Features Disclaimer
          </h2>

          <p style={{ marginBottom: '20px' }}>
            When you use AI features, outputs are generated automatically and may sometimes be inaccurate, incomplete, or unsuitable for your situation. You remain responsible for reviewing AI-generated content before relying on it.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#356239', marginTop: '40px', marginBottom: '16px' }}>
            Disclaimer of Warranties
          </h2>

          <p style={{ marginBottom: '20px' }}>
            Tarsi is provided on an "as is" basis without guarantees of uninterrupted availability, compatibility with every device configuration, or fitness for any particular financial outcome.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#356239', marginTop: '40px', marginBottom: '16px' }}>
            Updates to Terms
          </h2>

          <p style={{ marginBottom: '40px' }}>
            These terms may be updated from time to time, and this page will reflect the latest version.
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
            <Link href="/terms" style={{ fontSize: '14px', color: '#888888', textDecoration: 'none', fontWeight: '500', transition: 'color 200ms ease' }} onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#5C8A52'} onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = '#888888'}>Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
