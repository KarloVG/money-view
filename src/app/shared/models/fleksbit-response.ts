import { HttpErrorResponse } from '@angular/common/http';
export interface IFleksbitResponse<T> {
  code: number;
  error: HttpErrorResponse | null;
  response: T;
}
