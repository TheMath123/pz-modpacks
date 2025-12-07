export function makeRequestQuery(
  value?: Partial<Record<string, string>> | string,
) {
  if (typeof value === 'string') {
    const searchParams = new URLSearchParams(value)
    return `?${searchParams.toString()}`
  }

  const searchParams = new URLSearchParams()
  if (value) {
    for (const [key, val] of Object.entries(value)) {
      if (val !== undefined) {
        searchParams.append(key, val)
      }
    }
  }

  return `?${searchParams.toString()}`
}
