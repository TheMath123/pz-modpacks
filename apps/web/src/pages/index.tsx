import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from './home-page'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  head: async () => ({
    meta: [
      { title: 'PZ Packs' },
      {
        name: 'description',
        content:
          'Project Zomboid modpack platform. Discover, create, and share modpacks with ease!',
      },
    ],
  }),
})

function RouteComponent() {
  return <HomePage />
}
