import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@org/design-system/components/ui/dialog'
import type { IModDTO } from '@/services/mod/dtos'

export function ModDetail({ data }: { data: IModDTO }) {
  console.log(data)
  return (
    <Dialog>
      <DialogTrigger className="hover:underline">More Info</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mod {data.name}</DialogTitle>
        </DialogHeader>

        <article className="flex flex-col gap-2">
          {data.description?.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-2">
              {paragraph}
            </p>
          ))}
        </article>
      </DialogContent>
    </Dialog>
  )
}
