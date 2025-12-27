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
        searchParams.append(key, String(val))
      }
    }
  }

  return `?${searchParams.toString()}`
}
