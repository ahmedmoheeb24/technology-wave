const ReturnPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Return & Refund Policy</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Parts and Components</h2>
        <p>
          Returns are accepted within 15 days of delivery only if the part remains in its 
          original, unopened packaging. Any part where the <strong>OEM seal</strong> is broken 
          cannot be returned due to airworthiness certification integrity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. Certification and Documentation</h2>
        <p>
          A 25% restocking fee applies to all returned parts. Parts returned without their 
          original Traceability documentation (e.g., FAA 8130-3 or EASA Form 1) will be rejected.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Technical Services</h2>
        <p>
          Consultancy fees and technical audit services are non-refundable once the 
          on-site or remote work has commenced.
        </p>
      </section>
    </div>
  );
};