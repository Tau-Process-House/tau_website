'use client';
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import workData from '@/data/work.json';
import type { CaseStudy, KPI, LocalizedString, Product, Solution, WorkItem } from '@/types/work';

type FilterType = 'all' | 'caseStudy' | 'product' | 'solution';
const ITEMS_PER_PAGE = 3;
const FONT = 'Arial, Helvetica, sans-serif';

// ─── Localisation helper ──────────────────────────────────────────────────────

function useLoc() {
  const locale = useLocale();
  return (field: LocalizedString): string =>
    (field as Record<string, string>)[locale] ?? field.de;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function AppBadge({ name }: { name: string }) {
  return (
    <span
      className="inline-block border border-black/15 rounded px-2 py-0.5 text-black/60"
      style={{ fontSize: '14px', fontFamily: FONT }}
    >
      {name}
    </span>
  );
}

function WorkCard({
  item,
  isSelected,
  onClick,
}: {
  item: WorkItem;
  isSelected: boolean;
  onClick: () => void;
}) {
  const loc = useLoc();
  const isCaseStudy = item.type === 'caseStudy';
  const isProduct = item.type === 'product';
  const cs = item as CaseStudy;
  const pr = item as Product;
  const sl = item as Solution;

  const typeLabel = isCaseStudy ? 'Case Study' : isProduct ? 'Product' : 'Solution';
  const headline = isCaseStudy ? loc(cs.headline) : isProduct ? loc(pr.name) : loc(sl.name);
  const tagline = isCaseStudy ? loc(cs.tagline) : isProduct ? loc(pr.tagline) : loc(sl.tagline);

  return (
    <button
      onClick={onClick}
      className={`text-left w-full rounded-lg border p-5 flex flex-col gap-3 transition-all cursor-pointer ${
        isSelected
          ? 'border-black bg-black text-white'
          : 'border-black/15 bg-white text-black hover:border-black/40'
      }`}
    >
      <span
        className={`font-mono tracking-widest uppercase ${
          isSelected ? 'text-white/50' : 'text-black/35'
        }`}
        style={{ fontSize: '12px', fontFamily: FONT }}
      >
        {typeLabel}
      </span>

      <div>
        <p className="font-bold leading-snug" style={{ fontSize: '16px', fontFamily: FONT }}>
          {headline}
        </p>
        <p
          className={`mt-1 line-clamp-2 ${isSelected ? 'text-white/60' : 'text-black/50'}`}
          style={{ fontSize: '14px', fontFamily: FONT }}
        >
          {tagline}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-1">
        {isCaseStudy
          ? cs.kpis.slice(0, 2).map((kpi: KPI, i: number) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${
                  isSelected ? 'bg-white/15 text-white' : 'bg-black/5 text-black'
                }`}
                style={{ fontSize: '12px', fontFamily: FONT }}
              >
                <span>{kpi.improvement}</span>
                <span className={isSelected ? 'text-white/50 font-normal' : 'text-black/40 font-normal'}>
                  {loc(kpi.metric)}
                </span>
              </span>
            ))
          : isProduct
          ? (
            <span
              className={`font-semibold ${isSelected ? 'text-white' : 'text-black'}`}
              style={{ fontSize: '14px', fontFamily: FONT }}
            >
              {pr.pricing.label}
            </span>
          )
          : (
            <div className="flex flex-wrap gap-1">
              {sl.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className={`inline-block rounded-full px-2 py-0.5 ${
                    isSelected ? 'bg-white/15 text-white/70' : 'bg-black/5 text-black/50'
                  }`}
                  style={{ fontSize: '12px', fontFamily: FONT }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
      </div>
    </button>
  );
}

function CaseStudyDetail({ item, onClose }: { item: CaseStudy; onClose: () => void }) {
  const loc = useLoc();

  return (
    <div className="w-full max-w-6xl mx-auto px-8 py-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <span
            className="font-mono tracking-widest text-black/35 uppercase"
            style={{ fontSize: '12px', fontFamily: FONT }}
          >
            Case Study · {loc(item.industry)}
          </span>
          <h3 className="font-bold mt-1" style={{ fontSize: '24px', fontFamily: FONT }}>
            {loc(item.headline)}
          </h3>
          <p className="text-black/60 mt-1" style={{ fontSize: '20px', fontFamily: FONT }}>
            {item.client}
          </p>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 w-8 h-8 rounded-full border border-black/20 flex items-center justify-center text-black/50 hover:border-black hover:text-black transition-colors"
          aria-label="Close detail"
          style={{ fontFamily: FONT }}
        >
          ✕
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <div>
            <h4
              className="font-mono tracking-widest text-black/35 uppercase mb-2"
              style={{ fontSize: '12px', fontFamily: FONT }}
            >
              Challenge
            </h4>
            <p className="leading-relaxed text-black/80" style={{ fontSize: '15px', fontFamily: FONT }}>
              {loc(item.challenge)}
            </p>
          </div>

          <div>
            <h4
              className="font-mono tracking-widest text-black/35 uppercase mb-2"
              style={{ fontSize: '12px', fontFamily: FONT }}
            >
              Solution
            </h4>
            <p className="leading-relaxed text-black/80 mb-3" style={{ fontSize: '15px', fontFamily: FONT }}>
              {loc(item.solution.summary)}
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              {item.solution.apps.map((app) => (
                <AppBadge key={app} name={app} />
              ))}
            </div>
            <p className="leading-relaxed text-black/60" style={{ fontSize: '14px', fontFamily: FONT }}>
              {loc(item.solution.description)}
            </p>
          </div>

          <div>
            <h4
              className="font-mono tracking-widest text-black/35 uppercase mb-2"
              style={{ fontSize: '12px', fontFamily: FONT }}
            >
              Deliverables
            </h4>
            <ul className="space-y-1">
              {item.artifacts.map((a, i) => (
                <li
                  key={i}
                  className="text-black/70 flex items-center gap-2"
                  style={{ fontSize: '14px', fontFamily: FONT }}
                >
                  <span className="text-black/25">→</span> {loc(a)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h4
            className="font-mono tracking-widest text-black/35 uppercase mb-4"
            style={{ fontSize: '12px', fontFamily: FONT }}
          >
            Results
          </h4>
          <div className="flex flex-col gap-3">
            {item.kpis.map((kpi, i) => (
              <div key={i} className="border border-black/10 rounded-lg p-4">
                <div className="font-bold" style={{ fontSize: '2rem', fontFamily: FONT }}>
                  {kpi.improvement}
                </div>
                <div className="font-semibold mt-1" style={{ fontSize: '15px', fontFamily: FONT }}>
                  {loc(kpi.metric)}
                </div>
                {kpi.before && kpi.after && (
                  <div className="text-black/40 mt-1" style={{ fontSize: '14px', fontFamily: FONT }}>
                    {kpi.before} → {kpi.after}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductDetail({ item, onClose }: { item: Product; onClose: () => void }) {
  const loc = useLoc();
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto px-8 py-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <span
            className="font-mono tracking-widest text-black/35 uppercase"
            style={{ fontSize: '12px', fontFamily: FONT }}
          >
            Product
          </span>
          <h3 className="font-bold mt-1" style={{ fontSize: '24px', fontFamily: FONT }}>
            {loc(item.name)}
          </h3>
          <p className="text-black/60 mt-1" style={{ fontSize: '16px', fontFamily: FONT }}>
            {loc(item.tagline)}
          </p>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 w-8 h-8 rounded-full border border-black/20 flex items-center justify-center text-black/50 hover:border-black hover:text-black transition-colors"
          aria-label="Close detail"
        >
          ✕
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <div>
            <h4
              className="font-mono tracking-widest text-black/35 uppercase mb-2"
              style={{ fontSize: '12px', fontFamily: FONT }}
            >
              Problem
            </h4>
            <p className="leading-relaxed text-black/80" style={{ fontSize: '15px', fontFamily: FONT }}>
              {loc(item.problem)}
            </p>
          </div>

          <div>
            <h4
              className="font-mono tracking-widest text-black/35 uppercase mb-2"
              style={{ fontSize: '12px', fontFamily: FONT }}
            >
              How it works
            </h4>
            <p className="leading-relaxed text-black/80" style={{ fontSize: '15px', fontFamily: FONT }}>
              {loc(item.description)}
            </p>
          </div>

          {!imgError && item.showcase.url ? (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-black/10 bg-black/5">
              <Image
                src={item.showcase.url}
                alt={loc(item.showcase.alt)}
                fill
                className="object-cover"
                onError={() => setImgError(true)}
              />
            </div>
          ) : (
            <div className="w-full aspect-video rounded-lg border border-black/10 bg-black/5 flex items-center justify-center">
              <span className="text-black/30" style={{ fontSize: '14px', fontFamily: FONT }}>
                Screenshot coming soon
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h4
              className="font-mono tracking-widest text-black/35 uppercase mb-4"
              style={{ fontSize: '12px', fontFamily: FONT }}
            >
              Results at clients
            </h4>
            <div className="flex flex-col gap-3">
              {item.results.map((kpi, i) => (
                <div key={i} className="border border-black/10 rounded-lg p-4">
                  <div className="font-bold" style={{ fontSize: '2rem', fontFamily: FONT }}>
                    {kpi.improvement}
                  </div>
                  <div className="font-semibold mt-1" style={{ fontSize: '15px', fontFamily: FONT }}>
                    {loc(kpi.metric)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-black/10 rounded-lg p-5 flex flex-col gap-4">
            <div>
              <h4
                className="font-mono tracking-widest text-black/35 uppercase mb-1"
                style={{ fontSize: '12px', fontFamily: FONT }}
              >
                Pricing
              </h4>
              <div className="font-bold" style={{ fontSize: '24px', fontFamily: FONT }}>
                {item.pricing.label}
              </div>
            </div>
            <Link
              href={item.cta.href}
              className="inline-block bg-black text-white font-semibold px-5 py-3 rounded-lg text-center hover:bg-black/80 transition-colors"
              style={{ fontSize: '15px', fontFamily: FONT }}
            >
              {loc(item.cta.label)} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SolutionDetail({ item, onClose }: { item: Solution; onClose: () => void }) {
  const loc = useLoc();

  return (
    <div className="w-full max-w-6xl mx-auto px-8 py-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <span
            className="font-mono tracking-widest text-black/35 uppercase"
            style={{ fontSize: '12px', fontFamily: FONT }}
          >
            Solution
          </span>
          <h3 className="font-bold mt-1" style={{ fontSize: '24px', fontFamily: FONT }}>
            {loc(item.name)}
          </h3>
          <p className="text-black/60 mt-1" style={{ fontSize: '16px', fontFamily: FONT }}>
            {loc(item.tagline)}
          </p>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 w-8 h-8 rounded-full border border-black/20 flex items-center justify-center text-black/50 hover:border-black hover:text-black transition-colors"
          aria-label="Close detail"
        >
          ✕
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left column: Für wen + Wie */}
        <div className="flex flex-col gap-6">
          {/* Block 1: Für wen */}
          <div>
            <h4
              className="font-mono tracking-widest text-black/35 uppercase mb-2"
              style={{ fontSize: '12px', fontFamily: FONT }}
            >
              Für wen
            </h4>
            <p className="leading-relaxed text-black/80 mb-4" style={{ fontSize: '15px', fontFamily: FONT }}>
              {loc(item.target.audience)}
            </p>
            <h4
              className="font-mono tracking-widest text-black/35 uppercase mb-2"
              style={{ fontSize: '12px', fontFamily: FONT }}
            >
              Das Problem
            </h4>
            <p className="leading-relaxed text-black/60" style={{ fontSize: '14px', fontFamily: FONT }}>
              {loc(item.target.problem)}
            </p>
          </div>

          {/* Block 2: Die Lösung */}
          <div>
            <h4
              className="font-mono tracking-widest text-black/35 uppercase mb-2"
              style={{ fontSize: '12px', fontFamily: FONT }}
            >
              Die Lösung
            </h4>
            <p className="leading-relaxed text-black/80 mb-4" style={{ fontSize: '15px', fontFamily: FONT }}>
              {loc(item.architecture.summary)}
            </p>
            {/* Components */}
            <div className="flex flex-col gap-3 mb-4">
              {item.architecture.components.map((comp) => (
                <div key={comp.name} className="border border-black/10 rounded-lg p-4">
                  <div className="font-semibold mb-1" style={{ fontSize: '14px', fontFamily: FONT }}>
                    {comp.name}
                  </div>
                  <div className="text-black/60 leading-relaxed" style={{ fontSize: '13px', fontFamily: FONT }}>
                    {loc(comp.role)}
                  </div>
                </div>
              ))}
            </div>
            <p className="leading-relaxed text-black/60" style={{ fontSize: '13px', fontFamily: FONT }}>
              {loc(item.architecture.description)}
            </p>
          </div>
        </div>

        {/* Right column: Was erhält der Kunde */}
        <div>
          <h4
            className="font-mono tracking-widest text-black/35 uppercase mb-4"
            style={{ fontSize: '12px', fontFamily: FONT }}
          >
            Was der Kunde erhält
          </h4>
          <ul className="flex flex-col gap-3">
            {item.deliverables.map((deliverable, i) => (
              <li
                key={i}
                className="border border-black/10 rounded-lg p-4 flex items-start gap-3"
              >
                <span
                  className="text-black/25 shrink-0 mt-0.5"
                  style={{ fontSize: '14px', fontFamily: FONT }}
                >
                  →
                </span>
                <span
                  className="text-black/80 leading-relaxed"
                  style={{ fontSize: '14px', fontFamily: FONT }}
                >
                  {loc(deliverable)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function OurWorkSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  // Tracks layout mode independently so it stays in column mode during exit animation
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  // When a new item is selected, make detail layout active
  useEffect(() => {
    if (selectedItem !== null) {
      setIsDetailVisible(true);
    }
  }, [selectedItem]);

  const allItems = useMemo<WorkItem[]>(() => {
    const cases = (workData.caseStudies as unknown as CaseStudy[]).filter((c) => c.published);
    const products = (workData.products as unknown as Product[]).filter((p) => p.published);
    const solutions = (workData.solutions as unknown as Solution[]).filter((s) => s.published);
    const result: WorkItem[] = [];
    const maxLen = Math.max(cases.length, products.length, solutions.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < solutions.length) result.push(solutions[i]);
      if (i < cases.length) result.push(cases[i]);
      if (i < products.length) result.push(products[i]);
    }
    return result;
  }, []);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return allItems;
    return allItems.filter((item) => item.type === activeFilter);
  }, [allItems, activeFilter]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const pageItems = filteredItems.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setCurrentPage(0);
  };

  const handleCardClick = (item: WorkItem) => {
    setSelectedItem((prev) => (prev?.id === item.id ? null : item));
  };

  const publishedTypes = useMemo(() => new Set(allItems.map((i) => i.type)), [allItems]);

  const filters = useMemo(() => {
    const result: { key: FilterType; label: string }[] = [{ key: 'all', label: 'All' }];
    if (publishedTypes.has('solution')) result.push({ key: 'solution', label: 'Solutions' });
    if (publishedTypes.has('caseStudy')) result.push({ key: 'caseStudy', label: 'Case Studies' });
    if (publishedTypes.has('product')) result.push({ key: 'product', label: 'Products' });
    return result;
  }, [publishedTypes]);

  return (
    <section
      className="section section-white"
      style={
        isDetailVisible
          ? { flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' }
          : {}
      }
    >
      {/* Gallery — always at top */}
      <div className="w-full max-w-6xl mx-auto px-8 pt-8 pb-4 shrink-0">
        <h2
          className="font-bold mb-6 text-center"
          style={{ fontSize: '3rem', fontFamily: FONT }}
        >
          Our Work
        </h2>

        {/* Filter buttons — only rendered when multiple types have published entries */}
        {filters.length > 1 && (
          <div className="flex justify-center gap-2 mb-6">
            {filters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleFilterChange(key)}
                className={`px-4 py-1.5 rounded-full border transition-all ${
                  activeFilter === key
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black/20 hover:border-black/50'
                }`}
                style={{ fontSize: '14px', fontFamily: FONT }}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatePresence mode="sync">
            {pageItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <WorkCard
                  item={item}
                  isSelected={selectedItem?.id === item.id}
                  onClick={() => handleCardClick(item)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination — only rendered when there is more than one page */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center disabled:opacity-30 hover:border-black transition-colors"
              style={{ fontSize: '20px', fontFamily: FONT }}
            >
              ←
            </button>
            <span className="text-black/50" style={{ fontSize: '14px', fontFamily: FONT }}>
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center disabled:opacity-30 hover:border-black transition-colors"
              style={{ fontSize: '20px', fontFamily: FONT }}
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Detail panel */}
      <AnimatePresence onExitComplete={() => setIsDetailVisible(false)}>
        {selectedItem && (
          <motion.div
            key="detail-panel"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 48 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex-1 min-h-0 overflow-y-auto border-t border-black/10 w-full"
          >
            {selectedItem.type === 'caseStudy' ? (
              <CaseStudyDetail
                item={selectedItem as CaseStudy}
                onClose={() => setSelectedItem(null)}
              />
            ) : selectedItem.type === 'product' ? (
              <ProductDetail
                item={selectedItem as Product}
                onClose={() => setSelectedItem(null)}
              />
            ) : (
              <SolutionDetail
                item={selectedItem as Solution}
                onClose={() => setSelectedItem(null)}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
