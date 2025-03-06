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
    label: "Inicio",
    path: "home",
  },
  {
    label: "Módulos",
    path: "modules",
  },
  {
    label: "Regiweb",
    path: "regiweb",
  },
];

export const SERVICES: TranslationList[] = [
  {
    title: "Servicio de Implementación",
    description:
      "Esto incluye la coordinación para las etapas de adiestramientos con sus fechas de implementación. Material (manuales, etc.) para el adiestramiento de personal. Seguimiento para que se realicen los trabajos requeridos para completar la implementación del sistema SchoolSoft para el beneficio de la institución.",
    Icon: Origami,
  },
  {
    title: "Regiweb",
    description:
      "El nuevo servicio todo por internet, registro completo del maestro, los padres pueden ver las notas o calificaciones de sus hijos, puede controlar todas las cuentas y muchas mas.",
    Icon: Globe,
  },
  {
    title: "Apoyo Técnico",
    description:
      "Asistencia técnica individual para el personal administrativo y docente, por teléfono, por Internet, o control remoto. Todas estas opciones de acceso al apoyo técnico están disponibles de acuerdo a la necesidad y a las facilidades que estén disponibles en la institución.",
    Icon: MonitorSpeaker,
  },
  {
    title: "Servicio de Reparación",
    description: "Piezas y servicio a los equipos de el colegio, instalados por nuestra compañía.",
    Icon: Wrench,
  },
  {
    title: "Alquiler de Laboratorio",
    description:
      "Ofrezca a sus estudiantes un laboratorio moderno con todas las aplicaciones como Office 2018, control de clases, programas educativos, Antivirus, Windows 10, Windows Server 2018 entre otras opciones. Llamenos, mejoramos cualquier oferta por es1rito.",
    Icon: Computer,
  },
];

export const OTHER_SERVICES: TranslationTitle[] = [
  {
    title: "Configuraciones de network.",
  },
  {
    title: "Venta de Computadoras y todo tipo de accesorios.",
  },
  {
    title: "Alquiler de Computadoras para laboratorio.",
  },
  {
    title: "Conexión Inalambrica en todo el colegio.",
  },
  {
    title: "Servicios Mantenimiento a las computadoras.",
  },
  {
    title: "Pagina Web para su colegio",
  },
];

export const MODULES: TranslationList[] = [
  {
    title: "Información de estudiante",
    description:
      "Record del estudiante, padre, madre encargado, maestros, vacunas, enfermedades, impedimentos, rematricula, salón hogar, control de data, índices, búsqueda de record, socio económico, médico, totales por grado, lista de cuentas, informe de direcciones, lista de teléfonos, lista de trabajo, lista de padres, informe de estudiantes nuevo, lista de descuentos, etiquetas, carta certificada y variedad de informes.",
    Icon: BadgeInfo,
  },
  {
    title: "Sistema de Calificación",
    description:
      "Catálogo de cursos, materias, programas especiales, entrada de notas y comportamientos por trimestre, registros de maestros, cálculo de notas de trimestre y semestre, méritos, deméritos, fallas, rankings, promedios de trimestre, notas de verano, boletas de calificaciones, sección de comentarios para boletas de calificaciones, mensajes para boletas de calificaciones, horario de clases, distribución de notas, registros de notas, datos acumulativos y variedad de informes.",
    Icon: NotebookPen,
  },
  {
    title: "Registro Electrónico",
    description:
      "Entrada de notas de trabajos diarios, proyectos, trabajos de libreta, exámenes, comportamientos de trimestre, promedios de trimestre, semestre y finales, asistencia de trimestre, planes diarios y variedad de informes.",
    Icon: BriefcaseBusiness,
  },
  {
    title: "Cuentas por Cobrar",
    description:
      "Presupuesto, costos, descuentos, pantalla de pago, recargos, libreta de pago, lista de deudores, estados de cuenta, pagos diarios, creación de varias cartas de cobro, informes de 30-60-90, recibos y variedad de informes.",
    Icon: PieChart,
  },
  {
    title: "Sistema de Iglesia",
    description:
      "Certificados para Matrimonio, Bautismo, Comunión, Negativo, Confirmación, y Notificación, etc.",
    Icon: FileCheck,
  },
];

export const REGIWEB: TranslationList[] = [
  {
    title: "Regiweb",
    description:
      "Incluye entrada de notas, el maestro puede entrar los diferentes tipos de notas, tales como, exámen, pruebas cortas, trabajos diarios, trabajos de libreta, asistencia , conducta y enviar tareas. El profesor puede llevar una comunicación con los padres, ya sea a través de la web, Celular o E_Mail. Puede imprimir los diferentes informes.",
    Icon: Globe,
  },
  {
    title: "Módulo de Padres",
    description:
      "Los padres pueden ver las notas de sus hijos, comunicarce con los profesores por medio de la web o E-Mail, actualizar su información y permitir o denegar E_Mail, solicitar cita con los maestros.",
    Icon: Users,
  },
  {
    title: "Administración",
    description:
      "La escuela puede administrar los módulos, información general de la escuela, fechas de inicio y fin de trimestre, importar y exportar datos, activar y desactivar usuarios, enviar mensajes a través de la web, celular o correo electrónico y generar una variedad de informes.",
    Icon: School,
  },
  {
    title: "Eventos del calendario",
    description:
      "La escuela puede crear eventos, tales como, exámenes, reuniones, días festivos, etc.",
    Icon: CalendarClock,
  },
];
