export interface IResources {
  component: string
  resources: IResource[]
}

interface IResource {
  name: string
  enabled: boolean
  writeable: boolean
  cacheDisabled: boolean
}