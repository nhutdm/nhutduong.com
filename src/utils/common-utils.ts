/**
 * Converts a string to a URL-friendly slug
 * @param input - The string to convert
 * @returns A URL-friendly slug
 */
export function slugify(input?: string): string {
  if (!input) return '';
  return input
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim()
    .replace(/[\s-]+/g, '-');
}
