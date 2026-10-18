import React from 'react';
import { ArrowDownToLine, Clock3, Laptop, Monitor, ShieldCheck } from 'lucide-react';
import { DESKTOP_SCRIPTS } from '../utils/desktopScripts';

export const DesktopScriptsTab: React.FC = () => {
  const windowsApp = DESKTOP_SCRIPTS.find((app) => app.os === 'windows');
  const macApp = DESKTOP_SCRIPTS.find((app) => app.os === 'mac');

  return (
    <div className="mx-auto max-w-5xl space-y-10 sm:space-y-14">
      <section className="relative isolate overflow-hidden rounded-3xl border border-emerald-400/15 bg-slate-900 px-6 py-8 shadow-2xl shadow-black/20 sm:px-10 sm:py-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.17),_transparent_48%),linear-gradient(135deg,_rgba(15,23,42,0.2),_rgba(2,6,23,0.95))]" />
        <div className="absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full border border-emerald-300/10" />
        <div className="absolute -right-8 -top-12 -z-10 h-48 w-48 rounded-full border border-emerald-300/10" />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
              Desktop toolkit
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              Download
              <span className="block text-emerald-300">Transluxion Desktop App</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Choose your platform to get started. More platform downloads are on the way.
            </p>
          </div>

          <div className="flex shrink-0 gap-3">
            <div className="min-w-24 rounded-xl border border-white/10 bg-slate-950/45 px-4 py-3 text-center">
              <div className="text-lg font-semibold tracking-tight text-white">02</div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">Platforms</div>
            </div>
            <div className="min-w-24 rounded-xl border border-white/10 bg-slate-950/45 px-4 py-3 text-center">
              <div className="text-lg font-semibold tracking-tight text-white">01</div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">Available</div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="platform-heading" className="space-y-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">Choose your platform</p>
          <h2 id="platform-heading" className="mt-1 text-2xl font-semibold tracking-tight text-white">Get the right version</h2>
          <p className="mt-1 text-sm text-slate-400">Each download is clearly marked with its availability.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {windowsApp && (
            <article className="flex flex-col rounded-2xl border border-emerald-400/35 bg-emerald-400/[0.045] p-5 shadow-lg shadow-emerald-950/10 sm:p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-300">
                  <Monitor className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-white">Windows</h3>
                    <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-200">
                      Available
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{windowsApp.description}</p>
                </div>
              </div>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-5">
                <span className="text-xs text-slate-500">Windows 10 and 11</span>
                {windowsApp.packageUrl && (
                  <a
                    href={windowsApp.packageUrl}
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    <ArrowDownToLine className="h-4 w-4" />
                    Download app
                  </a>
                )}
              </div>
            </article>
          )}

          {macApp && (
            <article className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/75 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-300">
                  <Laptop className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-white">macOS</h3>
                    <span className="rounded-full border border-slate-700 bg-slate-950/70 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                      Coming soon
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{macApp.description}</p>
                </div>
              </div>
              <div className="mt-auto flex items-center gap-2 border-t border-slate-800/80 pt-5 text-xs text-slate-500">
                <Clock3 className="h-3.5 w-3.5" />
                Native macOS package is not ready yet
              </div>
            </article>
          )}
        </div>
      </section>

      <section aria-labelledby="preview-heading" className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/75">
        <div className="grid md:grid-cols-[1.2fr_0.8fr]">
          <figure className="flex min-h-64 items-center justify-center border-b border-slate-800 bg-[#070c16] p-4 md:border-b-0 md:border-r sm:p-6">
            <img
              src={`${import.meta.env.BASE_URL}images/transluxion-desktop-ui-concept.svg`}
              alt="Vector UI mockup of the Transluxion desktop app with an active status dial and pause button"
              loading="eager"
              decoding="sync"
              className="block max-h-[390px] w-full rounded-lg object-contain object-center"
            />
          </figure>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">App preview</p>
            <h2 id="preview-heading" className="mt-2 text-xl font-semibold tracking-tight text-white">A quick look at Transluxion</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              The Windows app has a live input countdown and a simple pause/resume control.
            </p>
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              <p className="text-xs leading-5 text-slate-400">
                It sends F15 keyboard input locally every 45 seconds. It does not read or verify Teams presence.
              </p>
            </div>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">UI mockup preview. The Windows app has the same overall layout; macOS version is coming soon.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
