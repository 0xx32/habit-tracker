import type { ErrorCode } from './constants/errors'

export class AppError extends Error {
	public statusCode: number

	constructor(
		message: string,
		statusCode: number,
		public code?: ErrorCode
	) {
		super(message)
		this.name = this.constructor.name
		this.statusCode = statusCode
	}
}

export class ConflictError extends AppError {
	constructor(message: string, code?: ErrorCode) {
		super(message, 400, code)
	}
}

export class NotFoundError extends AppError {
	constructor(message: string, code?: ErrorCode) {
		super(message, 404, code)
	}
}

export class InternalServerError extends AppError {
	constructor(message: string, code?: ErrorCode) {
		super(message, 500, code)
	}
}

export class ServiceError extends Error {
	constructor(name: string, message: string, _error?: string) {
		super(message)
		this.name = `Service: ${name}`
	}
}
