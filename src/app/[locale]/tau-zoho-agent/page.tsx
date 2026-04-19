import agentData from '@/data/agent.json';
import AgentNav from '@/components/agent/AgentNav';
import AgentDotNav from '@/components/agent/AgentDotNav';
import AgentHero from '@/components/agent/AgentHero';
import AgentCompare from '@/components/agent/AgentCompare';
import AgentCapabilities from '@/components/agent/AgentCapabilities';
import AgentHowItWorks from '@/components/agent/AgentHowItWorks';
import AgentEcosystem from '@/components/agent/AgentEcosystem';
import AgentFaq from '@/components/agent/AgentFaq';
import AgentCta from '@/components/agent/AgentCta';
import AgentFooter from '@/components/agent/AgentFooter';
import AgentBodyStyle from '@/components/agent/AgentBodyStyle';

export default async function TauZohoAgentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (f: { de: string; en: string }) => f[locale as 'de' | 'en'] ?? f.en;
  const locStr = (f: string | { de: string; en: string }) =>
    typeof f === 'string' ? f : loc(f);

  const d = agentData;

  return (
    <>
      <AgentBodyStyle />
      <AgentNav
        backLabel={loc(d.nav.backLabel)}
        ctaLabel={loc(d.nav.ctaLabel)}
        ctaHref={d.nav.ctaHref}
        links={d.nav.links.map((l) => ({ label: loc(l.label), href: l.href }))}
      />
      <AgentDotNav />
      <main style={{ backgroundColor: '#000' }}>
        <AgentHero
          pill={{ text: loc(d.hero.pill.text), tag: d.hero.pill.tag }}
          titleLine1={loc(d.hero.titleLine1)}
          titlePre={loc(d.hero.titlePre)}
          titleGold={loc(d.hero.titleGold)}
          subtitle={loc(d.hero.subtitle)}
          primaryCta={{ label: loc(d.hero.primaryCta.label), href: d.hero.primaryCta.href }}
          secondaryCta={{ label: loc(d.hero.secondaryCta.label), href: d.hero.secondaryCta.href }}
          meta={d.hero.meta.map(loc)}
          chat={{
            title: d.hero.chat.title,
            envPill: d.hero.chat.envPill,
            userPrompt: d.hero.chat.userPrompt,
            userTime: d.hero.chat.userTime,
            toolCall: d.hero.chat.toolCall,
            assistantTime: d.hero.chat.assistantTime,
            replyIntro: d.hero.chat.replyIntro,
            leadFields: d.hero.chat.leadFields,
            replyFooterBold: d.hero.chat.replyFooterBold,
            replyFooterSuffix: d.hero.chat.replyFooterSuffix,
            nextPrompt: d.hero.chat.nextPrompt,
            inputPlaceholder: loc(d.hero.chat.inputPlaceholder),
            chips: d.hero.chat.chips,
          }}
        />

        <AgentCompare
          sectionLabel={loc(d.compare.label)}
          titleLine1={loc(d.compare.titleLine1)}
          titleLine2={loc(d.compare.titleLine2)}
          before={{
            label: loc(d.compare.before.label),
            stats: d.compare.before.stats.map((s) => ({
              number: locStr(s.number),
              desc: loc(s.desc),
            })),
          }}
          after={{
            label: loc(d.compare.after.label),
            stats: d.compare.after.stats.map((s) => ({
              number: locStr(s.number),
              desc: loc(s.desc),
            })),
          }}
        />

        <AgentCapabilities
          sectionLabel={loc(d.capabilities.label)}
          titlePart1={loc(d.capabilities.titlePart1)}
          titleGold={loc(d.capabilities.titleGold)}
          subtitle={loc(d.capabilities.subtitle)}
          items={d.capabilities.items.map((item) => ({
            icon: item.icon,
            title: loc(item.title),
            desc: loc(item.desc),
            tags: item.tags,
          }))}
        />

        <AgentHowItWorks
          sectionLabel={loc(d.how.label)}
          title={loc(d.how.title)}
          subtitle={loc(d.how.subtitle)}
          steps={d.how.steps.map((step) => ({
            num: step.num,
            stepLabel: loc(step.stepLabel),
            title: loc(step.title),
            desc: loc(step.desc),
            demoLines: step.demoLines,
          }))}
        />

        <AgentEcosystem
          sectionLabel={loc(d.ecosystem.label)}
          titlePart1={loc(d.ecosystem.titlePart1)}
          titleGold={loc(d.ecosystem.titleGold)}
          subtitle={loc(d.ecosystem.subtitle)}
          hub={d.ecosystem.hub}
          orbit={d.ecosystem.orbit}
        />

        <AgentFaq
          sectionLabel={loc(d.faq.label)}
          title={loc(d.faq.title)}
          items={d.faq.items.map((item) => ({
            q: loc(item.q),
            a: loc(item.a),
            open: item.open,
          }))}
        />

        <AgentCta
          sectionLabel={loc(d.finalCta.label)}
          titleLine1={loc(d.finalCta.titleLine1)}
          titleLine2Pre={loc(d.finalCta.titleLine2Pre)}
          titleLine2Gold={loc(d.finalCta.titleLine2Gold)}
          subtitle={loc(d.finalCta.subtitle)}
          footnote={loc(d.finalCta.footnote)}
        />
      </main>

      <AgentFooter
        brandSuffix={loc(d.footer.brandSuffix)}
        copyright={d.footer.copyright}
        links={d.footer.links.map((l) => ({ label: loc(l.label), href: l.href }))}
      />
    </>
  );
}
