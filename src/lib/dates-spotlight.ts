/**
 * Supports future date varieties (e.g. Ajwa, Medjool) once the catalog is
 * confirmed — `DatesSpotlight` only renders a varieties row when this is
 * non-empty, so it stays empty rather than listing unconfirmed inventory.
 */
export interface DateVariety {
  id: string;
  name: string;
}

export const dateVarieties: DateVariety[] = [];
