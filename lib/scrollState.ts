/**
 * Shared scroll mode state — module-level (no React, no re-renders).
 * HorizontalScrollSection sets this to true when it's controlling wheel events.
 * SmoothScrollProvider reads this and backs off while horizontal is active.
 */
export const scrollState = {
  horizontalActive: true, // starts true; site opens in horizontal mode
  lightboxOpen: false,    // tracks if a lightbox modal is currently open
};
