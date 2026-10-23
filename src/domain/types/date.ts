import { ok, err, type Result } from "./errorHandling";
import type { Brand } from "./common";

export type IsoDate = Brand<string, "isoDate">;

export function parseIsoDate(dateString: string): Result<IsoDate> {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return err({
      kind: "parseError",
      message: "Could not parse IsoDate String",
    });
  }

  return ok(dateString as IsoDate);
}
