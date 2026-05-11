'use client';
import { useEffect } from 'react';

export default function AgentBodyStyle() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);
  return null;
}
