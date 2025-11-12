
/**
 * Domain types used across the Lilypad React app.
 * Keep this file focused on serializable data structures only.
 */
export type InsertionPosition = 'after_char' | 'before_char' | 'top' | 'bottom' | 'depth';
export type ScanStrategy = 'keyword' | 'always' | 'vector';

export interface LoreEntry {
  /** Unique identifier (epoch millis by default). */
  id: number;
  /** Friendly name shown in lists/cards. */
  name: string;
  /** Main content visible to the AI / user. */
  content: string;
  /** Comma-separated trigger words (ANY match). */
  keys: string;
  /** Whether this entry can be activated/used. */
  enabled: boolean;
  /** One word/category, e.g. character, location, rules, etc. */
  tags: string;
  /** If true, added regardless of trigger matches. */
  alwaysOn: boolean;

  // Advanced (optional) tuning fields:
  position?: InsertionPosition;
  order?: number;
  depth?: number;
  secondaryKeys?: string;
  probability?: number; // 0-100
  strategy?: ScanStrategy; // 'vector' reserved for future
  caseSensitive?: boolean;
  wholeWords?: boolean;
  useRegex?: boolean;
}
