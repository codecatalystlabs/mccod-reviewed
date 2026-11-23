import moment, { Moment } from "moment";
import type { DeMeta } from "./DynamicFormStore";
import { FormId } from "./types";
import { isYes, optionLabel } from "./skipLogic";

export type ReviewFlagType = "mustCorrect" | "confirm";

export interface ReviewFlag {
  field: string;
  message: string;
  type: ReviewFlagType;
}

type Values = Record<string, any>;

const hasValue = (v: any) =>
  v !== undefined &&
  v !== null &&
  v !== "" &&
  !(Array.isArray(v) && v.length === 0);

const asMoment = (v: any): Moment | null => {
  if (!hasValue(v)) return null;
  const m = moment.isMoment(v) ? v : moment(v);
  return m.isValid() ? m : null;
};

const isFuture = (v: any) => {
  const m = asMoment(v);
  return !!(m && m.isAfter(moment(), "day"));
};

const num = (v: any): number | null => {
  if (!hasValue(v)) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

/** Shared + form-specific red flags from the Nov 2026 review. */
export const validateReviewForm = (
  formId: FormId,
  values: Values,
  meta: Record<string, DeMeta> = {}
): ReviewFlag[] => {
  const flags: ReviewFlag[] = [];

  const dateFields =
    formId === "mdr"
      ? ["c5kDr80smH8", "WzauwhVOwM0", "NEW_mdr_review_date"]
      : formId === "pdr"
      ? ["RpkIvgOOZJt", "Dq9aH0aZ2wb", "NEW_pdr_review_date", "NEW_pdr_neonatal_admission_time"]
      : [];

  for (const de of dateFields) {
    if (isFuture(values[de])) {
      flags.push({
        field: de,
        message: "Date cannot be in the future.",
        type: "mustCorrect",
      });
    }
  }

  const ninField = formId === "mdr" ? "CupbOInqvJI" : formId === "pdr" ? "NEW_pdr_mother_nin" : null;
  if (ninField && hasValue(values[ninField])) {
    const nin = String(values[ninField]).replace(/\s+/g, "");
    if (!/^[A-Za-z0-9]{14}$/.test(nin)) {
      flags.push({
        field: ninField,
        message: "NIN must have 14 characters.",
        type: "mustCorrect",
      });
    }
  }

  if (formId === "mdr") {
    const age = num(values.iJqBq0kQtWO);
    if (age != null && (age < 10 || age > 55)) {
      flags.push({
        field: "iJqBq0kQtWO",
        message: "Check age. Outside 10 to 55 years.",
        type: "confirm",
      });
    }

    const adm = asMoment(values.c5kDr80smH8);
    const death = asMoment(values.WzauwhVOwM0);
    if (adm && death && death.isBefore(adm, "minute")) {
      flags.push({
        field: "WzauwhVOwM0",
        message: "Death cannot be before admission.",
        type: "mustCorrect",
      });
    }

    const weight = num(values.XW2CKaAiMKc);
    if (weight != null && (weight < 300 || weight > 6000)) {
      flags.push({
        field: "XW2CKaAiMKc",
        message: "Weight must be 300 to 6,000 g.",
        type: "mustCorrect",
      });
    }

    if (values.NEW_mdr_notif_sent === false || values.NEW_mdr_notif_sent === "false") {
      flags.push({
        field: "NEW_mdr_notif_sent",
        message: "Submit notification within 24 hours.",
        type: "confirm",
      });
    }
  }

  if (formId === "pdr") {
    const delivery = asMoment(values.RpkIvgOOZJt);
    const death = asMoment(values.Dq9aH0aZ2wb);
    if (delivery && death && death.isBefore(delivery, "minute")) {
      flags.push({
        field: "Dq9aH0aZ2wb",
        message: "Death cannot be before delivery.",
        type: "mustCorrect",
      });
    }

    const deathType = optionLabel("TiPl1iLI30H", values.TiPl1iLI30H, meta);
    if (/neonatal/i.test(deathType) && delivery && death) {
      const days = death.diff(delivery, "days", true);
      if (days > 28) {
        flags.push({
          field: "Dq9aH0aZ2wb",
          message: "Neonatal death must be within 28 days.",
          type: "mustCorrect",
        });
      }
    }

    const weight = num(values.bDWkcVeQLUc);
    if (weight != null && (weight < 300 || weight > 6000)) {
      flags.push({
        field: "bDWkcVeQLUc",
        message: "Weight must be 300 to 6,000 g.",
        type: "mustCorrect",
      });
    }

    for (const de of ["RmrshOepF86", "kOCe0LCjbVv", "pimd0GLDogv"]) {
      const score = num(values[de]);
      if (score != null && (score < 0 || score > 10)) {
        flags.push({
          field: de,
          message: "Apgar must be 0 to 10.",
          type: "mustCorrect",
        });
      }
    }

    const babies = num(values.NEW_pdr_multiple_babies_count);
    if (babies != null && (babies < 2 || babies > 5)) {
      flags.push({
        field: "NEW_pdr_multiple_babies_count",
        message: "Number must be 2 to 5.",
        type: "mustCorrect",
      });
    }

    // Unknown cause exclusive with other cause ticks
    if (isYes(values, "Y5T6DMJiZPJ", meta) || values.Y5T6DMJiZPJ === true || values.Y5T6DMJiZPJ === "true") {
      const otherCauses = [
        "Q6HnSrUTl39",
        "UaGg4B3DUac",
        "jSaonaOE68O",
        "xYenYvBElrk",
        "xjeIBJ2XyPd",
        "H4iDsba7jkw",
        "apgGGC11v8Y",
        "NEW_3B8Z",
      ];
      if (otherCauses.some((de) => values[de] === true || values[de] === "true" || isYes(values, de, meta))) {
        flags.push({
          field: "Y5T6DMJiZPJ",
          message: "Unknown cannot be ticked with a cause.",
          type: "mustCorrect",
        });
      }
    }
  }

  return flags;
};

export const mustCorrectFlags = (flags: ReviewFlag[]) =>
  flags.filter((f) => f.type === "mustCorrect");
