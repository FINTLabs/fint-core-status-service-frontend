export interface IComponent {
  name: string
  resources: IResource[]
}

export interface IResource {
  name: string
  enabled: boolean
  writeable: boolean
  cacheDisabled: boolean
}