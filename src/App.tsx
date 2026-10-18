import { DesktopScriptsTab } from './components/DesktopScriptsTab';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(ellipse_at_50%_-20%,_rgba(16,185,129,0.08),_transparent_55%)] bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <span className="text-base font-bold tracking-tight text-white">Transluxion</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-[11px] font-medium text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Desktop utilities
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <DesktopScriptsTab />
      </main>

      <footer className="border-t border-slate-800/70 bg-slate-950/70 py-5 text-xs text-slate-500">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <span className="font-semibold tracking-wide text-slate-300">Transluxion</span>
          <span className="font-mono text-[11px]">© PFANO SINYELA 2026</span>
        </div>
      </footer>
    </div>
  );
}
