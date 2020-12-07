import {
 HttpEvent,
 HttpInterceptor,
 HttpHandler,
 HttpRequest,
 HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

 /* #region  constructor */
 constructor() { }
 /* #endregion */

 /* #region  intercept */
 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   return next.handle(request)
     .pipe(
       retry(1),
       catchError((error: HttpErrorResponse) => {
         let errorMessage = '';
         if (error.error instanceof ErrorEvent) {
           // client-side error
           errorMessage = `Pogreška: ${error.error.message}`;
         } else {
           // server-side error - ovo moramo standardizirati
            errorMessage = "Došlo je do pogreške, molimo kontaktirajte administratora";
         }
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Upsss...',
        //   text: errorMessage,
        //   customClass: {
        //     confirmButton: "d-flex"
        //   },
        //   confirmButtonText:
        //    '<i class="material-icons mr-2">mood_bad</i> U redu',
        //    showClass: {
        //       popup: 'animate__animated animate__fadeInDown'
        //     },
        //     hideClass: {
        //       popup: 'animate__animated animate__fadeOutUp'
        //     },
        //    heightAuto: false
        // })
         return throwError(errorMessage);
       })
     )
 }
 /* #endregion */
}
