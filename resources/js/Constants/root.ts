import { Translations } from "@/hooks/translations";
import {
  BadgeInfo,
  BriefcaseBusiness,
  CalendarClock,
  Computer,
  FileCheck,
  Globe,
  LucideIcon,
  MonitorSpeaker,
  NotebookPen,
  Origami,
  PieChart,
  School,
  Users,
  Wrench,
} from "lucide-react";
type TranslationTitle = { title: Translations };
type TranslationList = TranslationTitle & { description: Translations; Icon: LucideIcon };

export const MENU_LINKS: { label: Translations; path: string }[] = [
  {
    label: "Home",
    path: "home",
  },
  {
    label: "Modules",
    path: "modules",
  },
  {
    label: "Regiweb",
    path: "regiweb",
  },
];

export const SERVICES: TranslationList[] = [
  {
    title: "Implementation Service",
    description:
      "This includes coordination for training stages with implementation dates. Material (manuals, etc.) for staff training. Follow-up to ensure the tasks required to complete the implementation of the SchoolSoft system are carried out for the benefit of the institution.",
    Icon: Origami,
  },
  {
    title: "Regiweb",
    description:
      "The new all-internet service, complete teacher registration, parents can view their children's grades, manage all accounts, and much more.",
    Icon: Globe,
  },
  {
    title: "Technical Support",
    description:
      "Individual technical assistance for administrative and teaching staff, by phone, internet, or remote control. All these technical support access options are available according to the needs and facilities available at the institution.",
    Icon: MonitorSpeaker,
  },
  {
    title: "Repair Service",
    description: "Parts and service for school equipment installed by our company.",
    Icon: Wrench,
  },
  {
    title: "Laboratory Rental",
    description:
      "Offer your students a modern lab with all applications such as Office 2018, class control, educational programs, antivirus, Windows 10, Windows Server 2018, among other options. Call us, and we will improve any written offer.",
    Icon: Computer,
  },
];

export const OTHER_SERVICES: TranslationTitle[] = [
  {
    title: "Network configurations.",
  },
  {
    title: "Sale of Computers and all types of accessories.",
  },
  {
    title: "Computer Rental for laboratory.",
  },
  {
    title: "Wireless Connection throughout the school.",
  },
  {
    title: "Computer Maintenance Services.",
  },
  {
    title: "Website for your school.",
  },
];
export const MODULES: TranslationList[] = [
  {
    title: "Student Information",
    description:
      "Student records, parent, guardian, teachers, vaccines, illnesses, disabilities, re-enrollment, homeroom, data control, indexes, record search, socioeconomic, medical, totals by grade, account lists, address reports, phone lists, work lists, parent lists, new student report, discount lists, labels, certified letters, and a variety of reports.",
    Icon: BadgeInfo,
  },
  {
    title: "Grading System",
    description:
      "Course catalog, subjects, special programs, entry of grades and behaviors by trimester, teacher records, calculation of trimester and semester grades, merits, demerits, failures, rankings, trimester averages, summer grades, report cards, comment section for report cards, messages for report cards, class schedule, grade distribution, grade records, cumulative data, and a variety of reports.",
    Icon: NotebookPen,
  },
  {
    title: "Electronic Record",
    description:
      "Entry of daily work grades, projects, notebook work, exams, trimester behaviors, trimester, semester, and final averages, trimester attendance, daily plans, and a variety of reports.",
    Icon: BriefcaseBusiness,
  },
  {
    title: "Accounts Receivable",
    description:
      "Budgeting, costs, discounts, payment screen, surcharges, payment booklet, debtor list, account statements, daily payments, creation of various collection letters, 30-60-90 reports, receipts, and a variety of reports.",
    Icon: PieChart,
  },
  {
    title: "Church System",
    description:
      "Certificates for Marriage, Baptism, Communion, Negative, Confirmation, and Notification, etc.",
    Icon: FileCheck,
  },
];
export const REGIWEB: TranslationList[] = [
  {
    title: "Regiweb",
    description:
      "Includes grade entry, allowing teachers to input various types of grades such as exams, quizzes, daily work, notebook assignments, attendance, behavior, and send homework. Teachers can communicate with parents via web, mobile, or email and print various reports.",
    Icon: Globe,
  },
  {
    title: "Parent Module",
    description:
      "Parents can view their children's grades, communicate with teachers via web or email, update their information, enable or disable email notifications, and request appointments with teachers.",
    Icon: Users,
  },
  {
    title: "Administration",
    description:
      "The school can manage modules, general school information, trimester start and end dates, import and export data, activate and deactivate users, send messages via web, mobile, or email, and generate a variety of reports.",
    Icon: School,
  },
  {
    title: "Calendar events",
    description: "The school can create events, such as exams, meetings, holidays, etc.",
    Icon: CalendarClock,
  },
];
