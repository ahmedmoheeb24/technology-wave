"use client";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      {/* This layout wraps admin pages and prevents the navbar/footer from showing */}
      <style jsx global>{`
        body:has(.admin-layout) .site-navbar,
        body:has(.admin-layout) footer {
          display: none !important;
        }
        body:has(.admin-layout) main {
          padding-top: 0 !important;
        }
      `}</style>
      {children}
    </div>
  );
}
