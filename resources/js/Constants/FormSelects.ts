import { SelectItemType } from "@/Components/forms/inputs/SelectField";
import { PhoneCompaniesEnum, TeacherLevelEnum } from "@/Enums";
import { GENDERS, PAGES, TRIMESTERS, YES_NO } from ".";

export function createSelectItemsFromArrayOfObjects(
  array: Record<string, string>[] | undefined,
  { key, values, separator = " " }: { key: string; values: string[] | string; separator?: string },
): SelectItemType[] {
  if (!array) return [];
  return array.map((item) => ({
    key: item[key] ?? "",
    value:
      values instanceof Array
        ? values.map((value) => item[value]).join(separator)
        : (item[values] ?? ""),
  }));
}
export function createSelectItems(
  enumObject: Record<string, string> | SelectItemType[],
  { onlyKey }: { onlyKey: boolean } = { onlyKey: false },
): SelectItemType[] {
  return Object.entries(enumObject).map(([key, value]) => ({
    key,
    value: onlyKey ? key : value,
  }));
}

export const GENDERS_SELECT = createSelectItems(GENDERS);

export const PHONE_COMPANIES_SELECT = createSelectItems(PhoneCompaniesEnum, {
  onlyKey: true,
});

export const TEACHER_LEVEL_SELECT = createSelectItems(TeacherLevelEnum);

export const YES_NO_SELECT = createSelectItems(YES_NO);

export const TRIMESTER_SELECT = createSelectItems(TRIMESTERS);
export const TRIMESTER_SELECT_WITHOUT_SUMMER = TRIMESTER_SELECT.filter(
  (trimester) => trimester.key !== "Verano",
);
export const PAGES_SELECT = createSelectItems(PAGES);
