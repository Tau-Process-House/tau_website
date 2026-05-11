'use client';
import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link, useRouter } from '@/i18n/navigation';
import { useLocalized } from '@/lib/use-localized';
import { useLocale } from 'next-intl';
import teaserData from '@/data/agent-teaser.json';
import agentData from '@/data/agent.json';
import type { AgentTeaserContent } from '@/types/content';
import ZohoChatPreview from '@/components/agent/ZohoChatPreview';

const data = teaserData as AgentTeaserContent;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function TauAgentTeaserSection() {
  const loc = useLocalized();
  const locale = useLocale();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const router = useRouter();
  const touchStart = useRef({ x: 0, y: 0 });

  const chatProps = useMemo(() => {
    const l = (s: { de: string; en: string }) => s[locale as 'de' | 'en'] ?? s.en;
    const raw = agentData.hero.chatDemo.scenarios.find(
      s => s.id === (data.chatScenarioId ?? '')
    ) ?? agentData.hero.chatDemo.scenarios[0];

    return {
      agentTitle: agentData.hero.chatDemo.agentTitle,
      inputPlaceholder: l(agentData.hero.chatDemo.inputPlaceholder),
      langBadge: agentData.hero.chatDemo.langBadge,
      scenario: {
        id: raw.id,
        crmModule: raw.crmModule,
        crmBreadcrumb: raw.crmBreadcrumb,
        crmEmail: raw.crmEmail,
        crmFields: raw.crmFields,
        updatedCrmFields: (raw as { updatedCrmFields?: { label: string; value: string; isNew?: boolean }[] }).updatedCrmFields,
        steps: (raw.steps as Array<{
          type: string;
          text?: { de: string; en: string };
          timestamp?: string;
        }>).map(step => ({
          type: step.type as 'user' | 'thinking' | 'agent',
          text: step.text ? l(step.text) : undefined,
          timestamp: step.timestamp,
        })),
      },
    };
  }, [locale]);

  return (
    <section
      ref={ref}
      className="section overflow-hidden p-0"
      onTouchStart={(e) => {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchStart.current.x;
        const dy = e.changedTouches[0].clientY - touchStart.current.y;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && dx < 0) {
          router.push('/tau-zoho-agent');
        }
      }}
    >
      <div className="flex flex-col md:flex-row w-full h-[100dvh]">

        {/* Left: white — copy + CTA (40%, smaller) */}
        <motion.div
          className="bg-white text-black flex flex-col justify-center px-8 py-8 h-[60dvh] md:h-full w-full md:w-[40%] overflow-y-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="w-full max-w-md mx-auto flex flex-col items-start text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
              {loc(data.preLabel)}
            </p>
            <h2 className="font-bold leading-tight text-black mb-5 text-3xl md:text-4xl xl:text-5xl">
              {data.headline.map((line, i) => (
                <span key={i} className="block">{loc(line)}</span>
              ))}
            </h2>
            <p className="text-sm leading-relaxed text-gray-700 mb-5 max-w-sm">
              {loc(data.subtitle)}
            </p>
            <ul className="mb-7 space-y-2">
              {data.bullets.map((bullet, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-black">
                  <span className="text-gray-500 font-bold flex-shrink-0">✓</span>
                  {loc(bullet)}
                </li>
              ))}
            </ul>
            <Link
              href="/tau-zoho-agent"
              className="inline-block bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-3 hover:opacity-80 transition-opacity"
              onClick={() => {
                window.gtag?.('event', 'mainpage_to_agent_click', { source: 'teaser' });
              }}
            >
              {loc(data.cta)}
            </Link>
          </div>
        </motion.div>

        {/* Right: black — chat animation (60%, larger) */}
        <motion.div
          className="bg-black text-white flex items-center justify-center px-8 md:px-12 py-8 h-[40dvh] md:h-full w-full md:w-[60%] overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          {/* Mobile: tau branding */}
          <div className="md:hidden flex flex-col items-center">
            <div className="flex items-center gap-2 border border-[#C8962E] rounded-full px-3 py-1 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#C8962E] flex-shrink-0" />
              <span className="text-[#C8962E] text-xs font-bold uppercase tracking-widest">
                {loc(data.betaPill)}
              </span>
            </div>
            <div
              className="text-[#C8962E] font-bold leading-none select-none"
              style={{ fontSize: 'clamp(4rem, 15vw, 10rem)' }}
            >
              {data.visual}
            </div>
            <span className="mt-6 text-xs font-bold uppercase tracking-widest text-white">
              {data.wordmark}
            </span>
          </div>

          {/* Desktop: Zoho CRM chat animation */}
          <div className="hidden md:block w-full max-w-2xl">
            <ZohoChatPreview {...chatProps} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
