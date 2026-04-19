const FONT = 'Arial, Helvetica, sans-serif';

interface FooterLink { label: string; href: string; }

interface AgentFooterProps {
  brandSuffix: string;
  copyright: string;
  links: FooterLink[];
}

export default function AgentFooter({ brandSuffix, copyright, links }: AgentFooterProps) {
  return (
    <footer style={{
      backgroundColor: '#000', borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '2rem', fontFamily: FONT,
      display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
      gap: '1rem', maxWidth: 1200, margin: '0 auto',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
        <span style={{ fontWeight: 700, color: '#fff' }}>Tau Agent</span>
        <span>{brandSuffix}</span>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none', fontSize: 13 }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>{copyright}</div>
    </footer>
  );
}
