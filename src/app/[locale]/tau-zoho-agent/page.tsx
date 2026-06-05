import agentData from '@/data/agent.json';
import AgentNav from '@/components/agent/AgentNav';
import AgentHero from '@/components/agent/AgentHero';
import AgentCompare from '@/components/agent/AgentCompare';
import AgentSolution from '@/components/agent/AgentSolution';
import AgentPricing from '@/components/agent/AgentPricing';
import AgentFaq from '@/components/agent/AgentFaq';
import AgentCta from '@/components/agent/AgentCta';
import AgentFooter from '@/components/agent/AgentFooter';
import AgentBodyStyle from '@/components/agent/AgentBodyStyle';
// AgentDotNav replaced by GlobalDotNav in layout

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
        ctaLabel={loc(d.nav.ctaLabel)}
        ctaHref={d.nav.ctaHref}
        links={d.nav.links.map((l) => ({ label: loc(l.label), href: l.href }))}
      />
      <main id="agent-scroll" className="agent-scroll-container" style={{ backgroundColor: '#000' }}>
        <AgentHero
          pill={{ text: loc(d.hero.pill.text), tag: d.hero.pill.tag }}
          titleLine1={loc(d.hero.titleLine1)}
          titlePre={loc(d.hero.titlePre)}
          titleGold={loc(d.hero.titleGold)}
          subtitle={loc(d.hero.subtitle)}
          primaryCta={{ label: loc(d.hero.primaryCta.label), href: d.hero.primaryCta.href }}
          secondaryCta={{ label: loc(d.hero.secondaryCta.label), href: d.hero.secondaryCta.href }}
          meta={d.hero.meta.map(loc)}
          chatDemo={{
            agentTitle: d.hero.chatDemo.agentTitle,
            inputPlaceholder: loc(d.hero.chatDemo.inputPlaceholder),
            langBadge: d.hero.chatDemo.langBadge,
            scenario: {
              id: d.hero.chatDemo.scenarios[0].id,
              crmModule: d.hero.chatDemo.scenarios[0].crmModule,
              crmBreadcrumb: d.hero.chatDemo.scenarios[0].crmBreadcrumb,
              crmEmail: d.hero.chatDemo.scenarios[0].crmEmail,
              crmFields: d.hero.chatDemo.scenarios[0].crmFields,
              updatedCrmFields: (d.hero.chatDemo.scenarios[0] as { updatedCrmFields?: { label: string; value: string; isNew?: boolean }[] }).updatedCrmFields,
              steps: (d.hero.chatDemo.scenarios[0].steps as Array<{
                type: string;
                text?: { de: string; en: string };
                timestamp?: string;
              }>).map(step => ({
                type: step.type as 'user' | 'thinking' | 'agent',
                text: step.text ? loc(step.text) : undefined,
                timestamp: step.timestamp,
              })),
            },
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

        <AgentSolution
          sectionLabel={loc(d.solution.label)}
          titleLine1={loc(d.solution.titleLine1)}
          titleLine2={loc(d.solution.titleLine2)}
          subtitle={loc(d.solution.subtitle)}
          modelsCaption={loc(d.solution.modelsCaption)}
          models={d.solution.models}
          zohoApps={{
            title: loc(d.solution.zohoApps.title),
            caption: loc(d.solution.zohoApps.caption),
            logos: d.solution.zohoApps.logos,
          }}
          connector={{
            title: loc(d.solution.connector.title),
            caption: loc(d.solution.connector.caption),
          }}
          chat={{
            title: loc(d.solution.chat.title),
            caption: loc(d.solution.chat.caption),
            userMessage: loc(d.solution.chat.userMessage),
            agentMessage: loc(d.solution.chat.agentMessage),
          }}
        />

        <AgentPricing
          sectionLabel={loc(d.pricing.label)}
          titleLine1={loc(d.pricing.titleLine1)}
          titleLine2={loc(d.pricing.titleLine2)}
          subtitle={loc(d.pricing.subtitle)}
          perUserMonth={loc(d.pricing.perUserMonth)}
          vatNote={loc(d.pricing.vatNote)}
          onRequest={loc(d.pricing.onRequest)}
          comingSoonLabel={loc(d.pricing.comingSoonLabel)}
          ctaAvailableLabel={loc(d.pricing.ctaAvailableLabel)}
          ctaHref={d.pricing.ctaHref}
          tiers={d.pricing.tiers.map((t) => ({
            id: t.id,
            name: t.name,
            price: (t as { price?: string }).price,
            currency: (t as { currency?: string }).currency,
            available: t.available,
            highlight: (t as { highlight?: boolean }).highlight,
            tagline: loc(t.tagline),
            features: t.features.map(loc),
          }))}
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

        <div style={{
          scrollSnapAlign: 'start',
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <AgentCta
            sectionLabel={loc(d.finalCta.label)}
            titleLine1={loc(d.finalCta.titleLine1)}
            titleLine2Pre={loc(d.finalCta.titleLine2Pre)}
            titleLine2Gold={loc(d.finalCta.titleLine2Gold)}
            subtitle={loc(d.finalCta.subtitle)}
            footnote={loc(d.finalCta.footnote)}
            installUrl={d.installUrl}
            installLabel={loc(d.finalCta.installLabel)}
            installHint={loc(d.finalCta.installHint)}
            steps={d.finalCta.steps.map(loc)}
            secondaryLabel={loc(d.finalCta.secondaryLabel)}
          />
          <AgentFooter
            brandSuffix={loc(d.footer.brandSuffix)}
            copyright={d.footer.copyright}
            links={d.footer.links.map((l) => ({ label: loc(l.label), href: l.href }))}
          />
        </div>
      </main>
    </>
  );
}
