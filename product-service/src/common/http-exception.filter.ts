import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const body = exception.getResponse();
    let message: string = exception.message;
    let details: unknown = null;
    let code: string = this.mapStatusToCode(status);

    if (typeof body === 'string') {
      message = body;
    } else if (typeof body === 'object' && body !== null) {
      const obj = body as Record<string, unknown>;
      const maybeCode = obj['code'];
      const maybeMessage = obj['message'];
      if (typeof maybeCode === 'string') code = maybeCode;
      if (typeof maybeMessage === 'string') message = maybeMessage;
      details = obj['details'] ?? null;
    }

    res.status(status).json({ code, message, details });
  }

  private mapStatusToCode(status: number): string {
    switch (status) {
      case 400:
        return 'VALIDATION_ERROR';
      case 404:
        return 'NOT_FOUND';
      case 409:
        return 'CONFLICT';
      case 502:
      case 503:
      case 504:
        return 'UPSTREAM_UNAVAILABLE';
      default:
        return 'ERROR';
    }
  }
}
