import { Toaster } from '@org/design-system/components/ui/sonner'
import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import * as React from 'react'
import { AppHeader } from '@/components/header'
import { ReactQueryProvider } from '@/lib/react-query'
import { NotFoundPage } from './-components/not-found-page'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
})

function RootComponent() {
  return (
    <React.Fragment>
      <HeadContent />
      <ReactQueryProvider>
        <Toaster position="bottom-center" />
        <AppHeader />
        <Outlet />
      </ReactQueryProvider>
    </React.Fragment>
  )
}
