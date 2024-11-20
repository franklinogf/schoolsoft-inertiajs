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
];
export const MODULES = [
  {
    title: "Información de estudiantes",
    description: `Record del estudiante, padre, madre encargado, maestros, vacunas, enfermedades,
      impedimentos, rematricula, salón hogar, control de data, índices, búsqueda de record, socio
      económico, médico, totales por grado, lista de cuentas, informe de direcciones, lista de
      teléfonos, lista de trabajo, lista de padres, informe de estudiantes nuevo, lista de
      descuentos, etiquetas, carta certificada y variedad de informes.`,
    Icon: BadgeInfo,
  },
  {
    title: "Sistema de notas",
    description: `Catálogo de cursos, materias, programa especiales, entrada de notas y conductas por
      trimestre, registro del maestro, calcular notas trimestrales y semestrales, méritos,
      deméritos, fracasados, talis, rangos, promedios trimestrales, notas de verano, tarjetas de
      notas, pantalla de comentario para la tarjeta, mensajes para la tarjeta, programa de clase,
      distribución de notas, registro de notas, acumulativa y variedad de informes.`,
    Icon: NotebookPen,
  },
  {
    title: "Registro electrónico",
    description: `Entrada de notas de trabajos diarios, proyectos, trabajo de libreta, examenes, conductas
      trimestrales, promedios trimestral, semestral, finales, asistencia trimestral, planes
      diarios, variedad de informes.`,
    Icon: BriefcaseBusiness,
  },
  {
    title: "Cuentas a Cobrar",
    description: `Presupuesto, costos, descuentos, pantalla de pagos, recargos, libreta de pago, lista de
      deudores, estado de cuenta, Pagos diarios, crea diferentes carta de cobre, inf. 30-60-90,
      recibo y variedad de informes.`,
    Icon: PieChart,
  },
  {
    title: "Sistema de Iglesias",
    description: `Certificados de Matrimonio, Bautismo Comunion, Negativa, Confirmación y Notificación Ect.`,
    Icon: FileCheck,
  },
];
export const REGIWEB = [
  {
    title: "Regiweb",
    description: `Incluye entrada de notas, el maestro puede entrar los diferentes tipos de notas,
       tales como, exámen, pruebas cortas, trabajos diarios, trabajos de libreta, asistencia ,
       conducta y enviar tareas. El profesor puede llevar una comunicación con los padres, ya
        sea a través de la web, Celular o E_Mail. Puede imprimir los diferentes informes.`,
    Icon: Globe,
  },
  {
    title: "Módulo de padres",
    description: `Los padres pueden ver las notas de sus hijos, comunicarce con los profesores por 
      medio de la web o E_Mail, actualizar su información y permitir o denegar E_Mail, 
      solicitar cita con los maestros.`,
    Icon: Users,
  },
  {
    title: "Administración",
    description: `El colegio puede controlar los módulos, información general del colegio, control de 
      fechas de inicio y cierre de trimestres, importar y exportar data, activar y desactivar 
      usuarios, envio de mensajes por medio de la web, Celulares o E_Mail, variedad de informes.`,
    Icon: School,
  },
  {
    title: "Calendario de eventos",
    description: `Puede añadir las diferentes actividades que se llevarán a cabo durante todo el año. 
      Cualquiera puede ver el calendario pero solamente el administrador o persona 
      encargada puede añadir, modificar o borrar eventos. Estos módulos tienen incluido el 
      mantenimiento para Update y cambios sugeridos por la institución.`,
    Icon: CalendarClock,
  },
];
