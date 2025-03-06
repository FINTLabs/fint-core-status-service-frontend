export interface IResources {
  component: string
  resources: IResources[]
}

interface IResource {
  name: string
  enabled: boolean
  writeable: boolean
  cacheDisabled: boolean
}