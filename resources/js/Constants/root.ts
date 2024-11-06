import i18n from "@/lib/i18next";
import { Computer, Globe, MonitorSpeaker, Origami, Wrench } from "lucide-react";

export const MENU_LINKS = [
  {
    label: "Inicio",
    path: "home",
  },
  {
    label: "Modulos",
    path: "modules",
  },
  {
    label: "Regiweb",
    path: "regiweb",
  },
] as const;
i18n.setDefaultNamespace("home");
const { t } = i18n;
export const SERVICES = [
  {
    title: t("services.items.0.title"),
    description: t("services.items.0.description"),
    Icon: Origami,
  },
  {
    title: t("services.items.1.title"),
    description: t("services.items.1.description"),
    Icon: Globe,
  },
  {
    title: t("services.items.2.title"),
    description: t("services.items.2.description"),
    Icon: MonitorSpeaker,
  },
  {
    title: t("services.items.3.title"),
    description: t("services.items.3.description"),
    Icon: Wrench,
  },
  {
    title: t("services.items.4.title"),
    description: t("services.items.4.description"),
    Icon: Computer,
  },
];

export const OTHER_SERVICES = [
  {
    title: t("otherServices.items.0.title"),
  },
  {
    title: t("otherServices.items.1.title"),
  },
  {
    title: t("otherServices.items.2.title"),
  },
  {
    title: t("otherServices.items.3.title"),
  },
  {
    title: t("otherServices.items.4.title"),
  },
  {
    title: t("otherServices.items.5.title"),
  },
] as const;
