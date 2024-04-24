# Lokale Einrichtung

## Technologien

Das Portal nutzt folgenden Technologien, die man bereits beherrschen sollte.
- Web-Framework: [React.js](https://react.dev/)
- Styling-Framework: [Tailwindcss](https://tailwindcss.com/)
- Backend: [PocketBase](https://pocketbase.io/)

## Voraussetzungen

Für die Weiterentwicklung wird lediglich [Node.js](https://nodejs.org/en/download), inklusive `pnpm` benötigt.
Der Package-Manager `pnpm` kann so installiert werden: 
```bash
npm install -g pnpm
```

## Applikation installieren

Zuerst holen wir die Applikation von GitHub:

```bash
git clone https://github.com/lo-bzwu/portal
```

Danach installieren wir die Dependencies mit pnpm:

```bash
pnpm install
```

Die Applikation kann dann im Entwicklungsmodus gestartet werden:

```bash
pnpm dev
```