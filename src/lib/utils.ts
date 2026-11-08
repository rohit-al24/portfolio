/** Tiny class-name combiner. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Format a project/achievement year range for display. */
export function formatYear(value: string): string {
  return value;
}
