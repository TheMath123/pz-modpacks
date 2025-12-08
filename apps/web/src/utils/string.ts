export function getInitials(fullName: string): string {
  const names = fullName.trim().split(' ')
  const firstInitial = names[0][0].toUpperCase()

  if (names.length === 1) {
    return firstInitial
  }

  const lastInitial = names[names.length - 1][0].toUpperCase()
  return firstInitial + lastInitial
}

export function capitalize(value: string): string {
  if (!value || value.length <= 0) return ''

  const exceptions = ['da', 'das', 'de', 'do', 'dos', 'e']
  return value
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index === 0 || !exceptions.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1)
      }
      return word
    })
    .join(' ')
}
