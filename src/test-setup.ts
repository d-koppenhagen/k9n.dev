/**
 * Global test setup executed before each test file.
 *
 * jsdom (used by Vitest) does not implement a number of browser APIs that
 * Angular relies on at runtime. We polyfill/stub the missing pieces here so
 * component tests don't emit "not defined" / "not implemented" noise.
 */

// --- IntersectionObserver -------------------------------------------------
// Angular's `@defer` viewport triggers and other viewport-aware features call
// `new IntersectionObserver(...)`. jsdom does not provide it.
if (typeof globalThis.IntersectionObserver === 'undefined') {
  globalThis.IntersectionObserver = vi.fn().mockImplementation(
    class {
      readonly root: Element | Document | null = null;
      readonly rootMargin: string = '';
      readonly scrollMargin: string = '';
      readonly thresholds: readonly number[] = [];
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      takeRecords = vi.fn(() => []);

      constructor(_callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        this.root = options?.root instanceof Element ? options.root : null;
        this.rootMargin = options?.rootMargin ?? '';
        this.thresholds = Array.isArray(options?.threshold)
          ? options.threshold
          : [options?.threshold ?? 0];
      }
    },
  ) as unknown as typeof IntersectionObserver;
}

// --- ResizeObserver -------------------------------------------------------
// Not implemented by jsdom either; harmless to provide a no-op.
if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = vi.fn().mockImplementation(
    class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    },
  ) as unknown as typeof ResizeObserver;
}

// --- HTMLCanvasElement.getContext ----------------------------------------
// jsdom logs "Not implemented: HTMLCanvasElement's getContext()" whenever a
// component (e.g. mermaid diagrams) touches the canvas API. Return null so the
// code path is a graceful no-op instead of throwing/logging.
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = vi.fn(
    () => null,
  ) as unknown as HTMLCanvasElement['getContext'];
}
