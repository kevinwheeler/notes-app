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
          if (user) {
            response.redirect(this.redirectPath);
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
      )(request, response, (err) => {
        // Important: Add these arguments to make passport work correctly.
        if (err) {
          observer.error(err);
          return;
        }
        // Continue processing if passport doesn't authenticate.
        next.handle().subscribe(
          (data) => observer.next(data),
          (err) => observer.error(err),
          () => observer.complete(),
        );
      });
    });
  }
}
