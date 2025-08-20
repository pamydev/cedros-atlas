export interface IApi<T> {
  success: boolean;
  data?: Array<T>;
  error?: string;
}
