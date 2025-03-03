import {
  AbsenceEnum,
  GenderEnum,
  PagesEnum,
  TardinessEnum,
  TrimesterEnum,
  YesNoEnum,
} from "@/Enums";
import { Translations } from "@/hooks/translations";

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
type Constant<K extends keyof any> = Record<K, Translations>;
export const TRIMESTERS: Constant<TrimesterEnum> = {
  "Trimestre-1": "First Trimester",
  "Trimestre-2": "Second Trimester",
  "Trimestre-3": "Third Trimester",
  "Trimestre-4": "Fourth Trimester",
  Verano: "Summer",
};

export const PAGES: Constant<PagesEnum> = {
  Notas: "Notes",
  Notas2: "Notes 2",
  "Pruebas-Cortas": "Short Tests",
  "Trab-Diarios": "Daily Work",
  "Trab-Libreta": "Notebook Work",
  "Cond-Asis": "Conduct and Attendance",
  "Ex-Final": "Final Exam",
  "V-Nota": "Summer Grades",
};

export const YES_NO: Constant<YesNoEnum> = {
  SI: "Yes",
  NO: "No",
};

export const GENDERS: Constant<GenderEnum> = {
  m: "Male",
  f: "Female",
};
export const ABSENCES_ATTENDANCE: Constant<AbsenceEnum> = {
  "1": "Home situation",
  "2": "Home determination (trip)",
  "3": "Parents activity",
  "4": "Sickeness",
  "5": "Appointment",
  "6": "School activity",
  "7": "No excuse",
};

export const TARDINESS_ATTENDANCE: Constant<TardinessEnum> = {
  "8": "No excuse",
  "9": "Home situation",
  "10": "Transportation problem",
  "11": "Sickeness",
  "12": "Appointment",
};
