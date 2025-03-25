import { SelectItemType } from "@/Components/forms/inputs/SelectField";
import { PhoneCompaniesEnum, TeacherLevelEnum } from "@/Enums";
import { GENDERS, PAGES, TRIMESTERS, YES_NO } from ".";

export function createSelectItemsFromArrayOfObjects(
  array: Record<string, any>[] | undefined | null,
  {
    value,
    labels,
    separator = " ",
  }: { value: string; labels: string[] | string; separator?: string },
): SelectItemType[] {
  if (!array || array.length === 0) return [];

  return array.map((item) => ({
    value: item[value],
    label:
      labels instanceof Array
        ? labels.map((label) => item[label]).join(separator)
        : (item[labels] ?? ""),
  }));
}
export function createSelectItems(
  enumObject: Record<string, string> | SelectItemType[],
  { onlyKey }: { onlyKey: boolean } = { onlyKey: false },
): SelectItemType[] {
  return Object.entries(enumObject).map(([key, value]) => ({
    value: key,
    label: onlyKey ? key : value,
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
  (trimester) => trimester.value !== "Verano",
);
export const PAGES_SELECT = createSelectItems(PAGES);
