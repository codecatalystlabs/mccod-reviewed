/**
 * Placeholder data elements used in MDR/PDR layouts before real DHIS2 UIDs exist.
 *
 * Create each DE in DHIS2 (Matching valueType + option set), assign it to the
 * form's program stage, then paste the 11-char UID into PENDING_DE_UIDS below.
 * Leave the layout keys as NEW_* — remapping happens at save/load time.
 */

export type PendingForm = "mdr" | "pdr";

export interface PendingDataElement {
  /** Stable placeholder id used in layouts.json / skip logic. */
  placeholder: string;
  form: PendingForm;
  /** Paper form item (MCH020 / MCH017 July 2024). */
  paperItem: string;
  name: string;
  valueType: "TEXT" | "LONG_TEXT" | "INTEGER" | "BOOLEAN" | "TRUE_ONLY" | "DATE" | "DATETIME";
  /** Option codes/names when an option set is required. */
  options?: { code: string; name: string }[];
  /** In layouts.json today? */
  inLayout: boolean;
  /** Force-hidden by skipLogic today? */
  forceHidden?: boolean;
  notes?: string;
}

/** Paste real DHIS2 UIDs here once created. Keys = placeholder ids. */
export const PENDING_DE_UIDS: Record<string, string> = {
  // --- MCH020 (MDR) ---
  // NEW_mdr_notif_sent: "",
  // NEW_mdr_facility_level: "",
  // NEW_mdr_ownership: "",
  // NEW_mdr_nationality: "",
  // NEW_mdr_death_place_type: "",
  // NEW_mdr_delivery_facility_name: "",
  // NEW_mdr_reviewer_details: "",
  // NEW_mdr_record_legibility: "", // meta only; MDR layout already uses r5yWFdUMvnH

  // --- MCH017 (PDR) ---
  // NEW_pdr_mother_nin: "",
  // NEW_pdr_facility_level: "",
  // NEW_pdr_multiple_babies_count: "",
  // NEW_pdr_blood_group: "",
  // NEW_pdr_rhesus_factor: "",
  // NEW_pdr_blood_transfusion: "",
  // NEW_3B8Z: "",
  // NEW_pdr_record_legibility: "",
  // NEW_pdr_reviewer_details: "",
  // NEW_pdr_notif_sent: "",
  // NEW_pdr_review_date: "",
  // NEW_pdr_neonatal_admission_time: "",
};

