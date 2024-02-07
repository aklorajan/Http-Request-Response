import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req.headers.append('test', 'yes')
    console.log('on the way request')
    console.log(req.url)
    const modifiedReq = req.clone({
      headers: req.headers.append('auth', 'abc'),
      params: req.params.append('kkkkk', 'jjjj')
    })
    return next.handle(modifiedReq)
  }
}
