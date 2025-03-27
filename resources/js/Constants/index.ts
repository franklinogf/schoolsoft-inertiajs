import {
  AbsenceEnum,
  GenderEnum,
  PagesEnum,
  PhoneCompaniesEnum,
  TardinessEnum,
  TeacherLevelEnum,
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

export const EXAM_BLANK_LINE = " ___";

/* --------------------------------- Logins --------------------------------- */
export const LOGIN_REGIWEB_PICTURE = LOGO_REGIWEB;
export const LOGIN_ADMIN_PICTURE = LOGO_SCHOOLSOFT;
export const LOGIN_FORO_TEACHER_PICTURE = LOGO_SCHOOLSOFT;
export const LOGIN_FORO_STUDENT_PICTURE = LOGO_SCHOOLSOFT;

type Constant<K extends keyof any> = Record<K, Translations>;

export const TRIMESTERS: Constant<TrimesterEnum> = {
  [TrimesterEnum.FIRST_TRIMESTER]: "Primer Trimestre",
  [TrimesterEnum.SECOND_TRIMESTER]: "Segundo Trimestre",
  [TrimesterEnum.THIRD_TRIMESTER]: "Tercer Trimestre",
  [TrimesterEnum.FOURTH_TRIMESTER]: "Cuarto Trimestre",
  [TrimesterEnum.SUMMER]: "Verano",
};

export const PAGES: Constant<PagesEnum> = {
  [PagesEnum.GRADES]: "Notas",
  [PagesEnum.GRADES2]: "Notas 2",
  [PagesEnum.SHORT_TESTS]: "Pruebas Cortas",
  [PagesEnum.DAILY_WORKS]: "Trabajos Diarios",
  [PagesEnum.NOTEBOOKS_WORKS]: "Trabajos de Libreta",
  [PagesEnum.CONDUCT_ATTENDANCE]: "Conducta y Asistencia",
  [PagesEnum.FINAL_EXAM]: "Examen Final",
  [PagesEnum.SUMMER_GRADES]: "Verano Notas",
};

export const YES_NO: Constant<YesNoEnum> = {
  [YesNoEnum.YES]: "Sí",
  [YesNoEnum.NO]: "No",
};

export const GENDERS: Constant<GenderEnum> = {
  [GenderEnum.MALE]: "Masculino",
  [GenderEnum.FEMALE]: "Femenino",
};
export const ABSENCES_ATTENDANCE: Constant<AbsenceEnum> = {
  [AbsenceEnum.HOME]: "Situación en el hogar",
  [AbsenceEnum.VACATION]: "Determinación en el hogar (viaje)",
  [AbsenceEnum.PARENTS_ACTIVITY]: "Actividad con padres (open house)",
  [AbsenceEnum.SICK]: "Enfermedad",
  [AbsenceEnum.APPOINTMENT]: "Cita",
  [AbsenceEnum.SCHOOL_ACTIVITY]: "Actividad educativa del colegio",
  [AbsenceEnum.NO_EXCUSE]: "Sin excusa",
};

export const TARDINESS_ATTENDANCE: Constant<TardinessEnum> = {
  [TardinessEnum.NO_EXCUSE]: "Sin excusa",
  [TardinessEnum.HOME]: "Situación en el hogar",
  [TardinessEnum.TRANSPORTATION]: "Problema de transporte",
  [TardinessEnum.SICK]: "Enfermedad",
  [TardinessEnum.APPOINTMENT]: "Cita",
};

export const TEACHER_LEVEL: Constant<TeacherLevelEnum> = {
  [TeacherLevelEnum.ELEMENTAL]: "Elemental",
  [TeacherLevelEnum.PRE_SCHOOL]: "Preescolar",
  [TeacherLevelEnum.INTERMEDIATE]: "Intermedia",
  [TeacherLevelEnum.SUPERIOR]: "Superior",
};

export const PHONE_COMPANIE: Record<PhoneCompaniesEnum, string> = {
  [PhoneCompaniesEnum.ATT]: "AT&T",
  [PhoneCompaniesEnum.TMOBILE]: "T-Mobile",
  [PhoneCompaniesEnum.SPRINT]: "Sprint",
  [PhoneCompaniesEnum.OPENM]: "Openm",
  [PhoneCompaniesEnum.CLARO]: "Claro",
  [PhoneCompaniesEnum.VERIZON]: "Verizon",
  [PhoneCompaniesEnum.SUNCOM]: "Suncom",
  [PhoneCompaniesEnum.BOOST]: "Boost",
};
export const PHONE_COMPANIE_HOST: Record<PhoneCompaniesEnum, string> = {
  [PhoneCompaniesEnum.ATT]: "@txt.att.net",
  [PhoneCompaniesEnum.TMOBILE]: "@tmomail.net",
  [PhoneCompaniesEnum.SPRINT]: "@messaging.sprintpcs.com",
  [PhoneCompaniesEnum.OPENM]: "@email.openmobilepr.com",
  [PhoneCompaniesEnum.CLARO]: "@mms.claropr.com",
  [PhoneCompaniesEnum.VERIZON]: "@vtext.com",
  [PhoneCompaniesEnum.SUNCOM]: "@tms.suncom.com",
  [PhoneCompaniesEnum.BOOST]: "@myboostmobile.com",
};
