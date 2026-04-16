export const runtime = 'edge';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-10 text-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 font-Ovo">Terms & Conditions</h1>
      <p className="mb-4 text-sm text-gray-500">Effective Date: April 2026</p>
      
      <div className="space-y-8 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-blue-600">1. Services Provided</h2>
          <p>
            Technology Wave provides aviation consultancy and technical parts procurement. 
            All consultancy services are performed in accordance with ICAO and EASA 
            standards. Users agree that technical data provided is for information 
            purposes and must be verified by the operator's quality system.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-blue-600">2. Limitation of Liability</h2>
          <p>
            Technology Wave shall not be liable for any operational delays or 
            consequential damages resulting from the use of procured parts or 
            technical advice once certified by the end-user's authorized personnel.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-blue-600">3. Governing Law</h2>
          <p>
            These terms are governed by the laws of the jurisdiction in which 
            Technology Wave operates, without regard to conflict of law principles.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;