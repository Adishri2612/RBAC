import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/general')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /dashboard/general!'
}
