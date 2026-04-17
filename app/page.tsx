"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";

const REVIEWS = [
  {
    title: "Finally, a Budget Tracker That's Not Boring",
    date: "25 Mar",
    author: "JMTabaquero",
    text: "Overall, I really like this app because it doesn't feel boring to use. It makes tracking expenses feel easier and more motivating.",
  },
  {
    title: "Simple, Clean, and Very Helpful",
    date: "18 Mar",
    author: "AlyRamos",
    text: "The UI is super easy to understand. I can record expenses quickly and still get a clear view of where my money goes.",
  },
  {
    title: "Perfect for Daily Budgeting",
    date: "12 Mar",
    author: "KenLuna",
    text: "I've tried many budget apps, and this one sticks. It feels lightweight but still gives me the insights I need.",
  },
  {
    title: "Great App, Great Design",
    date: "07 Mar",
    author: "NicaVelasco",
    text: "Beautiful design and smooth experience. The mascot and visuals make the app feel friendly and fun to use.",
  },
];

export default function Home() {
  const [selectedMockup, setSelectedMockup] = useState<string | null>(null);
  const marqueeViewportRef = useRef<HTMLDivElement | null>(null);
  const marqueeDragRef = useRef({ isDragging: false, startX: 0, startScrollLeft: 0 });

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".feature-reveal-card");
    if (!cards.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let frameId = 0;

    const tick = () => {
      const viewport = marqueeViewportRef.current;
      if (viewport && !marqueeDragRef.current.isDragging) {
        const loopWidth = viewport.scrollWidth / 2;
        viewport.scrollLeft += 0.45;

        if (viewport.scrollLeft >= loopWidth) {
          viewport.scrollLeft -= loopWidth;
        }
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const handleMarqueePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = marqueeViewportRef.current;
    if (!viewport) {
      return;
    }

    marqueeDragRef.current = {
      isDragging: true,
      startX: event.clientX,
      startScrollLeft: viewport.scrollLeft,
    };

    viewport.setPointerCapture(event.pointerId);
    viewport.style.cursor = "grabbing";
  };

  const handleMarqueePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = marqueeViewportRef.current;
    const drag = marqueeDragRef.current;
    if (!viewport || !drag.isDragging) {
      return;
    }

    const delta = event.clientX - drag.startX;
    viewport.scrollLeft = drag.startScrollLeft - delta;
  };

  const handleMarqueePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = marqueeViewportRef.current;
    if (!viewport) {
      return;
    }

    marqueeDragRef.current.isDragging = false;
    viewport.releasePointerCapture(event.pointerId);
    viewport.style.cursor = "grab";
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>

      <style>{`
        @keyframes floatIcon1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes floatIcon2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-8deg); }
        }
        @keyframes floatIcon3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes floatIcon4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-22px) rotate(-5deg); }
        }
        .float-icon-1 { animation: floatIcon1 6s ease-in-out infinite; }
        .float-icon-2 { animation: floatIcon2 7s ease-in-out infinite; }
        .float-icon-3 { animation: floatIcon3 5.5s ease-in-out infinite; }
        .float-icon-4 { animation: floatIcon4 6.5s ease-in-out infinite; }
        
        @media (max-width: 768px) {
          .hero-wrap {
            padding: 24px 12px 24px 12px !important;
            margin: 12px !important;
            minHeight: auto !important;
            borderRadius: 16px !important;
            flexDirection: column !important;
            gap: 20px !important;
          }
          /* Hide the phone mockup section */
          .hero-wrap > div:last-of-type {
            display: none !important;
          }
          /* Keep floating icons visible */
          .float-icon-1, .float-icon-2, .float-icon-3, .float-icon-4 {
            width: 35px !important;
            height: 35px !important;
            opacity: 0.6 !important;
            display: block !important;
          }
          .float-icon-1 img, .float-icon-2 img, .float-icon-3 img, .float-icon-4 img {
            width: 35px !important;
            height: 35px !important;
          }
          .hero-wrap > div:nth-child(2),
          .hero-wrap > div:nth-child(3) {
            display: block !important;
            width: 200px !important;
            height: 200px !important;
            opacity: 0.4 !important;
          }
        }
      `}</style>

      {/* ── Hero Section ── */}
      <div className="hero-wrap" style={{ 
        backgroundColor: '#eef2e8', 
        borderRadius: '20px', 
        padding: 'clamp(12px, 5vw, 48px)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: 'clamp(12px, 5vw, 32px)',
        overflow: 'hidden',
        position: 'relative',
        minHeight: '520px',
        margin: 'clamp(8px, 3vw, 26px)'
      }}>
        
        {/* Animated background blobs */}
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100, 139, 92, 0.08) 0%, transparent 70%)',
          bottom: '-100px',
          right: '10%',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184, 219, 160, 0.06) 0%, transparent 70%)',
          top: '-50px',
          left: '-100px',
          zIndex: 0
        }} />

        {/* Floating Icons */}
        <div className="float-icon-1" style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          zIndex: 1
        }}>
          <Image src="/assets/icons.png" alt="Floating Icon" width={60} height={60} quality={100} style={{ opacity: 0.8 }} />
        </div>
        <div className="float-icon-2" style={{
          position: 'absolute',
          top: '25%',
          right: '12%',
          zIndex: 1
        }}>
          <Image src="/assets/icons.png" alt="Floating Icon" width={50} height={50} quality={100} style={{ opacity: 0.7 }} />
        </div>
        <div className="float-icon-3" style={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          zIndex: 1
        }}>
          <Image src="/assets/icons.png" alt="Floating Icon" width={55} height={55} quality={100} style={{ opacity: 0.75 }} />
        </div>
        <div className="float-icon-4" style={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          zIndex: 1
        }}>
          <Image src="/assets/icons.png" alt="Floating Icon" width={45} height={45} quality={100} style={{ opacity: 0.8 }} />
        </div>

        {/* Logo - Top Left */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Image src="/assets/logo.png" alt="Tarsi Logo" width={120} height={40} quality={100} style={{ height: '32px', width: 'auto' }} />
          <span style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#648B5C ',
            letterSpacing: '0.02em'
          }}>Tarsi</span>
        </div>

        {/* Nav button */}
        <button style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: '#648B5C',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: 'clamp(10px, 2.5vw, 12px)',
          fontWeight: '600',
          cursor: 'pointer',
          letterSpacing: '0.04em',
          zIndex: 3,
          boxShadow: '0 4px 12px rgba(100, 139, 92, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 24px rgba(100, 139, 92, 0.4)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(100, 139, 92, 0.3)';
        }}>
          JOIN COMMUNITY
        </button>

        {/* Left content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%'
        }}>
          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 45px)',
            fontWeight: '700',
            lineHeight: '1.1',
            color: '#1a2e12',
            margin: '0 0 16px'
          }}>
            Track all your money in one place, <br/>effortlessly
          </h1>

          <p style={{
            fontSize: 'clamp(14px, 3.5vw, 16px)',
            color: '#4a5c3a',
            margin: '0 0 24px',
            lineHeight: '1.6'
          }}>
            Your personal budget tracker that helps you manage your money in one place.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://play.google.com/store/apps/details?id=com.tarsi.app" target="_blank" rel="noreferrer" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 22px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              border: 'none',
              background: '#648B5C',
              color: '#fff',
              textDecoration: 'none',
              transition: 'transform 0.15s, box-shadow 0.15s'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 18px rgba(60, 100, 30, 0.18)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}>
              <Image src="/assets/play_store.png" alt="Play Store" width={20} height={20} style={{ height: '20px', width: 'auto' }} />
              Play Store
            </a>
            <a href="https://apps.apple.com/us/app/tarsi-budget-tracker/id6760278399" target="_blank" rel="noreferrer" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 22px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              border: 'none',
              background: '#ffffff',
              color: '#648B5C',
              textDecoration: 'none',
              transition: 'transform 0.15s, box-shadow 0.15s'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 18px rgba(60, 100, 30, 0.18)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}>
              <Image src="/assets/app_store1.png" alt="App Store" width={20} height={20} style={{ height: '20px', width: 'auto' }} />
              App Store
            </a>
          </div>
        </div>

        {/* Right — phone with circle glow */}
        <div style={{
          flex: '0 0 auto',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
        }}>
          <div style={{
            position: 'relative',
            width: '600px',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Big soft glow circle behind the phone */}
            <div className="glow-circle" style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #b8dba0 0%, #c8e8b0 40%, transparent 75%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 0
            }} />

            {/* Thin orbit rings */}
            <div className="orbit-1" style={{
              position: 'absolute',
              borderRadius: '50%',
              border: '1.5px solid rgba(61, 110, 42, 0.18)',
              width: '370px',
              height: '370px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 0
            }} />

            <div className="orbit-2" style={{
              position: 'absolute',
              borderRadius: '50%',
              border: '1.5px dashed rgba(61, 110, 42, 0.1)',
              width: '430px',
              height: '430px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 0
            }} />

            {/* Arrow accent */}
            <svg className="arrow-accent" viewBox="0 0 80 80" fill="none" style={{
              position: 'absolute',
              top: '20px',
              left: '-10px',
              width: '80px',
              height: '80px',
              zIndex: 3,
              opacity: 0.7
            }}>
              <path d="M10 70 Q10 10 70 10" stroke="#3d6e2a" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
              <path d="M60 6 L70 10 L64 18" stroke="#3d6e2a" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            {/* Phone image */}
          <div style={{
            position: 'absolute',
            bottom: '-10%',
            left: '73%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            width: '520px',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
          }}>
            <Image
              src="/assets/new_mockup.png"
              alt="App mockup"
              width={420}
              height={860}
              quality={100}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain'
              }}
            />
          </div>
          </div>
        </div>
      </div>

      {/* ── App Screens Marquee Section ── */}
      <section style={{ width: '100%', backgroundColor: '#f9f8f6', padding: '80px 20px', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <style>{`
          @keyframes marquee-vertical {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          @keyframes marquee-vertical-reverse {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0); }
          }

          .mockup-container {
            perspective: 1200px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100%;
            position: relative;
            width: 100%;
          }

          .mockups-wall {
            position: relative;
            width: 100%;
            height: 800px;
            overflow: hidden;
            background: linear-gradient(135deg, #f9f8f6 0%, #f3f4f6 100%);
            border-radius: 20px;
          }

          .mockups-wall::before {
            content: '';
            position: absolute;
            inset: 0;
            z-index: 10;
            pointer-events: none;
            background: linear-gradient(to bottom, #f9f8f6 0%, transparent 15%, transparent 85%, #f9f8f6 100%);
          }

          .mockups-columns {
            display: flex;
            justify-content: center;
            gap: 32px;
            height: 100%;
            align-items: center;
            transform: rotate(-12deg) scale(1.1) translateY(-10%);
          }

          .mockup-column {
            display: flex;
            flex-direction: column;
            gap: 24px;
            height: 100%;
          }

          .mockup-column-content {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          .mockup-column:nth-child(1) .mockup-column-content {
            animation: marquee-vertical 150s linear infinite;
          }

          .mockup-column:nth-child(2) .mockup-column-content {
            animation: marquee-vertical-reverse 175s linear infinite;
          }

          .mockup-column:nth-child(3) .mockup-column-content {
            animation: marquee-vertical 150s linear infinite;
          }

          .mockup-column:nth-child(4) .mockup-column-content {
            animation: marquee-vertical-reverse 170s linear infinite;
          }

          .mockup-card {
            position: relative;
            width: 280px;
            aspect-ratio: 9 / 19;
            border-radius: 32px;
            overflow: hidden;
            background: white;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
            border: none;
            flex-shrink: 0;
            cursor: pointer;
          }

          .mockup-card:hover {
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
          }

          .mockup-image {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
          }

          .mockup-like-button {
            position: absolute;
            bottom: 12px;
            right: 12px;
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            transition: all 300ms ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }

          .mockup-card:hover .mockup-like-button {
            opacity: 1;
            transform: scale(1.1);
          }

          .mockup-like-button:hover {
            background: rgba(255, 255, 255, 1);
            transform: scale(1.2);
          }

          .mockup-modal {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.85);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 300ms ease;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .mockup-modal-content {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
            animation: slideUp 300ms ease;
          }

          @keyframes slideUp {
            from {
              transform: translateY(30px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .mockup-modal-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
          }

          .mockup-modal-close {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-size: 32px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 200ms ease;
            z-index: 10000;
          }

          .mockup-modal-close:hover {
            background: rgba(255, 255, 255, 0.4);
            transform: scale(1.1);
          }



          @media (max-width: 1024px) {
            .mockups-columns {
              gap: 24px;
            }
            .mockup-card {
              width: 240px;
            }
          }

          @media (max-width: 768px) {
            .mockups-wall {
              height: 600px;
            }
            .mockups-columns {
              gap: 16px;
              transform: rotate(-8deg) scale(1.05) translateY(-5%);
            }
            .mockup-card {
              width: 200px;
            }
            .mockup-cta-card {
              padding: 30px;
              max-width: 300px;
            }
            .mockup-cta-card h2 {
              font-size: 24px;
            }
          }

          @media (max-width: 480px) {
            .mockups-wall {
              height: 500px;
              border-radius: 12px;
            }
            .mockups-columns {
              gap: 12px;
              transform: rotate(-6deg) scale(1) translateY(0);
            }
            .mockup-card {
              width: 160px;
              border-width: 4px;
              border-radius: 20px;
            }
            .mockup-cta-card {
              padding: 20px;
              max-width: 260px;
              border-radius: 32px;
            }
            .mockup-cta-card h2 {
              font-size: 20px;
            }
          }
        `}</style>

        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '900',
              color: '#1f2937',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
            }}>
              Experience the Magic
            </h2>
            <p style={{
              fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}>
              Beautifully crafted screens that bring your vision to life
            </p>
          </div>

          <div className="mockup-container">
            <div className="mockups-wall">
              <div className="mockups-columns">
                {[0, 1, 2, 3].map((columnIndex) => {
                  // Different mockup sequences for each column
                  const mockupSequences = [
                    // Column 1
                    [
                      '/grid/SC 44.png',
                      '/grid/SC 45.png',
                      '/grid/SC 46.jpg',
                      '/grid/SC 47.jpg',
                      '/grid/SC 48.jpg',
                      '/grid/SC 52.jpg',
                      '/grid/SC 56.jpg',
                      '/grid/SC 57.jpg',
                      '/grid/SC 59.jpg',
                      '/grid/SC 63.jpg',
                    ],
                    // Column 2 (offset by 3)
                    [
                      '/grid/SC 46.jpg',
                      '/grid/SC 47.jpg',
                      '/grid/SC 48.jpg',
                      '/grid/SC 52.jpg',
                      '/grid/SC 56.jpg',
                      '/grid/SC 57.jpg',
                      '/grid/SC 59.jpg',
                      '/grid/SC 63.jpg',
                      '/grid/SC 44.png',
                      '/grid/SC 45.png',
                    ],
                    // Column 3 (offset by 6)
                    [
                      '/grid/SC 56.jpg',
                      '/grid/SC 57.jpg',
                      '/grid/SC 59.jpg',
                      '/grid/SC 63.jpg',
                      '/grid/SC 44.png',
                      '/grid/SC 45.png',
                      '/grid/SC 46.jpg',
                      '/grid/SC 47.jpg',
                      '/grid/SC 48.jpg',
                      '/grid/SC 52.jpg',
                    ],
                    // Column 4 (offset by 9)
                    [
                      '/grid/SC 63.jpg',
                      '/grid/SC 44.png',
                      '/grid/SC 45.png',
                      '/grid/SC 46.jpg',
                      '/grid/SC 47.jpg',
                      '/grid/SC 48.jpg',
                      '/grid/SC 52.jpg',
                      '/grid/SC 56.jpg',
                      '/grid/SC 57.jpg',
                      '/grid/SC 59.jpg',
                    ],
                  ];

                  const columnMockups = mockupSequences[columnIndex];
                  const expandedMockups = columnMockups
                    .concat(columnMockups)
                    .concat(columnMockups)
                    .map((src, index) => ({ src, alt: `Screen ${(index % columnMockups.length) + 1}` }));

                  return (
                    <div key={columnIndex} className="mockup-column">
                      <div className="mockup-column-content">
                        {expandedMockups.map((screen, index) => (
                          <div key={index} className="mockup-card" onClick={() => setSelectedMockup(screen.src)}>
                            <Image
                              src={screen.src}
                              alt={screen.alt}
                              width={280}
                              height={530}
                              quality={90}
                              className="mockup-image"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mockup Modal ── */}
      {selectedMockup && (
        <div className="mockup-modal" onClick={() => setSelectedMockup(null)}>
          <div className="mockup-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="mockup-modal-close" onClick={() => setSelectedMockup(null)}>✕</button>
            <Image
              src={selectedMockup}
              alt="Full size mockup"
              width={800}
              height={1500}
              quality={95}
              className="mockup-modal-image"
            />
          </div>
        </div>
      )}

      {/* ── Feature Section ── */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .download-buttons {
          flex-wrap: nowrap !important;
        }

        .download-btn {
          transition: transform 200ms ease, filter 200ms ease;
          display: inline-block;
        }

        .download-btn:hover {
          transform: scale(1.05) translateY(-2px);
          filter: brightness(0.95);
        }
        @media (max-width: 480px) {
          .download-buttons {
            gap: 8px;
            flex-wrap: nowrap;
          }
          .download-buttons img {
            height: 32px !important;
          }
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          overflow: visible;
        }
        @media (max-width: 480px) {
          .feature-grid {
            grid-template-columns: 1fr;
          }
          .feat-card-1 {
            min-height: 260px;
            height: auto;
            padding: 12px 12px 10px 12px;
          }
          .char-img-card1 {
            left: 6px;
            bottom: -6px;
            width: 102px;
          }
          .feat-card-1-content {
            margin-left: auto;
            margin-right: 6px;
            width: min(62%, 210px);
            justify-content: flex-start;
            align-items: center;
            text-align: center;
            padding-top: 2px;
          }
          .feat-card-1 .feat-card-1-title {
            font-size: 1.65rem;
            line-height: 0.95;
          }
          .feat-card-1 .feat-card-1-subtitle {
            font-size: 0.58rem;
            line-height: 1.15;
            margin-top: 3px;
            font-weight: 400;
          }
          .feat-card-1 .feat-card-1-rating {
            width: 100%;
            max-width: 180px;
            margin-top: 10px;
          }
        }

        .feat-card {
          position: relative;
          min-height: 160px;
          border-radius: 18px;
          background-color: #f7f4ec;
          padding: 18px 18px 14px 18px;
          overflow: visible;
          transition: transform 180ms ease, box-shadow 180ms ease;
          will-change: transform;
        }

        .feature-reveal-card {
          opacity: 0;
          transition: transform 700ms cubic-bezier(0.2, 0.65, 0.2, 1), opacity 700ms ease, box-shadow 180ms ease;
        }

        .feature-reveal-left {
          transform: translateX(-46px);
        }

        .feature-reveal-right {
          transform: translateX(46px);
        }

        .feature-reveal-card.in-view {
          opacity: 1;
          transform: translateX(0);
        }

        @media (hover: hover) and (pointer: fine) {
          .feat-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.12);
          }
        }

        .marquee-viewport {
          overflow-x: auto;
          overflow-y: hidden;
          cursor: grab;
          touch-action: pan-x;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .marquee-viewport::-webkit-scrollbar {
          display: none;
        }

        .marquee-track {
          display: flex;
          width: max-content;
          padding-bottom: 4px;
        }

        .animate-marquee {
          animation: none;
        }

        .review-card {
          width: min(380px, 85vw);
          flex-shrink: 0;
          background: #ffffff;
          border-radius: 28px;
          padding: 24px;
          margin: 0 12px;
          box-shadow: 0 16px 28px rgba(0, 0, 0, 0.1), 0 6px 12px rgba(0, 0, 0, 0.06);
          border: 1px solid #f0f0f0;
        }

        .review-stars {
          display: flex;
          gap: 4px;
          color: #111111;
          font-size: 12px;
          margin-bottom: 12px;
          align-items: center;
        }

        .review-meta {
          color: #999999;
        }

        .final-cta-shell {
          padding: 24px 12px 64px;
          background: linear-gradient(180deg, #ffffff88 0%, #5c8a52bf 45%, #4c7446 100%);
        }

        .final-cta-card {
          max-width: 1200px;
          margin: 0 auto;
          background-color: #f2f1eb;
          border-radius: 18px;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          overflow: hidden;
          box-shadow: 0 -12px 26px rgba(0,0,0,0.14), 0 8px 14px rgba(0,0,0,0.08);
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .final-cta-mascot-wrap {
          flex-shrink: 0;
          width: clamp(130px, 26vw, 320px);
          align-self: flex-end;
          line-height: 0;
          transition: transform 240ms cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .final-cta-mascot-wrap img {
          width: 100% !important;
          height: auto !important;
          display: block !important;
        }

        @media (hover: hover) and (pointer: fine) {
          .final-cta-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 -16px 30px rgba(0,0,0,0.16), 0 18px 28px rgba(0,0,0,0.14);
          }

          .final-cta-card:hover .final-cta-mascot-wrap {
            transform: translateY(-10px) rotate(-1.2deg);
          }
        }

        .final-cta-copy {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 32px 24px;
        }

        .final-cta-eyebrow {
          font-size: clamp(0.72rem, 1.3vw, 0.95rem);
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #1f2937;
          margin: 0 0 10px 0;
        }

        .final-cta-title {
          margin: 0 0 20px 0;
          font-size: clamp(1.9rem, 4.8vw, 4rem);
          line-height: 1.02;
          font-weight: 900;
          color: #111111;
          text-transform: uppercase;
        }

        .final-cta-badges {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 12px;
          flex-wrap: nowrap;
        }

        .final-cta-badges a img {
          height: 44px !important;
          width: auto !important;
          display: block !important;
        }

        .final-cta-badges a {
          transition: transform 200ms ease, filter 200ms ease;
          display: inline-block;
        }

        .final-cta-badges a:hover {
          transform: scale(1.05) translateY(-2px);
          filter: brightness(0.95);
        }

        @media (max-width: 520px) {
          .final-cta-mascot-wrap {
            width: 40%;
          }

          .final-cta-copy {
            padding: 20px 12px 20px 0;
          }

          .final-cta-eyebrow {
            font-size: 0.58rem;
          }

          .final-cta-title {
            font-size: 1.3rem;
            line-height: 1.05;
            margin: 0 0 14px 0;
          }

          .final-cta-badges a img {
            height: 32px !important;
          }
        }

        .feat-title {
          font-size: clamp(1.2rem, 3.5vw, 2.2rem);
          line-height: 1.0;
          font-weight: 900;
          color: #356239;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }
        .feat-title-mixed {
          font-size: clamp(1.2rem, 3.5vw, 2.4rem);
          line-height: 1.0;
          font-weight: 900;
          color: #356239;
          letter-spacing: -0.02em;
        }
        .feat-subtitle {
          margin-top: 6px;
          font-size: clamp(0.75rem, 1.6vw, 0.9rem);
          line-height: 1.3;
          color: #323232;
        }

        .feat-card-4 .feat-title-mixed {
          font-size: clamp(1.5rem, 4.8vw, 3rem);
          line-height: 0.95;
        }
        .feat-card-4 .feat-subtitle {
          margin-top: 8px;
          font-size: clamp(0.95rem, 2.2vw, 1.35rem);
          line-height: 1.2;
        }
        .feat-card-4-content {
          position: relative;
          z-index: 2;
          max-width: 60%;
          padding-top: 8px;
        }

        .feat-card-1 {
          padding: 12px 14px 10px 12px;
          overflow: hidden;
        }
        .char-img-card1 {
          position: absolute;
          left: 6px;
          bottom: -4px;
          width: clamp(118px, 18vw, 200px);
          z-index: 10;
        }
        .feat-card-1-content {
          position: relative;
          z-index: 2;
          margin-left: auto;
          margin-right: clamp(10px, 2.4vw, 28px);
          width: min(58%, 560px);
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding-top: 0;
        }
        .feat-card-1-title {
          font-size: clamp(3rem, 5vw, 5rem);
          line-height: 0.92;
          font-weight: 800;
          color: #356239;
          text-transform: uppercase;
          letter-spacing: -0.035em;
        }
        .feat-card-1-subtitle {
          margin-top: 4px;
          font-size: clamp(2rem, 2vw, 4rem);
          line-height: 1.15;
          color: #333333;
        }
        .feat-card-1-rating {
          margin-top: 8px;
          width: min(100%, 520px);
          margin-left: 0;
        }

        .feat-card-2-content {
          position: relative;
          z-index: 2;
          max-width: 55%;
        }
        .feat-card-2-title {
          font-size: clamp(1.2rem, 3.5vw, 2.2rem);
          line-height: 1;
          font-weight: 900;
          color: #356239;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }
        .feat-card-2-subtitle {
          margin-top: 6px;
          font-size: clamp(0.75rem, 1.6vw, 0.9rem);
          line-height: 1.3;
          color: #323232;
        }

        /* ── Mobile default (< 480px) ── */
        .char-img-bl {
          position: absolute;
          left: 10px;
          bottom: 0px;
          width: 110px;
          z-index: 10;
        }
        .char-img-br-ai {
          position: absolute;
          right: -24px;
          bottom: -55px;
          width: 300px;
          z-index: 10;
        }
        .char-img-br-viz {
          position: absolute;
          right: -48px;   
          bottom: 10px;
          width: 140px;
          z-index: 10;
        }
        .char-img-br-jump {
          position: absolute;
          right: 10px;
          bottom: 0px;
          width: 120px;
          z-index: 10;
        }

        /* ── Tablet (480px – 768px) ── */
        @media (min-width: 480px) and (max-width: 768px) {
          .feat-card      { min-height: 180px; }
          .char-img-bl    { width: 130px; left: -6px;  bottom: -8px;  }
          .char-img-br-ai   { width: 160px; right: -10px; bottom: -20px; }
          .char-img-br-viz  { width: 130px; right: -10px; bottom: -10px; }
          .char-img-br-jump { width: 140px; right: 10px;  bottom: 0px;   }
        }

        /* ── Desktop (> 768px) ── */
        @media (min-width: 769px) {
          .feature-grid {
            grid-template-columns: repeat(5, minmax(0, 1fr));
          }
          .feat-card-1 { grid-column: span 3; }
          .feat-card-2 { grid-column: span 2; }
          .feat-card-3 { grid-column: span 2; }
          .feat-card-4 { grid-column: span 3; }
          .feat-card-2,
          .feat-card-3 {
            z-index: 2;
          }
          .feat-card-4 {
            z-index: 0;
          }
            .feat-card      { height: 470px; min-height: 470px; }
          .feat-card-2-content { max-width: 58%; padding-top: 10px; margin-left: auto; margin-right: auto; display: flex; flex-direction: column; align-items: center; text-align: center; }
          .feat-card-2-title { font-size: clamp(2.1rem, 2.8vw, 3.4rem); line-height: 0.95; letter-spacing: -0.03em; }
          .feat-card-2-subtitle { margin-top: 10px; font-size: clamp(1.05rem, 1.15vw, 1.55rem); line-height: 1.2; }
          .feat-card-3 .feat-title { font-size: clamp(2.2rem, 3.5vw, 3.2rem); }
          .feat-card-4-content { max-width: 100%; padding-right: 170px; }
          .feat-card-4 .feat-title-mixed { font-size: clamp(2.4rem, 3.3vw, 4rem); line-height: 0.95; }
          .feat-card-4 .feat-subtitle { font-size: clamp(1.2rem, 1.45vw, 1.9rem); line-height: 1.2; margin-top: 10px; margin-left: 18px; }
          .daily-balance-chart { width: clamp(180px, 30vw, 260px) !important; padding: 16px 18px !important; }
          .daily-balance-chart div:first-child { font-size: 0.8rem !important; }
          .daily-balance-chart > div:last-child { height: 80px !important; gap: 7px !important; }
          .daily-balance-chart > div:last-child > div > div:first-child { width: 8px !important; }
          .daily-balance-chart > div:last-child > div > span { font-size: 0.65rem !important; }
          .char-img-bl    { width: 140px; left: 13px;  bottom: 0px; }
            .char-img-card1 { width: clamp(150px, 18vw, 240px); left: 8px; bottom: -8px; }
          .char-img-br-ai   { width: 210px; right: 100px; bottom: -99px; }
          .char-img-br-viz  { width: 240px; right: -137.5px; bottom: 10px; }
          .char-img-br-jump { width: 175px; right: 12px;  bottom: 0px;   }
        }

        /* ── Large desktop (> 1200px) ── */
        @media (min-width: 1200px) {
            .feat-card      { height: 470px; min-height: 470px; }
          .feat-card-2,
          .feat-card-3 {
            z-index: 2;
          }
          .feat-card-4 {
            z-index: 0;
          }
          .char-img-bl    { width: 100px; }
            .char-img-card1 { width: clamp(300px, 17vw, 280px); }
          .feat-card-1 { padding: 14px 18px 12px 16px; }
          .feat-card-1-content { margin-left: auto; margin-right: 20px; width: min(58%, 600px); }
          .feat-card-1-rating { width: min(100%, 540px); margin-left: 0; }
          .feat-card-2-content { max-width: 62%; padding-left: 0; margin-left: auto; margin-right: auto; display: flex; flex-direction: column; align-items: center; text-align: center; }
          .feat-card-2-title { font-size: clamp(4rem, 2.9vw, 9rem); }
          .feat-card-2-subtitle { font-size: clamp(1.5rem, 1.25vw, 3rem); }
          .feat-card-3 .feat-title { font-size: clamp(3rem, 4vw, 4rem); }
          .feat-card-4-content { max-width: 100%; padding-right: 280px; }
          .feat-card-4 .feat-title-mixed { font-size: clamp(5.5rem, 3.8vw, 4.8rem); line-height: 1.0 }
          .feat-card-4 .feat-subtitle { font-size: clamp(3rem, 1.6vw, 2.2rem); line-height: 1.5; margin-left: 28px; }
          .daily-balance-chart { width: clamp(240px, 35vw, 320px) !important; padding: 20px 24px !important; }
          .daily-balance-chart div:first-child { font-size: 0.9rem !important; }
          .daily-balance-chart > div:last-child { height: 100px !important; gap: 8px !important; }
          .daily-balance-chart > div:last-child > div > div:first-child { width: 10px !important; }
          .daily-balance-chart > div:last-child > div > span { font-size: 0.7rem !important; }
          .char-img-br-ai   { width: 550px; }
          .char-img-br-viz  { width: 400px; }
          .char-img-br-jump { width: 300px; }
        }
      `}</style>

      <section style={{ width: '100%', backgroundColor: '#5C8A52', padding: '60px 12px 40px', overflow: 'visible' }}>
        <div style={{ width: '100%', maxWidth: '1500px', margin: '0 auto', overflow: 'visible', paddingBottom: '20px' }}>
          <div className="feature-grid" style={{ overflow: 'visible' }}>

            {/* Card 1 — No.1 Finance App */}
            <div className="feat-card feat-card-1 feature-reveal-card feature-reveal-left" style={{ marginTop: '40px' }}>
              <div className="char-img-card1">
                <Image src="/assets/No.1_app.png" alt="Tarsi holding the flag" width={260} height={380} quality={100} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
              <div className="feat-card-1-content">
                <div className="feat-card-1-title">THE NO.1<br />FINANCE APP</div>
                <div className="feat-card-1-subtitle">Personal Finance Companion</div>
                <div className="feat-card-1-rating">
                  <Image src="/assets/rating_and_reviews.png" alt="Ratings and Reviews" width={460} height={203} quality={100} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </div>
            </div>

            {/* Card 2 — Offline AI Assistant */}
            <div className="feat-card feat-card-2 feature-reveal-card feature-reveal-right" style={{ marginTop: '40px' }}>
              <div className="feat-card-2-content">
                <div className="feat-card-2-title">OFFLINE AI<br />ASSISTANT</div>
                <div className="feat-card-2-subtitle">Intelligent, on-device chat,<br />Emphasize privacy.</div>
              </div>
              <div className="char-img-br-ai">
                <Image src="/assets/Tarsi_for_AI_Offline.png" alt="Sleeping Tarsi" width={720} height={450} quality={100} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>

            {/* Card 3 — Visualize Your Progress */}
            <div className="feat-card feat-card-3 feature-reveal-card feature-reveal-left" style={{ marginTop: '40px' }}>
              <div style={{ position: 'relative', zIndex: 2, maxWidth: '55%' }}>
                <div className="feat-title">VISUALIZE YOUR PROGRESS</div>
                <div className="daily-balance-chart" style={{ marginTop: '12px', width: 'clamp(140px, 25vw, 200px)', borderRadius: '14px', backgroundColor: '#ffffff', boxShadow: '0 6px 18px rgba(0,0,0,0.07)', padding: '12px 14px' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#b9c0c2', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Daily Balance</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', marginTop: '10px', height: '60px' }}>
                    {[18, 28, 36, 26, 38, 22, 32].map((h, i) => (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                        <div style={{ width: '7px', height: `${h * 0.9}px`, borderRadius: '9999px', backgroundColor: i === 6 ? '#5C8A52' : '#c9dfc9' }} />
                        <span style={{ fontSize: '0.55rem', letterSpacing: '0.1em', color: '#b0b8b4' }}>{['T','W','T','F','S','S','M'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="char-img-br-viz">
                <Image src="/assets/Visualize_Tarsi.png" alt="Tarsi peeking" width={320} height={360} quality={100} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>

            {/* Card 4 — Jumpstart Your Journey */}
            <div className="feat-card feat-card-4 feature-reveal-card feature-reveal-right"  style={{ marginTop: '40px' }}>
              <div className="feat-card-4-content">
                <div className="feat-title-mixed">Jumpstart Your Journey</div>
                <div className="feat-subtitle">Take the first leap to <br />financial freedom</div>
              </div>
              <div className="char-img-br-jump">
                <Image src="/assets/Happy_jump 2.png" alt="Happy jumping Tarsi" width={340} height={360} quality={100} style={{ width: '100%', height: 'auto', display: 'block', animation: 'float 3s ease-in-out infinite' }} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Review Marquee Section ── */}
      <section style={{ padding: '56px 0', backgroundColor: '#f9fafb', overflow: 'hidden' }}>
        <div style={{ position: 'relative' }}>
          <div
            ref={marqueeViewportRef}
            className="marquee-viewport"
            onPointerDown={handleMarqueePointerDown}
            onPointerMove={handleMarqueePointerMove}
            onPointerUp={handleMarqueePointerUp}
            onPointerCancel={handleMarqueePointerUp}
          >
            <div className="marquee-track animate-marquee">
              {[...REVIEWS, ...REVIEWS].map((review, index) => (
                <article key={`${review.author}-${index}`} className="review-card">
                  <h4 style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: '8px', color: '#1f2937' }}>{review.title}</h4>
                  <div className="review-stars">
                    <span>★★★★★</span>
                    <span className="review-meta">{review.date} - {review.author}</span>
                  </div>
                  <p style={{ color: '#666666', fontSize: '0.92rem', lineHeight: '1.6' }}>{review.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '120px',
              height: '100%',
              background: 'linear-gradient(to right, #f9fafb, transparent)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '120px',
              height: '100%',
              background: 'linear-gradient(to left, #f9fafb, transparent)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
        </div>
      </section>

      {/* ── Final CTA Section ── */}
      <section className="final-cta-shell">
        <div className="final-cta-card">

          <div className="final-cta-mascot-wrap">
            <Image
              src="/assets/Frame 190.png"
              alt="Tarsi holding a phone"
              width={570}
              height={593}
              quality={100}
            />
          </div>

          <div className="final-cta-copy">
            <p className="final-cta-eyebrow">FINAL CALL-TO-ACTION</p>
            <h2 className="final-cta-title">TAKE CONTROL OF YOUR FINANCES TODAY</h2>
            <div className="final-cta-badges">
              <a className="download-btn" href="https://apps.apple.com/us/app/tarsi-budget-tracker/id6760278399" target="_blank" rel="noreferrer">
                <Image src="/assets/app_store_logo.png" alt="Download on App Store" width={160} height={50} />
              </a>
              <a className="download-btn" href="https://play.google.com/store/apps/details?id=com.tarsi.app" target="_blank" rel="noreferrer">
                <Image src="/assets/android_logo.png" alt="Get it on Google Play" width={160} height={50} />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ width: '100%', backgroundColor: '#ffffff', padding: '32px 12px', borderTop: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1500px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '60px' }}>
          <div style={{ fontSize: '14px', color: '#888888', fontWeight: '500' }}>
            Copyright 2026 Tarsi. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/privacy" style={{ fontSize: '14px', color: '#888888', textDecoration: 'none', fontWeight: '500', transition: 'color 200ms ease' }} onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#5C8A52'} onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = '#888888'}>Privacy Policy</Link>
            <Link href="/terms" style={{ fontSize: '14px', color: '#888888', textDecoration: 'none', fontWeight: '500', transition: 'color 200ms ease' }} onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#5C8A52'} onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = '#888888'}>Terms</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}