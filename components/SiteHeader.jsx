'use client';

import { useEffect, useRef } from 'react';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';

export default function SiteHeader() {
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Whenever the header resizes (bar dismissed, etc.) update main's padding
    const observer = new ResizeObserver(() => {
      const height = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--header-height', `${height}px`);
    });

    observer.observe(header);
    // Set initial value
    document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={headerRef} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
      <AnnouncementBar />
      <Navbar />
    </div>
  );
}