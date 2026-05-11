In den Ordner von großen KI Projekten findest du einen agent ordner, in welchem du wichtigen Context für das Projekt findest. Beginne das start.md Dokument zu lesen und danach weiteren Context bei bedarf anzulesen.

Wenn du Änderungen am System vornimmst dokumentiere diese bitte über die Dateien im agent Ordner, aktualsiere Dateien wo nötig und entferne Implementierungsanleitungen.

## Playwright MCP

Wenn du den Playwright MCP-Server verwendest, um ein neues Feature visuell zu prüfen, schließe danach immer die geöffnete Seite (`mcp__playwright__browser_close`), sobald die Prüfung abgeschlossen ist. So bleiben keine offenen Browser-Sessions zurück.