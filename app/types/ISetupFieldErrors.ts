export interface ISetupFieldErrors {
  version: boolean
  organisations: boolean
  components: boolean
}

export const initialSetupFieldErrors = {
  version: false,
  organisations: false,
  components: false
}