import { SelectItemType } from "@/Components/FormSelect";
import { GenderEnum, PhoneCompaniesEnum, TeacherLevelEnum } from "@/Enums";

export const GENDERS_SELECT: SelectItemType = Object.entries(GenderEnum).map(([key, value]) => ({
  key,
  value,
}));

export const PHONE_COMPANIES_SELECT: SelectItemType = Object.keys(PhoneCompaniesEnum).map(
  (company) => ({
    key: company,
    value: company,
  }),
);

export const TEACHER_LEVEL_SELECT: SelectItemType = Object.entries(TeacherLevelEnum).map(
  ([key, value]) => ({
    key,
    value,
  }),
);

export const YES_NO_SELECT: SelectItemType = Object.entries(GenderEnum).map(([key, value]) => ({
  key,
  value,
}));
