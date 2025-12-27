import { useQuery } from '@tanstack/react-query'
import { ModService } from '@/services/mod'

export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: ModService.listTags,
  })
}
