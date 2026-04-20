'use client';
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import workData from '@/data/work.json';
import type { CaseStudy, KPI, Product, WorkItem } from '@/types/work';

type FilterType = 'all' | 'caseStudy' | 'product';
const ITEMS_PER_PAGE = 3;
const FONT = 'Arial, Helvetica, sans-serif';

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
  const isCaseStudy = item.type === 'caseStudy';
  const cs = item as CaseStudy;
  const pr = item as Product;

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
        {isCaseStudy ? 'Case Study' : 'Product'}
      </span>

      <div>
        <p className="font-bold leading-snug" style={{ fontSize: '16px', fontFamily: FONT }}>
          {isCaseStudy ? cs.headline : pr.name}
        </p>
        <p
          className={`mt-1 line-clamp-2 ${isSelected ? 'text-white/60' : 'text-black/50'}`}
          style={{ fontSize: '14px', fontFamily: FONT }}
        >
          {isCaseStudy ? cs.tagline : pr.tagline}
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
                  {kpi.metric}
                </span>
              </span>
            ))
          : (
            <span
              className={`font-semibold ${isSelected ? 'text-white' : 'text-black'}`}
              style={{ fontSize: '14px', fontFamily: FONT }}
            >
              {pr.pricing.label}
            </span>
          )}
      </div>
    </button>
  );
}

function CaseStudyDetail({ item, onClose }: { item: CaseStudy; onClose: () => void }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-8 py-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <span
            className="font-mono tracking-widest text-black/35 uppercase"
            style={{ fontSize: '12px', fontFamily: FONT }}
          >
            Case Study · {item.industry}
          </span>
          <h3 className="font-bold mt-1" style={{ fontSize: '24px', fontFamily: FONT }}>
            {item.headline}
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
            <p className="leading-relaxed text-black/80" style={{ fontSize: '20px', fontFamily: FONT }}>
              {item.challenge}
            </p>
          </div>

          <div>
            <h4
              className="font-mono tracking-widest text-black/35 uppercase mb-2"
              style={{ fontSize: '12px', fontFamily: FONT }}
            >
              Solution
            </h4>
            <p className="leading-relaxed text-black/80 mb-3" style={{ fontSize: '20px', fontFamily: FONT }}>
              {item.solution.summary}
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              {item.solution.apps.map((app) => (
                <AppBadge key={app} name={app} />
              ))}
            </div>
            <p className="leading-relaxed text-black/60" style={{ fontSize: '20px', fontFamily: FONT }}>
              {item.solution.description}
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
              {item.artifacts.map((a) => (
                <li
                  key={a}
                  className="text-black/70 flex items-center gap-2"
                  style={{ fontSize: '20px', fontFamily: FONT }}
                >
                  <span className="text-black/25">→</span> {a}
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
                <div className="font-semibold mt-1" style={{ fontSize: '20px', fontFamily: FONT }}>
                  {kpi.metric}
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
            {item.name}
          </h3>
          <p className="text-black/60 mt-1" style={{ fontSize: '20px', fontFamily: FONT }}>
            {item.tagline}
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
            <p className="leading-relaxed text-black/80" style={{ fontSize: '20px', fontFamily: FONT }}>
              {item.problem}
            </p>
          </div>

          <div>
            <h4
              className="font-mono tracking-widest text-black/35 uppercase mb-2"
              style={{ fontSize: '12px', fontFamily: FONT }}
            >
              How it works
            </h4>
            <p className="leading-relaxed text-black/80" style={{ fontSize: '20px', fontFamily: FONT }}>
              {item.description}
            </p>
          </div>

          {!imgError ? (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-black/10 bg-black/5">
              <Image
                src={item.showcase.url}
                alt={item.showcase.alt}
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
                  <div className="font-semibold mt-1" style={{ fontSize: '20px', fontFamily: FONT }}>
                    {kpi.metric}
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
            <a
              href={item.cta.href}
              className="inline-block bg-black text-white font-semibold px-5 py-3 rounded-lg text-center hover:bg-black/80 transition-colors"
              style={{ fontSize: '20px', fontFamily: FONT }}
            >
              {item.cta.label} →
            </a>
          </div>
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
  // Tracks layout mode independently so it stays in column mode during exit animation (Fix 7)
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  // When a new item is selected, make detail layout active (Fix 7)
  useEffect(() => {
    if (selectedItem !== null) {
      setIsDetailVisible(true);
    }
  }, [selectedItem]);

  const allItems = useMemo<WorkItem[]>(() => {
    const cases = (workData.caseStudies as unknown as CaseStudy[]).filter((c) => c.published);
    const products = (workData.products as unknown as Product[]).filter((p) => p.published);
    const result: WorkItem[] = [];
    const maxLen = Math.max(cases.length, products.length);
    for (let i = 0; i < maxLen; i++) {
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

  // Fix 5: filter change does NOT close the open detail panel
  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setCurrentPage(0);
  };

  const handleCardClick = (item: WorkItem) => {
    setSelectedItem((prev) => (prev?.id === item.id ? null : item));
  };

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'caseStudy', label: 'Case Studies' },
    { key: 'product', label: 'Products' },
  ];

  return (
    <section
      className="section section-white"
      // Fix 7: use isDetailVisible (not selectedItem) so layout stays stable during exit animation
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

        {/* Filter buttons */}
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
              style={{ fontSize: '20px', fontFamily: FONT }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Card grid — Fix 6: pure opacity fade, no scale/layout shift */}
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

        {/* Pagination */}
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
            <span className="text-black/50" style={{ fontSize: '20px', fontFamily: FONT }}>
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

      {/* Detail panel — fixed key so switching items doesn't re-trigger enter/exit animation */}
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
            ) : (
              <ProductDetail
                item={selectedItem as Product}
                onClose={() => setSelectedItem(null)}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
