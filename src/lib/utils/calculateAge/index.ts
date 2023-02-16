/**
 * Calculates the approximate age based on a provided birth year.
 * @param birthYear number | null | undefined
 * @returns number | undefined
 */
export const calculateAge = (birthYear?: number | null): number | undefined => {
  if (!birthYear) return
  return new Date().getFullYear() - birthYear
}
