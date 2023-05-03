import { HttpInterceptor, HttpRequest , HttpHandler,HttpEvent, HttpEventType} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
export class AuthInterceptors implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        console.log('Request is on way');
        const modifiedHeader = req.clone({headers : req.headers.append('Auth','xyz')})
        return next.handle(modifiedHeader).pipe(tap(event =>{
    if(event.type === HttpEventType.Response){
        console.log(event.body);
    }
        }));
    }
}