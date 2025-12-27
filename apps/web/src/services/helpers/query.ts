export function makeRequestQuery(
  value?: Partial<Record<string, string | number | boolean>> | string,
) {
  if (typeof value === 'string') {
    const searchParams = new URLSearchParams(value)
    return `?${searchParams.toString()}`
  }

  const searchParams = new URLSearchParams()
  if (value) {
    for (const [key, val] of Object.entries(value)) {
      if (val !== undefined) {
        // If the value contains a comma, we should encode it properly
        // But URLSearchParams handles encoding automatically.
        // The issue might be that some backends treat comma as multiple values
        // if not encoded, or vice versa.
        // However, we want to send it as a single string.
        searchParams.append(key, String(val))
      }
    }
  }

  return `?${searchParams.toString()}`
}
