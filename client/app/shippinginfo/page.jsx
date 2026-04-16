const ShippingInfo = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Shipping & Logistics</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Global Logistics</h2>
        <p>
          We ship aviation components worldwide from our Karachi hub. We utilize 
          specialized aerospace couriers to ensure the safe handling of sensitive 
          avionics and engine parts (GE CF6, CFM56, PW4000).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. Customs and Duties</h2>
        <p>
          International customers are responsible for all import duties, taxes, and 
          customs clearance fees in their respective countries. We provide full 
          commercial invoices and packing lists to facilitate smooth clearance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Dangerous Goods (Hazmat)</h2>
        <p>
          Certain aircraft parts (e.g., oxygen bottles, fire extinguishers, batteries) 
          are classified as Dangerous Goods. These items require specialized packaging 
          and may incur additional shipping surcharges.
        </p>
      </section>
    </div>
  );
};