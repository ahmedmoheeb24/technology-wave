export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/`)
    const products = await res.json()
    return products.map((product) => ({ slug: product.slug }))
  } catch (error) {
    return [{ slug: 'placeholder' }]  // ← change [] to this
  }
}