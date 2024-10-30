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
export const SERVICES = [
  {
    title: "Servicio de Implementación",
    description: `Esto incluye la coordinación para las etapas de adiestramientos con sus fechas de implementación.
              Material (manuales, etc.) para el adiestramiento de personal. Seguimiento para que se
              realicen los trabajos requeridos para completar la implementación del sistema School
              Soft para el beneficio de la institución.`,
    Icon: Origami,
  },
  {
    title: "Regiweb",
    description: `El nuevo servicio todo por internet,
      registro completo del maestro, los padres pueden ver las notas o calificaciones de sus
      hijos, puede controlar todas las cuentas y muchas mas.`,
    Icon: Globe,
  },
  {
    title: "Apoyo Técnico",
    description: `Asistencia técnica individual para
      el personal administrativo y docente, por teléfono, por Internet, o control remoto.
      Todas estas opciones de acceso al apoyo técnico están disponibles de acuerdo a la
      necesidad y a las facilidades que estén disponibles en la institución.`,
    Icon: MonitorSpeaker,
  },
  {
    title: "Servicio de Reparación",
    description: `Piezas y
              servicio a los equipos de el colegio, instalados por nuestra compañía.`,
    Icon: Wrench,
  },
  {
    title: "Alquiler de Laboratorio",
    description: `Ofrezca a sus
      estudiantes un laboratorio moderno con todas las aplicaciones como Office 2018, control
      de clases, programas educativos, Antivirus, Windows 10, Windows Server 2018 entre otras
      opciones. Llamenos, mejoramos cualquier oferta por es1rito.`,
    Icon: Computer,
  },
];

export const OTHER_SERVICES = [
  {
    title: "Configuraciones de network.",
  },
  {
    title: "Conexión Inalambrica en todo el colegio.",
  },
  {
    title: "Venta de Computadoras y todo tipo de accesorios.",
  },
  {
    title: "Servicios Mantenimiento a las computadoras.",
  },
  {
    title: "Alquiler de Computadoras para laboratorio.",
  },
  {
    title: "Pagina Web para su colegio.",
  },
] as const;
