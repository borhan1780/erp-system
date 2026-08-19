import type { FilterRow, GetVouchersParams } from "../types/vouchers.types";

// تبدیل تاریخ شمسی YYYY/MM/DD به میلادی YYYY-MM-DD
export function jalaliToGregorianString(jDateStr: string): string {
  if (!jDateStr) return "";
  const parts = jDateStr.trim().split(/[/\\-]/).map(Number);
  if (parts.length !== 3) return jDateStr;

  let [jy, jm, jd] = parts;
  const gy = jy <= 979 ? 621 : 1600;
  jy -= jy <= 979 ? 0 : 979;
  let days =
    365 * jy +
    Math.floor(jy / 33) * 8 +
    Math.floor(((jy % 33) + 3) / 4) +
    78 +
    jd +
    (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
  let g_y = gy + 400 * Math.floor(days / 146097);
  days %= 146097;
  if (days > 36524) {
    days--;
    g_y += 100 * Math.floor(days / 36524);
    days %= 36524;
    if (days >= 365) days++;
  }
  g_y += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    g_y += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  let gd = days + 1;
  const sal_a = [
    0,
    31,
    (g_y % 4 === 0 && g_y % 100 !== 0) || g_y % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  let gm = 0;
  while (gm < 13 && gd > sal_a[gm]) {
    gd -= sal_a[gm];
    gm++;
  }

  const mm = gm.toString().padStart(2, "0");
  const dd = gd.toString().padStart(2, "0");
  return `${g_y}-${mm}-${dd}`;
}

// نگاشت ردیف‌های فیلتر به پارامترهای معتبر API
export function mapFiltersToQueryParams(
  filters: FilterRow[]
): Omit<GetVouchersParams, "companyId" | "ledgerId" | "periodId" | "page" | "pageSize"> {
  const result: Omit<
    GetVouchersParams,
    "companyId" | "ledgerId" | "periodId" | "page" | "pageSize"
  > = {};

  filters.forEach((item) => {
    const val = item.value?.trim();
    if (!val) return;

    // شماره سند
    if (item.column === "number") {
      if (item.operator === "eq") result.number = val;
      else if (item.operator === "gte") result.from_number = val;
      else if (item.operator === "lte") result.to_number = val;
    }
    // تاریخ سند
    else if (item.column === "date") {
      const gDate = jalaliToGregorianString(val);
      if (item.operator === "eq") result.date = gDate;
      else if (item.operator === "after") result.from_date = gDate;
      else if (item.operator === "before") result.to_date = gDate;
      else if (item.operator === "between") {
        result.from_date = gDate;
        if (item.secondValue?.trim()) {
          result.to_date = jalaliToGregorianString(item.secondValue.trim());
        }
      }
    }
    // شرح سند
    else if (item.column === "description") {
      if (item.operator === "contains" || item.operator === "eq") {
        result.description = val;
      }
    }
  });

  return result;
}