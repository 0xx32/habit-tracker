export const formatValidationErrors = (errors: readonly unknown[]) =>
	errors.map((err) => {
		const safeErr = err as {
			path?: string
			summary?: string
			message?: string
			value?: unknown
		}

		return {
			field: safeErr.path ? safeErr.path.replace(/^\//, '') : 'unknown',
			message: safeErr.summary || safeErr.message || 'Invalid value',
			value: safeErr.value,
		}
	})
