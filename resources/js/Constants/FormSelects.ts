import { SelectItemType } from "@/Components/forms/inputs/SelectField";
import {
  GenderEnum,
  PagesEnum,
  PhoneCompaniesEnum,
  TeacherLevelEnum,
  TrimesterEnum,
  YesNoEnum,
} from "@/Enums";

export function createSelectItemsFromArrayOfObjects(
  array: Record<string, string>[] | undefined,
  { key, values, separator = "-" }: { key: string; values: string[] | string; separator?: string },
): SelectItemType[] {
  if (!array) return [];
  return array.map((item) => ({
    key: item[key],
    value:
      values instanceof Array ? values.map((value) => item[value]).join(separator) : item[values],
  }));
}
export function createSelectItemsFromEnum(
  enumObject: Record<string, string>,
  { onlyKey }: { onlyKey: boolean } = { onlyKey: false },
): SelectItemType[] {
  return Object.entries(enumObject).map(([key, value]) => ({
    key,
    value: onlyKey ? key : value,
  }));
}

export const GENDERS_SELECT = createSelectItemsFromEnum(GenderEnum);

export const PHONE_COMPANIES_SELECT = createSelectItemsFromEnum(PhoneCompaniesEnum, {
  onlyKey: true,
});

export const TEACHER_LEVEL_SELECT = createSelectItemsFromEnum(TeacherLevelEnum);

export const YES_NO_SELECT = createSelectItemsFromEnum(YesNoEnum);

export const TRIMESTER_SELECT = createSelectItemsFromEnum(TrimesterEnum);
export const PAGES_SELECT = createSelectItemsFromEnum(PagesEnum);
