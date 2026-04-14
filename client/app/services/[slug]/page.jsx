import ServiceDetailClient from './ServiceDetailClient'

// Cloudflare Workers necessity
export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export default async function Page({ params }) {
  // We await the params here on the server
  const resolvedParams = await params
  
  // Pass the already-resolved object to the client
  return <ServiceDetailClient params={resolvedParams} />
}