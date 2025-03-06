export interface IComponent {
  name: string
  resources: IResource[]
}

interface IResource {
  name: string
  enabled: boolean
  writeable: boolean
  cacheDisabled: boolean
}