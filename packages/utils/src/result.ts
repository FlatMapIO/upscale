export function success(): { success: true } {
	return {
		success: true,
	}
}

export function successOf<T>(data: T): { success: true; data: T } {
	return {
		success: true,
		data,
	}
}

export function errorOf<const T>(content: T): { success: false; error: T } {
	return {
		success: false,
		error: content,
	}
}
