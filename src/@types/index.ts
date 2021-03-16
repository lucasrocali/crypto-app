export enum ConnectionStatus {
  CONNECTING = 'CONNECTING',
  OPEN = 'OPEN',
  CLOSING = 'CLOSING',
  CLOSED = 'CLOSED',
  UNINSTANTIATED = 'UNINSTANTIATED'
}

export type Dictionary = { [key: string]: number }

export type Order = {
  price: number
  size: number
  total: number
}