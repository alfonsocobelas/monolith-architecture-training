export function repeat<T>(
  factory: () => T,
  count: number = 5
): T[] {
  return Array.from({ length: count }, factory)
}
