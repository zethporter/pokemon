import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/types')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/types"!</div>
}
