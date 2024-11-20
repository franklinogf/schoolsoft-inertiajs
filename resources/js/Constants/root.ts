import i18n from "@/lib/i18n";
import {
  BadgeInfo,
  BriefcaseBusiness,
  CalendarClock,
  Computer,
  FileCheck,
  Globe,
  MonitorSpeaker,
  NotebookPen,
  Origami,
  PieChart,
  School,
  Users,
  Wrench,
} from "lucide-react";
i18n.loadNamespaces("home");
const { t } = i18n;
export const MENU_LINKS = [
  {
    label: t("home:menu.item1"),
    path: "home",
  },
  {
    label: t("home:menu.item2"),
    path: "modules",
  },
  {
    label: t("home:menu.item3"),
    path: "regiweb",
  },
];

export const SERVICES = [
  {
    title: t("home:index.services.items.item1.title"),
    description: t("home:index.services.items.item1.description"),
    Icon: Origami,
  },
  {
    title: t("home:index.services.items.item2.title"),
    description: t("home:index.services.items.item2.description"),
    Icon: Globe,
  },
  {
    title: t("home:index.services.items.item3.title"),
    description: t("home:index.services.items.item3.description"),
    Icon: MonitorSpeaker,
  },
  {
    title: t("home:index.services.items.item4.title"),
    description: t("home:index.services.items.item4.description"),
    Icon: Wrench,
  },
  {
    title: t("home:index.services.items.item5.title"),
    description: t("home:index.services.items.item5.description"),
    Icon: Computer,
  },
];

export const OTHER_SERVICES = [
  {
    title: t("home:index.otherServices.items.item1"),
  },
  {
    title: t("home:index.otherServices.items.item2"),
  },
  {
    title: t("home:index.otherServices.items.item3"),
  },
  {
    title: t("home:index.otherServices.items.item4"),
  },
  {
    title: t("home:index.otherServices.items.item5"),
  },
  {
    title: t("home:index.otherServices.items.item6"),
  },
];
export const MODULES = [
  {
    title: t("home:modules.items.item1.title"),
    description: t("home:modules.items.item1.description"),
    Icon: BadgeInfo,
  },
  {
    title: t("home:modules.items.item2.title"),
    description: t("home:modules.items.item2.description"),
    Icon: NotebookPen,
  },
  {
    title: t("home:modules.items.item3.title"),
    description: t("home:modules.items.item3.description"),
    Icon: BriefcaseBusiness,
  },
  {
    title: t("home:modules.items.item4.title"),
    description: t("home:modules.items.item4.description"),
    Icon: PieChart,
  },
  {
    title: t("home:modules.items.item5.title"),
    description: t("home:modules.items.item5.description"),
    Icon: FileCheck,
  },
];
export const REGIWEB = [
  {
    title: t("home:regiweb.items.item1.title"),
    description: t("home:regiweb.items.item1.description"),
    Icon: Globe,
  },
  {
    title: t("home:regiweb.items.item2.title"),
    description: t("home:regiweb.items.item2.description"),
    Icon: Users,
  },
  {
    title: t("home:regiweb.items.item3.title"),
    description: t("home:regiweb.items.item3.description"),
    Icon: School,
  },
  {
    title: t("home:regiweb.items.item4.title"),
    description: t("home:regiweb.items.item4.description"),
    Icon: CalendarClock,
  },
];
