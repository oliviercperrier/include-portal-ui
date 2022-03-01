import { ArgsProps as NotificationArgsProps } from 'antd/lib/notification';
import { ArgsProps as MessageArgsProps } from 'antd/lib/message';

export type initialState = {
  lang: string;
  notification: NotificationArgsProps | undefined;
  message: MessageArgsProps | undefined;
  messagesToDestroy: string[];
};
