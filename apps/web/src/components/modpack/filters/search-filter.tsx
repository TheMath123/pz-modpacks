import { Input } from '@org/design-system/components/ui/input'
import { useEffect, useState } from 'react'

interface SearchFilterProps {
  onSearchChange: (search: string | undefined) => void
  value?: string
  debounceTime?: number
}

export function SearchFilter({
  onSearchChange,
  value = '',
  debounceTime = 500,
}: SearchFilterProps) {
  const [search, setSearch] = useState(value)

  useEffect(() => {
    setSearch(value)
  }, [value])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== value) {
        onSearchChange(search || undefined)
      }
    }, debounceTime)

    return () => clearTimeout(timer)
  }, [search, debounceTime, onSearchChange, value])

  return (
    <div className="flex-1">
      <Input
        type="text"
        placeholder="Search modpacks name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}
