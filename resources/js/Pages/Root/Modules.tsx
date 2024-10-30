import { List } from "@/Components/root/List";
import { MaxWidthSection } from "@/Components/root/MaxWidthSection";
import RootLayout from "@/Layouts/Root/RootLayout";
import { Head } from "@inertiajs/react";
import { BadgeInfo, BriefcaseBusiness, FileCheck, NotebookPen, PieChart } from "lucide-react";
const modules = [
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
export default function Page() {
  return (
    <RootLayout>
      <Head title="Modulos" />
      <MaxWidthSection>
        <div className="cointainer mx-auto max-w-4xl">
          <h2 className="title">Modulos</h2>
          <List items={modules} />
        </div>
      </MaxWidthSection>
    </RootLayout>
  );
}
