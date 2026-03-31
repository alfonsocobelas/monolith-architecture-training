/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { BaseCustomError } from 'src/common/errors'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    // Only handle HttpExceptions, for other exceptions return a generic 500 error
    if (exception instanceof HttpException) {
      return response.status(exception.getStatus()).json(exception.getResponse())
    }

    if (exception instanceof BaseCustomError) {
      return response.status(exception.getStatus()).json(exception.getResponse())
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      name: 'InternalServerError',
      message: 'An unexpected error occurred'
    })
  }
}
