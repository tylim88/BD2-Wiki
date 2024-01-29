export const toLowerCaseReplaceSpaceRemoveSpecialChars = (
	inputString: string
) => {
	return inputString
		.replace(/[^\w\s]/gi, '')
		.replace(/\s+/g, '_')
		.toLowerCase()
}
type Entries<T> = {
	[K in keyof T]: [K, T[K]]
}[keyof T][]

declare global {
	interface ObjectConstructor {
		entries<T extends object>(o: T): Entries<T>
	}
}
