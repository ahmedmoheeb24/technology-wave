import ServiceDetailClient from './ServiceDetailClient'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/`)
    const services = await res.json()
    return services.map((service) => ({
      slug: service.slug,
    }))
  } catch (error) {
    return []
  }
}

export default function Page({ params }) {
  return <ServiceDetailClient params={params} />
}