import i18n from "@/lib/i18n";
import { Computer, Globe, MonitorSpeaker, Origami, Wrench } from "lucide-react";
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
    title: t("home:services.items.item1.title"),
    description: t("home:services.items.item1.description"),
    Icon: Origami,
  },
  {
    title: t("home:services.items.item2.title"),
    description: t("home:services.items.item2.description"),
    Icon: Globe,
  },
  {
    title: t("home:services.items.item3.title"),
    description: t("home:services.items.item3.description"),
    Icon: MonitorSpeaker,
  },
  {
    title: t("home:services.items.item4.title"),
    description: t("home:services.items.item4.description"),
    Icon: Wrench,
  },
  {
    title: t("home:services.items.item5.title"),
    description: t("home:services.items.item5.description"),
    Icon: Computer,
  },
];

export const OTHER_SERVICES = [
  {
    title: t("home:otherServices.items.item1"),
  },
  {
    title: t("home:otherServices.items.item2"),
  },
  {
    title: t("home:otherServices.items.item3"),
  },
  {
    title: t("home:otherServices.items.item4"),
  },
  {
    title: t("home:otherServices.items.item5"),
  },
  {
    title: t("home:otherServices.items.item6"),
  },
] as const;
