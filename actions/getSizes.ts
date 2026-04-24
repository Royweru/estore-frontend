import { SERVER_API_BASE_URL } from '@/lib/api'
import { mapApiSize } from '@/lib/mappers'

export const GetSizes = async () => {
  try {
    const response = await fetch(`${SERVER_API_BASE_URL}/catalog/sizes`, {
      next: {
        revalidate: 60,
      },
    })

    if (!response.ok) {
      return []
    }

    const payload = await response.json()
    return (payload || []).map((item: any) => mapApiSize(item))
  } catch (error) {
    console.error("Error fetching sizes" + error)
    return []
  }
}
