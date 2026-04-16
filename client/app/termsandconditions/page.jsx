const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      <p className="mb-4 text-sm text-gray-600">Last Updated: April 2026</p>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Professional Services</h2>
        <p>
          Technology Wave provides aviation technical and airworthiness consultancy. All advice 
          and documentation provided are aligned with ICAO, EASA, and FAA frameworks. However, 
          final compliance responsibility rests with the Operator or MRO's Quality Department.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. Intellectual Property</h2>
        <p>
          All technical organizational designs, gap analysis reports, and proprietary manuals 
          provided remain the intellectual property of Technology Wave until full payment is received.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Limitation of Liability</h2>
        <p>
          Technology Wave shall not be liable for indirect, incidental, or consequential damages 
          resulting from the use of technical data or parts once they have been accepted and 
          certified by the customer's authorized personnel.
        </p>
      </section>
    </div>
  );
};