export const PENDING_DATA_ELEMENTS: PendingDataElement[] = [
  // —— MCH020 Maternal (MDR) ——
  {
    placeholder: "NEW_mdr_notif_sent",
    form: "mdr",
    paperItem: "Notification",
    name: "Was the maternal death notification form completed and sent?",
    valueType: "BOOLEAN",
    inLayout: true,
  },
  {
    placeholder: "NEW_mdr_facility_level",
    form: "mdr",
    paperItem: "1.4",
    name: "Level of health facility",
    valueType: "TEXT",
    options: [
      { code: "National Referral Hospital", name: "National Referral Hospital" },
      { code: "Regional Referral Hospital", name: "Regional Referral Hospital" },
      { code: "General Hospital", name: "General Hospital" },
      { code: "HC IV", name: "HC IV" },
      { code: "HC III", name: "HC III" },
      { code: "Private Maternity", name: "Private Maternity" },
      { code: "Other-specify", name: "Other-specify" },
    ],
    inLayout: true,
  },
  {
    placeholder: "NEW_mdr_ownership",
    form: "mdr",
    paperItem: "1.5",
    name: "Facility Ownership",
    valueType: "TEXT",
    options: [
      { code: "Government", name: "Government" },
      { code: "Private for profit", name: "Private for profit" },
      { code: "PNFP", name: "PNFP" },
    ],
    inLayout: true,
  },
  {
    placeholder: "NEW_mdr_nationality",
    form: "mdr",
    paperItem: "2.2",
    name: "Nationality",
    valueType: "TEXT",
    options: [
      { code: "National", name: "National" },
      { code: "Refugee", name: "Refugee" },
      { code: "Foreigner", name: "Foreigner" },
    ],
    inLayout: true,
    notes: "Tracker nationality category combo may already cover this — confirm before creating.",
  },
  {
    placeholder: "NEW_mdr_death_place_type",
    form: "mdr",
    paperItem: "3.1",
    name: "Where did the death occur?",
    valueType: "TEXT",
    options: [
      { code: "At the facility after Admission", name: "At the facility after Admission" },
      { code: "Before Admission", name: "Before Admission" },
    ],
    inLayout: true,
    notes: "Drives before-admission skip logic; must persist or skips break on reload.",
  },
  {
    placeholder: "NEW_mdr_delivery_facility_name",
    form: "mdr",
    paperItem: "5.8",
    name: "Specify Name of facility",
    valueType: "TEXT",
    inLayout: true,
  },
  {
    placeholder: "NEW_mdr_reviewer_details",
    form: "mdr",
    paperItem: "Completed by",
    name: "Reviewer Details (Name / Contact / Date)",
    valueType: "LONG_TEXT",
    inLayout: true,
    notes: "Review wants 5 separate fields later; create this LONG_TEXT for now.",
  },
  {
    placeholder: "NEW_mdr_record_legibility",
    form: "mdr",
    paperItem: "9 / records",
    name: "Legibility of Medical Records",
    valueType: "TEXT",
    options: [
      { code: "Good", name: "Good" },
      { code: "Poor", name: "Poor" },
    ],
    inLayout: false,
    notes: "Fallback meta only — MDR layout already uses real DE r5yWFdUMvnH. Do not create unless replacing that DE.",
  },

  // —— MCH017 Perinatal (PDR) ——
  {
    placeholder: "NEW_pdr_mother_nin",
    form: "pdr",
    paperItem: "1.1.3",
    name: "Mother NIN",
    valueType: "TEXT",
    inLayout: true,
    notes: "Also explicitly stripped on save until a real UID is mapped.",
  },
  {
    placeholder: "NEW_pdr_facility_level",
    form: "pdr",
    paperItem: "1.4",
    name: "Level of health facility",
    valueType: "TEXT",
    options: [
      { code: "NRH", name: "National Referral Hospital" },
      { code: "RRH", name: "Regional Referral Hospital" },
      { code: "GH", name: "General Hospital" },
      { code: "HC IV", name: "HC IV" },
      { code: "HC III", name: "HC III" },
      { code: "HC II", name: "HC II" },
      { code: "Others", name: "Others (specify)" },
    ],
    inLayout: true,
  },
  {
    placeholder: "NEW_pdr_multiple_babies_count",
    form: "pdr",
    paperItem: "2.2.2.1",
    name: "If multiple, state number of babies",
    valueType: "INTEGER",
    inLayout: true,
  },
  {
    placeholder: "NEW_pdr_blood_group",
    form: "pdr",
    paperItem: "2.5.9",
    name: "Blood Group",
    valueType: "TEXT",
    options: [
      { code: "A", name: "A" },
      { code: "B", name: "B" },
      { code: "AB", name: "AB" },
      { code: "O", name: "O" },
    ],
    inLayout: true,
  },
  {
    placeholder: "NEW_pdr_rhesus_factor",
    form: "pdr",
    paperItem: "2.5.9.1",
    name: "Rhesus Factor",
    valueType: "TEXT",
    options: [
      { code: "Positive", name: "Positive" },
      { code: "Negative", name: "Negative" },
    ],
    inLayout: true,
  },
  {
    placeholder: "NEW_pdr_blood_transfusion",
    form: "pdr",
    paperItem: "2.5.9.2",
    name: "Blood Transfusion During Pregnancy",
    valueType: "BOOLEAN",
    inLayout: true,
  },
  {
    placeholder: "NEW_3B8Z",
    form: "pdr",
    paperItem: "4.1a",
    name: "3B8Z Bleeding disorders (specify)",
    valueType: "TRUE_ONLY",
    inLayout: true,
    notes: "Prefer TRUE_ONLY to match other cause ticks; fallback meta used BOOLEAN.",
  },
  {
    placeholder: "NEW_pdr_record_legibility",
    form: "pdr",
    paperItem: "6.1",
    name: "Legibility of Medical Records",
    valueType: "TEXT",
    options: [
      { code: "Good", name: "Good" },
      { code: "Poor", name: "Poor" },
    ],
    inLayout: true,
  },
  {
    placeholder: "NEW_pdr_reviewer_details",
    form: "pdr",
    paperItem: "Completed by",
    name: "Reviewer Details (Name / Contact / Date)",
    valueType: "LONG_TEXT",
    inLayout: true,
  },
  {
    placeholder: "NEW_pdr_notif_sent",
    form: "pdr",
    paperItem: "Notification",
    name: "Was the perinatal death notification form completed and sent/captured?",
    valueType: "BOOLEAN",
    inLayout: true,
  },
  {
    placeholder: "NEW_pdr_review_date",
    form: "pdr",
    paperItem: "Date of review",
    name: "Date of Review",
    valueType: "DATE",
    inLayout: true,
  },
  {
    placeholder: "NEW_pdr_neonatal_admission_time",
    form: "pdr",
    paperItem: "3.8.1.1",
    name: "If Neonatal death, Date and time of Admission",
    valueType: "DATETIME",
    inLayout: true,
  },
];

const DHIS2_UID = /^[A-Za-z][A-Za-z0-9]{10}$/;

export const isPendingPlaceholder = (id: string) => id.startsWith("NEW_");

export const isMappedPendingDe = (placeholder: string) => {
  const uid = PENDING_DE_UIDS[placeholder];
  return !!(uid && DHIS2_UID.test(uid));
};

/** Layout/form key → DHIS2 data element id used on the wire. */
export const toDhis2DeId = (placeholderOrUid: string): string => {
  const mapped = PENDING_DE_UIDS[placeholderOrUid];
  if (mapped && DHIS2_UID.test(mapped)) return mapped;
  return placeholderOrUid;
};

/** Build reverse map: real UID → placeholder (only for mapped entries). */
export const pendingUidToPlaceholder = (): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const [placeholder, uid] of Object.entries(PENDING_DE_UIDS)) {
    if (uid && DHIS2_UID.test(uid)) out[uid] = placeholder;
  }
  return out;
};

/** DHIS2 data element id → layout/form key. */
export const fromDhis2DeId = (uid: string): string =>
  pendingUidToPlaceholder()[uid] || uid;

/** Placeholders that still have no real UID (create these in DHIS2). */
export const unmappedPlaceholders = (form?: PendingForm) =>
  PENDING_DATA_ELEMENTS.filter(
    (de) => (!form || de.form === form) && !isMappedPendingDe(de.placeholder)
  );

/** UIDs to fetch meta for, in addition to layout UID-shaped ids. */
export const mappedPendingUids = (): string[] =>
  Object.values(PENDING_DE_UIDS).filter((uid) => DHIS2_UID.test(uid));
