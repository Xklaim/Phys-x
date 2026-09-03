/**
 * Replace all {name} placeholders in a template string with the player's name.
 * Falls back to "Doctor" if name is blank.
 */
export function interpolate(template: string, name: string): string {
  const displayName = name.trim() || 'Doctor';
  return template.replace(/\{name\}/g, displayName);
}

/**
 * Get the display name (never blank).
 */
export function displayName(name: string): string {
  return name.trim() || 'Doctor';
}
