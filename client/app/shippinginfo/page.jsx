export const runtime = 'edge';

const ShippingInfo = () => {
  return (
    <div className="max-w-4xl mx-auto p-10 text-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 font-Ovo">Shipping & Logistics</h1>
      
      <div className="space-y-8 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-blue-600">1. Global Logistics Hub</h2>
          <p>
            We manage global shipments of aviation assets from our Karachi operations 
            center. We specialize in AOG (Aircraft on Ground) logistics, ensuring 
            critical components reach their destination via priority aerospace couriers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-blue-600">2. Customs & Compliance</h2>
          <p>
            Recipients are responsible for all local import duties and taxes. 
            Technology Wave provides all necessary export documentation and 
            commercial invoices to facilitate smooth customs clearance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-blue-600">3. Hazmat Shipping</h2>
          <p>
            Shipping for hazardous materials (batteries, oxygen cylinders) is 
            subject to IATA Dangerous Goods Regulations and may require extended 
            handling times and specialized surcharges.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingInfo;