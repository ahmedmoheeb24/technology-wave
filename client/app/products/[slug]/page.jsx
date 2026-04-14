import ProductDetailClient from './ProductDetailClient.jsx'

// Force the page to use Cloudflare's Edge runtime
export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export default async function Page({ params }) {
  // In Next.js 15+, params is a Promise that must be awaited
  const resolvedParams = await params
  return <ProductDetailClient params={resolvedParams} />
}