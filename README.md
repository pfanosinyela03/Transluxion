# Transluxion

Transluxion is a React and Vite website for the Windows desktop app and a macOS app in preparation.

The website does not connect to Microsoft Teams or verify Teams presence. It offers the packaged Windows desktop application; it does not offer source-code files for download. The utility source files are kept separately in `scripts/` and are not included in the website's production bundle.

## Features

- Desktop utility descriptions and Windows/macOS filters
- Packaged Windows desktop application download
- macOS app listing while a native package is prepared and tested
- Desktop UI screenshot preview
- No user account or application database required

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. No API key or database is required.

## Validate and build

```sh
npm run lint
npm run build
```

The production site is generated in `dist/`.

## Deploy to GitHub Pages

The `.github/workflows/pages.yml` workflow builds the site and deploys it to GitHub Pages whenever changes are pushed to `main`. Vite uses `/transluxion/` as the production base path in GitHub Actions and the root path for local development.

After creating the `transluxion` repository:

1. Push this project to the repository's `main` branch.
2. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source if it is not selected automatically.
3. Confirm the workflow completes successfully. The project site will be published at `https://<github-username>.github.io/Transluxion/`.

The repository can stay private on an eligible paid GitHub plan, but the GitHub Pages website and anything deployed with it are public. On GitHub Free, GitHub Pages requires a public repository.

To use a custom domain later, add it under **Settings → Pages** and configure the DNS records at the domain registrar.

To publish a download, add a packaged application to `public/` and set its `packageUrl` in `src/utils/desktopScripts.ts`. Do not point it to a source-code file.

The current Windows app is a standalone executable built for Windows 10/11 and requires the .NET Framework 4.x runtime. It is unsigned, so Windows may show a SmartScreen warning. The app sends a virtual F15 keypress every 45 seconds while running; it does not read, set, or confirm Microsoft Teams status. Its app icon uses the same Transluxion T mark as the website.

To rebuild the Windows app and its icon on Windows:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\Build-WindowsApp.ps1
```

This regenerates `public/icon.ico` and `public/downloads/Transluxion.exe`.

The macOS app is not packaged yet. A native `.app` must be built and tested on macOS before a download can be published; no source-code download is provided.

## Microsoft and workplace notice

Transluxion is an independent project and is not affiliated with or endorsed by Microsoft. Follow your organization's policies before running desktop utilities.
