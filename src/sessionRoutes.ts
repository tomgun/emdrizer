/**
 * Session URL routes: /session, /session/kitt, /session/finger, /session/sweeping-dot
 * Uses pathname (with base) so URLs like https://example.com/emdrizer/session/kitt work.
 * Hash fallback: #session/kitt for environments where pathname isn't updated.
 */

import type { ViewType } from './App'

const BASE = import.meta.env.BASE_URL

/** Path without leading/trailing slashes, relative to base */
function getPathFromPathname(): string {
  const pathname = window.location.pathname
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE
  const withoutBase = base ? pathname.replace(new RegExp(`^${base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`), '') : pathname
  return withoutBase.replace(/^\/+|\/+$/g, '') || ''
}

/** Path from hash (#session/kitt → session/kitt) */
function getPathFromHash(): string {
  const hash = window.location.hash
  return hash ? hash.slice(1).replace(/^\/+|\/+$/g, '') : ''
}

/** Get session path: pathname first (for /session/kitt), then hash (#session/kitt) */
export function getSessionPath(): string | null {
  const fromPath = getPathFromPathname()
  if (fromPath === 'session' || fromPath.startsWith('session/')) return fromPath
  const fromHash = getPathFromHash()
  if (fromHash === 'session' || fromHash.startsWith('session/')) return fromHash
  return null
}

/** Parse view from session path: session/kitt → kitt */
export function getViewFromSessionPath(path: string): ViewType {
  const segment = path.split('/')[1]
  if (segment === 'kitt' || segment === 'finger' || segment === 'sweeping-dot') return segment
  return 'sweeping-dot'
}

/** Update URL to session with view (pathname; requires 404.html on GitHub Pages for refresh) */
export function pushSessionUrl(view: ViewType): void {
  const base = BASE.endsWith('/') ? BASE : BASE + '/'
  const url = `${base}session/${view}`
  window.history.pushState({ session: view }, '', url)
}

/** Update URL to main (clear session from URL) */
export function pushMainUrl(): void {
  const base = BASE.endsWith('/') ? BASE : BASE + '/'
  const url = base === '/' ? '/' : base.replace(/\/$/, '')
  window.history.pushState({}, '', url)
}
