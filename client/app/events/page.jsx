export const metadata = {
  title: "Events - Technology Wave",
  description: "Stay updated with Technology Wave's latest events, conferences, and industry participation.",
};

export default function EventsPage() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Events</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Join us at industry events, conferences, and exhibitions
          </p>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-blue-50 rounded-2xl p-12 mb-8">
              <svg className="w-24 h-24 text-[#0066CC] mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Events Coming Soon</h2>
              <p className="text-lg text-gray-600 mb-8">
                We're currently updating our events calendar. Check back soon for information about upcoming industry events, trade shows, and Technology Wave participation.
              </p>
              <a
                href="tel:+447488321411"
                className="inline-flex items-center bg-[#0066CC] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-[#0052A3] hover:shadow-lg hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact Us for More Info
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
