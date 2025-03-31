import { Translations } from "@/hooks/translations";
import { Admin } from "./auth";
import { Student } from "./student";
import { Teacher } from "./teacher";

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

export interface Inbox<TReceiver, TSender> {
  id: number;
  subject: string;
  message: string;
  replies: Inbox<TSender, TReceiver>[];
  preview: string;
  is_deleted: boolean;
  is_read: boolean;
  date: string;
  time: string;
  datetime: string;
  datetime_human_readeable: string;
  receivers: TReceiver[];
  sender: TSender;
  attachments: InboxAttachment[];
}

export type InboxType = "inbox" | "sent" | "trash";

export type TeacherInbox = Inbox<Teacher, Student | Admin>;
export type StudentInbox = Inbox<Student, Teacher | Admin>;
export type AdminInbox = Inbox<Admin, Teacher | Student>;
