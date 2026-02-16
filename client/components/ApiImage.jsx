'use client';

/**
 * Renders images from the API (uploads). Uses native <img> so they load
 * regardless of Next.js image domain config.
 */
function getApiBase() {
  if (typeof window !== 'undefined') return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
}

export default function ApiImage({ src, alt = '', className, fill, sizes, ...props }) {
  if (!src || typeof src !== 'string') return null;
  const API_BASE = getApiBase();
  const path = src.startsWith('http') ? src : `${API_BASE}${src.startsWith('/') ? '' : '/'}${src}`;
  const style = fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' } : undefined;

  return (
    <img
      src={path}
      alt={alt}
      className={className}
      style={style}
      sizes={sizes}
      loading={props.loading ?? 'lazy'}
      {...props}
    />
  );
}
