import type { ErrorCode } from './constants/errors'

export class AppError extends Error {
	constructor(
		message: string,
		public code?: ErrorCode
	) {
		super(message)
		this.name = this.constructor.name
	}
}

export class ConflictError extends AppError {
	constructor(message: string, code?: ErrorCode) {
		super(message, code)
	}
}

export class NotFoundError extends AppError {
	constructor(message: string, code?: ErrorCode) {
		super(message, code)
	}
}

export class InternalServerError extends AppError {
	constructor(message: string, code?: ErrorCode) {
		super(message, code)
	}
}

export class ServiceError extends Error {
	constructor(name: string, message: string, _error?: string) {
		super(message)
		this.name = `Service: ${name}`
	}
}
