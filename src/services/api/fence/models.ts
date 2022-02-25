export interface IFenceAuthPayload {
  authenticated: boolean;
  expiration?: number;
}

export interface IFenceInfo {
  token_uri: string;
  scope: string;
  redirect_uri: string;
  client_id: string;
  proxy_uri: string;
}

export interface IFenceExchange {
  expiration: number;
}
