'use client';
import { usePathname } from '@/i18n/navigation';
import LanguageToggle from './LanguageToggle';

export default function ConditionalLanguageToggle() {
  const pathname = usePathname();
  if (pathname.startsWith('/tau-zoho-agent')) return null;
  return <LanguageToggle />;
}
