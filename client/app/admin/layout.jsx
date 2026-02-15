"use client";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      {/* This layout wraps admin pages and prevents the navbar/footer from showing */}
      <style jsx global>{`
        .admin-layout ~ header,
        .admin-layout ~ footer {
          display: none !important;
        }
        body:has(.admin-layout) header,
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
