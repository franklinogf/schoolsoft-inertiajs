import { GenderEnum, PagesEnum, TrimesterEnum, YesNoEnum } from "@/Enums";
import i18n from "@/lib/i18n";
i18n.setDefaultNamespace("common");

export const NO_PICTURE_BOY = "/assets/no-picture-boy.png";
export const NO_PICTURE_GIRL = "/assets/no-picture-girl.png";
export const NO_PICTURE_TEACHER = "/assets/no-picture-teacher.png";
export const LOGO_REGIWEB = "/assets/logo-regiweb.gif";
export const LOGO_SCHOOLSOFT = "/assets/logo-schoolsoft.gif";
export const GLOBE_PICTURE = "/assets/globe.gif";

/* --------------------------------- Logins --------------------------------- */
export const LOGIN_REGIWEB_PICTURE = LOGO_REGIWEB;
export const LOGIN_ADMIN_PICTURE = LOGO_SCHOOLSOFT;
export const LOGIN_FORO_TEACHER_PICTURE = LOGO_SCHOOLSOFT;
export const LOGIN_FORO_STUDENT_PICTURE = LOGO_SCHOOLSOFT;

export const TRIMESTERS: Record<TrimesterEnum, string> = {
  "Trimestre-1": i18n.t("trimester.1"),
  "Trimestre-2": i18n.t("trimester.2"),
  "Trimestre-3": i18n.t("trimester.3"),
  "Trimestre-4": i18n.t("trimester.4"),
  Verano: i18n.t("trimester.summer"),
};

export const PAGES: Record<PagesEnum, string> = {
  Notas: i18n.t("pages.grades"),
  Notas2: i18n.t("pages.grades2"),
  "Pruebas-Cortas": i18n.t("pages.shortTests"),
  "Trab-Diarios": i18n.t("pages.dailyWork"),
  "Trab-Libreta": i18n.t("pages.notebookWork"),
  "Cond-Asis": i18n.t("pages.conductAttendance"),
  "Ex-Final": i18n.t("pages.finalExam"),
  "V-Nota": i18n.t("pages.summerGrades"),
};

export const YES_NO: Record<YesNoEnum, string> = {
  SI: i18n.t("yes"),
  NO: i18n.t("no"),
};

export const GENDERS: Record<GenderEnum, string> = {
  m: i18n.t("gender.male"),
  f: i18n.t("gender.female"),
};
