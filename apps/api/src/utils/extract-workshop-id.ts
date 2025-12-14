export function extractWorkshopId(input: string): string | null {
  if (/^\d+$/.test(input)) return input
  try {
    const url = new URL(input)
    return url.searchParams.get('id')
  } catch {
    const match = input.match(/id=(\d+)/)
    return match ? match[1] : null
  }
}
