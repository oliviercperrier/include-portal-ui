import { AxiosError } from "axios";

export const handleApiReponse = <T>(
  error: AxiosError | undefined,
  data: T,
  reject: (error: string) => any,
  callback?: () => void
): T => {
  if (error) {
    return reject(error?.message);
  }

  if (callback) {
    callback();
  }

  return data;
};
