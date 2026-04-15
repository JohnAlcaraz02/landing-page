"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";

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

      {/* ── Hero Section ── */}
      <div style={{ margin: '12px', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundColor: '#648b5c2e',
          backgroundImage: `
            radial-gradient(ellipse 100% 75% at 50% 0%, #9EB29A 70%, transparent 100%),
            radial-gradient(ellipse 100% 50% at 50% 100%, #9EB29A 30%, transparent 70%)
          `,
          zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '128px 128px', opacity: 0.08, zIndex: 1,
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 20px' }}>
            <Image src="/assets/Logo.png" alt="Tarsi Logo" width={120} height={40} quality={100} style={{ height: '32px', width: 'auto' }} />
            <a href="https://www.facebook.com/groups/1243677331220736/" target="_blank" rel="noreferrer" style={{
              backgroundColor: 'white', color: '#648B5C', padding: '8px 16px', borderRadius: '9999px',
              fontWeight: '800', fontSize: '12px', border: 'none', cursor: 'pointer', textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap',
            }}>
              JOIN COMMUNITY
            </a>
          </nav>

          <div style={{ textAlign: 'center', padding: '8px 20px 0px' }}>
            <h1 style={{
              fontSize: 'clamp(1.6rem, 5vw, 3.75rem)', fontWeight: '800', color: 'white',
              lineHeight: '1.2', fontStyle: 'italic', marginBottom: '20px', textShadow: '0 2px 12px rgba(0,0,0,0.15)',
            }}>
              Track all your money in one place,<br />effortlessly
            </h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <a href="https://apps.apple.com/us/app/tarsi-budget-tracker/id6760278399" target="_blank" rel="noreferrer">
                <Image src="/assets/app_store_logo.png" alt="Download on App Store" width={150} height={50} style={{ height: '40px', width: 'auto' }} />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.tarsi.app" target="_blank" rel="noreferrer">
                <Image src="/assets/android_logo.png" alt="Get it on Google Play" width={150} height={50} style={{ height: '40px', width: 'auto' }} />
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', padding: '0 16px', marginTop: '-16px' }}>
            <Image src="/assets/Mockups.png" alt="Tarsi App Mockups" width={1600} height={820} quality={100}
              style={{ width: '100%', maxWidth: '1500px', height: 'auto', display: 'block' }} priority />
          </div>
        </div>
      </div>

      {/* ── Feature Section ── */}
      <style>{`
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

      <section style={{ width: '100%', backgroundColor: '#5C8A52', padding: '12px 12px 40px', overflow: 'visible' }}>
        <div style={{ width: '100%', maxWidth: '1500px', margin: '0 auto', overflow: 'visible', paddingBottom: '20px' }}>
          <div className="feature-grid" style={{ overflow: 'visible' }}>

            {/* Card 1 — No.1 Finance App */}
            <div className="feat-card feat-card-1 feature-reveal-card feature-reveal-left">
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
            <div className="feat-card feat-card-2 feature-reveal-card feature-reveal-right">
              <div className="feat-card-2-content">
                <div className="feat-card-2-title">OFFLINE AI<br />ASSISTANT</div>
                <div className="feat-card-2-subtitle">Intelligent, on-device chat,<br />Emphasize privacy.</div>
              </div>
              <div className="char-img-br-ai">
                <Image src="/assets/Tarsi_for_AI_Offline.png" alt="Sleeping Tarsi" width={720} height={450} quality={100} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>

            {/* Card 3 — Visualize Your Progress */}
            <div className="feat-card feat-card-3 feature-reveal-card feature-reveal-left">
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
            <div className="feat-card feat-card-4 feature-reveal-card feature-reveal-right">
              <div className="feat-card-4-content">
                <div className="feat-title-mixed">Jumpstart Your Journey</div>
                <div className="feat-subtitle">Take the first leap to <br />financial freedom</div>
              </div>
              <div className="char-img-br-jump">
                <Image src="/assets/Happy_jump 2.png" alt="Happy jumping Tarsi" width={340} height={360} quality={100} style={{ width: '100%', height: 'auto', display: 'block' }} />
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
              <a href="https://apps.apple.com/us/app/tarsi-budget-tracker/id6760278399" target="_blank" rel="noreferrer">
                <Image src="/assets/app_store_logo.png" alt="Download on App Store" width={160} height={50} />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.tarsi.app" target="_blank" rel="noreferrer">
                <Image src="/assets/android_logo.png" alt="Get it on Google Play" width={160} height={50} />
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}