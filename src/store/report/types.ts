// export interface ReportState {
//   isLoading: boolean;
//   error?: Error | null;
//   message?: Message | null;
// }
//
export type Message = {
  content: string;
  duration: number;
  type: MessageType
};

export enum MessageType {
  INFO = 'info',
  WARN = 'warning',
  LOADING = 'loading',
}

export type initialState = {
  isLoading: boolean;
  error?: Error | null;
  message?: Message | null;
};