import { ZohoModule } from '@/types/zoho-check';

// Known default Zoho CRM modules
const KNOWN_DEFAULTS = new Set([
  'Leads', 'Contacts', 'Accounts', 'Deals', 'Tasks', 'Events', 'Calls',
  'Products', 'Vendors', 'Cases', 'Solutions', 'Campaigns', 'Reports',
  'Analytics', 'Dashboards', 'Forecasts', 'Predictions', 'Activities',
  'Notes', 'Attachments', 'SalesInbox', 'Documents', 'users', 'Approvals',
  'Home', 'Feeds', 'Orchestration', 'CommandCenter', 'PriceBooks', 'Quotes',
  'Sales_Orders', 'Purchase_Orders', 'Invoices', 'Visits', 'Services', 'Projects'
]);

// German display name to default module mappings
const GERMAN_NAME_MAP: Record<string, string> = {
  'Leads': 'Leads', 'Interessenten': 'Leads', 'Kontakte': 'Contacts',
  'Konten': 'Accounts', 'Kunden': 'Accounts', 'Unternehmen': 'Accounts',
  'Geschäfte': 'Deals', 'Angebote (CRM)': 'Deals', 'Aufgaben': 'Tasks',
  'Veranstaltungen': 'Events', 'Anrufe': 'Calls', 'Produkte': 'Products',
  'Lieferanten': 'Vendors', 'Fälle': 'Cases', 'Lösungen': 'Solutions',
  'Kampagnen': 'Campaigns', 'Berichte': 'Reports', 'Angebote': 'Quotes',
  'Rechnungen': 'Invoices', 'Besuche': 'Visits', 'Dienste': 'Services',
  'Projekte': 'Projects', 'Dokumente': 'Documents', 'Genehmigungen': 'Approvals',
  'Aktivitäten': 'Activities', 'Notizen': 'Notes', 'Anhänge': 'Attachments',
};

// Known Zoho integrations
const KNOWN_INTEGRATIONS = new Set(['Desk', 'Google_AdWords', 'Zoho_Books']);

export function classifyModule(displayName: string, apiName: string): ZohoModule['type'] {
  // Check for Zoho integration patterns
  if (apiName.includes('__')) return 'integration';
  if (apiName === 'Zoho_Books') return 'integration';
  if (KNOWN_INTEGRATIONS.has(apiName)) return 'integration';

  // Check if it's a known default
  if (KNOWN_DEFAULTS.has(apiName)) return 'default';

  // Check German display names
  const mappedApi = GERMAN_NAME_MAP[displayName];
  if (mappedApi && KNOWN_DEFAULTS.has(mappedApi)) return 'default';

  return 'custom';
}

export function parseModuleList(rawText: string): ZohoModule[] {
  const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const modules: ZohoModule[] = [];

  // Try to find where the actual module data starts
  // Zoho CRM module table often has headers like "In den Registerkarten angezeigt als" / "API-Name"
  let startIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('API-Name') || lines[i].includes('API Name')) {
      startIndex = i + 1;
      break;
    }
  }

  const dataLines = lines.slice(startIndex);

  for (const line of dataLines) {
    // Stop at footer markers
    if (line.includes('Rückmeldung') || line.includes('Smartchat') || line.includes('Feedback')) break;

    // Try to split by tab or multiple spaces
    const parts = line.split(/\t+|\s{2,}/).map(p => p.trim()).filter(p => p.length > 0);

    if (parts.length >= 2) {
      const displayName = parts[0];
      const apiName = parts[1];
      // Filter out header-like rows
      if (displayName && apiName && apiName !== 'API-Name' && !displayName.startsWith('In den')) {
        modules.push({
          display_name: displayName,
          api_name: apiName,
          type: classifyModule(displayName, apiName),
        });
      }
    } else if (parts.length === 1) {
      // Single column - might be display name = api name
      const name = parts[0];
      if (name && name !== 'API-Name' && !name.startsWith('In den') && name.length > 1) {
        modules.push({
          display_name: name,
          api_name: name,
          type: classifyModule(name, name),
        });
      }
    }
  }

  return modules;
}

export function buildModuleAnalysisText(modules: ZohoModule[]): string {
  const defaults = modules.filter(m => m.type === 'default');
  const integrations = modules.filter(m => m.type === 'integration');
  const custom = modules.filter(m => m.type === 'custom');

  let text = `DEFAULT-MODULE (${defaults.length}):\n`;
  text += defaults.map(m => `  - ${m.display_name} (${m.api_name})`).join('\n');
  text += `\n\nINTEGRATIONS-MODULE (${integrations.length}):\n`;
  text += integrations.map(m => `  - ${m.display_name} (${m.api_name})`).join('\n');
  text += `\n\nCUSTOM-MODULE (${custom.length}):\n`;
  text += custom.map(m => `  - ${m.display_name} (${m.api_name})`).join('\n');

  return text;
}
