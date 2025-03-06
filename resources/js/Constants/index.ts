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
  "Trimestre-1": "Primer Trimestre",
  "Trimestre-2": "Segundo Trimestre",
  "Trimestre-3": "Tercer Trimestre",
  "Trimestre-4": "Cuarto Trimestre",
  Verano: "Verano",
};

export const PAGES: Constant<PagesEnum> = {
  Notas: "Notas",
  Notas2: "Notas 2",
  "Pruebas-Cortas": "Pruebas Cortas",
  "Trab-Diarios": "Trabajos Diarios",
  "Trab-Libreta": "Trabajos de Libreta",
  "Cond-Asis": "Conducta y Asistencia",
  "Ex-Final": "Examen Final",
  "V-Nota": "Verano Notas",
};

export const YES_NO: Constant<YesNoEnum> = {
  SI: "Sí",
  NO: "No",
};

export const GENDERS: Constant<GenderEnum> = {
  m: "Masculino",
  f: "Femenino",
};
export const ABSENCES_ATTENDANCE: Constant<AbsenceEnum> = {
  "1": "Situación en el hogar",
  "2": "Determinación en el hogar (viaje)",
  "3": "Actividad con padres (open house)",
  "4": "Enfermedad",
  "5": "Cita",
  "6": "Actividad educativa del colegio",
  "7": "Sin excusa",
};

export const TARDINESS_ATTENDANCE: Constant<TardinessEnum> = {
  "8": "Sin excusa",
  "9": "Situación en el hogar",
  "10": "Problema de transporte",
  "11": "Enfermedad",
  "12": "Cita",
};
