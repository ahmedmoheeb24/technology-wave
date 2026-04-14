import ServiceDetailClient from './ServiceDetailClient.jsx'

// Force Cloudflare to handle this route dynamically at the Edge
export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export default async function Page({ params }) {
  // Await the params (Required for Next.js 15/16)
  const resolvedParams = await params
  return <ServiceDetailClient params={resolvedParams} />
}