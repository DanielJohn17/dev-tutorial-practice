export type SuccessResponse<T = void> = {
  success: true;
  message: string;
  data: T extends void ? {} : T;
} & (T extends void ? {} : { data: T });

export type ErrorResponse = {
  success: false;
  error: string;
  isFormError?: boolean;
};
