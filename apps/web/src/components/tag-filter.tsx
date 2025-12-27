import { CheckIcon, X, XIcon } from '@org/design-system/components/ui/icons'
import { cn } from '@org/design-system/lib/utils'
import { formatHex, oklch, wcagContrast } from 'culori'
import { useTags } from '@/hooks/mod/use-tags'
import { type PaginationFilters, useFilters } from '@/hooks/use-filters'

interface FilterWithTags extends PaginationFilters {
  tags?: string
}

const stringToColor = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash % 360)
  // Use OKLCH for better perceptual uniformity
  // Lightness 0.65, Chroma 0.18 gives nice vibrant but not neon colors
  const color = oklch({ mode: 'oklch', l: 0.65, c: 0.18, h: hue })
  return formatHex(color) || '#888888'
}

const getContrastColor = (bgColorHex: string) => {
  const black = '#000000'
  const white = '#ffffff'
  const contrastBlack = wcagContrast(bgColorHex, black)
  const contrastWhite = wcagContrast(bgColorHex, white)
  return contrastBlack > contrastWhite ? black : white
}

export function TagFilter() {
  const { data: tags } = useTags()
  const { filters, setFilters } = useFilters<FilterWithTags>()

  const selectedTags = filters.tags ? filters.tags.split(',') : []

  const toggleTag = (tagId: string) => {
    let newTags: string[]
    if (selectedTags.includes(tagId)) {
      newTags = selectedTags.filter((t) => t !== tagId)
    } else {
      newTags = [...selectedTags, tagId]
    }

    setFilters({
      tags: newTags.length > 0 ? newTags.join(',') : undefined,
      page: 1,
    })
  }

  const clearTags = () => {
    setFilters({
      tags: undefined,
      page: 1,
    })
  }

  if (!tags) return null

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag.id)
        const color = stringToColor(tag.name)
        const textColor = getContrastColor(color)

        return (
          <button
            type="button"
            key={tag.id}
            className={cn(
              'inline-flex items-center gap-1',
              'cursor-pointer transition-all hover:opacity-90 hover:shadow-md',
              'px-2 py-1 rounded-md text-sm font-medium shadow-sm opacity-75',
              isSelected ? 'ring-2 ring-border opacity-100 shadow-md' : '',
            )}
            aria-label={`Toggle tag ${tag.name}`}
            title={`Toggle tag ${tag.name}`}
            onClick={() => toggleTag(tag.id)}
            style={{
              backgroundColor: color,
              color: textColor,
              borderColor: color,
            }}
          >
            {isSelected && <CheckIcon className="w-4 h-4" weight="bold" />}
            {tag.name}
          </button>
        )
      })}
      {selectedTags.length > 0 && (
        <button
          type="button"
          className={cn(
            'cursor-pointer transition-all hover:shadow-md border-2 border-border',
            'px-2 py-1 rounded-md text-sm font-medium shadow-sm',
            'bg-background text-foreground flex items-center gap-1',
          )}
          onClick={clearTags}
          aria-label="Clear all tags"
          title="Clear all tags"
        >
          <XIcon className="w-4 h-4" weight="bold" />
          Clear
        </button>
      )}
    </div>
  )
}
