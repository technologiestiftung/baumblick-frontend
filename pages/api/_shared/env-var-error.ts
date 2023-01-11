export function envVarError(missingVar: string): never {
  const prefix = 'Missing environment variable:'
  const msg = `${prefix} ${missingVar}`
  console.error(msg)
  throw new Error(msg)
}
