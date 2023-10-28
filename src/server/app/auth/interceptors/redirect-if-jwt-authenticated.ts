import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as passport from 'passport';

@Injectable()
export class RedirectIfJwtAuthenticatedInterceptor implements NestInterceptor {
  constructor(private readonly redirectPath: string) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();

    return new Observable((observer) => {
      passport.authenticate(
        'jwt',
        { session: false, failWithError: true },
        (err, user, info) => {
          if (err) {
            observer.error(err);
            return;
          }
          if (user) {
            response.redirect(this.redirectPath);
            observer.next(true); // Emit a value
            observer.complete();
            return;
          }
          // If authentication failed or no user, just continue the request-response cycle.
          next.handle().subscribe(
            (data) => observer.next(data),
            (err) => observer.error(err),
            () => observer.complete(),
          );
        },
      )(request, response);
    });
  }
}
