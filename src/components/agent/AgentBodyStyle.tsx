'use client';
import { useEffect } from 'react';

export default function AgentBodyStyle() {
  useEffect(() => {
    document.body.style.overflowY = 'auto';
    return () => { document.body.style.overflowY = ''; };
  }, []);
  return null;
}
