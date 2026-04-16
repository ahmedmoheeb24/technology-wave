export const runtime = 'edge';

const ReturnPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-10 text-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 font-Ovo">Return & Refund Policy</h1>
      
      <div className="space-y-8 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-blue-600">1. Parts Traceability</h2>
          <p>
            Due to aviation safety regulations, any part returned must include its 
            original **EASA Form 1** or **FAA 8130-3** documentation. Parts returned 
            without original certification cannot be processed for refund.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-blue-600">2. Return Window</h2>
          <p>
            Standard components may be returned within 15 days of receipt if the 
            original OEM packaging remains sealed. A 25% restocking fee applies 
            to all authorized returns.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-blue-600">3. Non-Returnable Items</h2>
          <p>
            Custom-ordered parts, hazardous materials, and technical consultancy 
            services are non-refundable once the procurement or service process 
            has initiated.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ReturnPolicy;