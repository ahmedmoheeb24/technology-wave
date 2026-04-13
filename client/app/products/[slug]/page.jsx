import ProductDetailClient from './ProductDetailClient.jsx'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/`)
    const products = await res.json()
    return products.map((product) => ({ slug: product.slug }))
  } catch (error) {
    return [{ slug: 'placeholder' }]
  }
}

export default function Page({ params }) {
  return <ProductDetailClient params={params} />
}