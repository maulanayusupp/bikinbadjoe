/**
 * Formatting helpers. Auto-imported.
 */

/** Format a number as Indonesian Rupiah, e.g. 99000 -> "Rp99.000". */
export function formatIDR(value: number): string {
  return 'Rp' + Math.round(value).toLocaleString('id-ID')
}
