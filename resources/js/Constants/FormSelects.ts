import { SelectItemType } from "@/Components/CustomFormField";
import {
  GenderEnum,
  PagesEnum,
  PhoneCompaniesEnum,
  TeacherLevelEnum,
  TrimesterEnum,
  YesNoEnum,
} from "@/Enums";

export const GENDERS_SELECT: SelectItemType[] = Object.entries(GenderEnum).map(([key, value]) => ({
  key,
  value,
}));

export const PHONE_COMPANIES_SELECT: SelectItemType[] = Object.keys(PhoneCompaniesEnum).map(
  (company) => ({
    key: company,
    value: company,
  }),
);

export const TEACHER_LEVEL_SELECT: SelectItemType[] = Object.entries(TeacherLevelEnum).map(
  ([key, value]) => ({
    key,
    value,
  }),
);

export const YES_NO_SELECT: SelectItemType[] = Object.entries(YesNoEnum).map(([key, value]) => ({
  key,
  value,
}));

export const TRIMESTER_SELECT: SelectItemType[] = Object.entries(TrimesterEnum).map(
  ([key, value]) => ({
    key,
    value,
  }),
);
export const PAGES_SELECT: SelectItemType[] = Object.entries(PagesEnum).map(([key, value]) => ({
  key,
  value,
}));
