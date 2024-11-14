import { GenderEnum, PagesEnum, TrimesterEnum, YesNoEnum } from "@/Enums";

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
  "Trimestre-1": "1er Trimestre",
  "Trimestre-2": "2do Trimestre",
  "Trimestre-3": "3er Trimestre",
  "Trimestre-4": "4to Trimestre",
  Verano: "Verano",
};

export const PAGES: Record<PagesEnum, string> = {
  Notas: "Notas",
  Notas2: "Notas2",
  "Pruebas-Cortas": "Pruebas Cortas",
  "Trab-Diarios": "Trabajos Diarios",
  "Trab-Libreta": "Trabajos de Libreta",
  "Cond-Asis": "Conducta y Asistencia",
  "Ex-Final": "Examen Final",
  "V-Nota": "Verano Notas",
};

export const YES_NO: Record<YesNoEnum, string> = {
  SI: "Si",
  NO: "No",
};

export const GENDERS: Record<GenderEnum, string> = {
  m: "Masculino",
  f: "Femenino",
};
