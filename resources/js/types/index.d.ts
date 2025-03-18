import { PhoneCompaniesEnum } from "@/Enums";
import { Admin } from "./auth";
import { Student } from "./student";
import { Teacher } from "./teacher";

export interface Document {
  id: number;
  categoria: string;
  titulo: string;
  descripcion: string;
  fecha_desde: string;
  fecha_hasta: string;
  archivo: string;
  grado_desde: string;
  grado_hasta: string;
}
export type Errors = { [key: string]: string };
type Theme = {
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  popover: string;
  popoverForeground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  radius: string;
};
type Themes = {
  light: Theme;
  dark: Theme;
};
export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  flash: {
    success: string | null;
    error: string | null;
    errorList: Errors | null;
  };
  errors: Errors;
  locale: string;
  csrf_token: string;
  theme: {
    current: keyof Themes;
    themes: Themes;
  };
};

export type PagePropsWithUser<
  U,
  T extends Record<string, unknown> = Record<string, unknown>,
> = PageProps<T> & {
  auth: {
    user: U;
  };
};

export type PhoneCompany = keyof typeof PhoneCompaniesEnum;

export type InboxSideBarMenu = {
  header: {
    title: Translations;
    icon: LucideIcon;
    route: RouteName;
  };
  menu: {
    title: Translations;
    route: RouteName;
    icon: LucideIcon;
    type: InboxType;
  }[];
};
export type InboxAttachment = {
  id: number;
  name: string;
  size: number;
  type: string;
  url: string;
};
export type Inbox<TReceiver, TSender> = {
  id: number;
  subject: string;
  message: string;
  preview: string;
  is_deleted: string;
  date: string;
  time: string;
  datetime: string;
  datetime_human_readeable: string;
  receivers: TReceiver[];
  sender: TSender;
  attachments: InboxAttachment[];
};
export type InboxType = "inbox" | "sent" | "trash";

export type TeacherInbox = Inbox<Teacher, Student | Admin>;
export type StudentInbox = Inbox<Student, Teacher | Admin>;
export type AdminInbox = Inbox<Admin, Teacher | Student>;
