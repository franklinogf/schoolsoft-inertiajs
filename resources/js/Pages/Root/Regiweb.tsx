import { List } from "@/Components/root/List";
import { MaxWidthSection } from "@/Components/root/MaxWidthSection";
import RootLayout from "@/Layouts/Root/RootLayout";
import { Head } from "@inertiajs/react";
import { CalendarClock, Globe, School, Users } from "lucide-react";
const regiweb = [
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
export default function Page() {
  return (
    <RootLayout>
      <Head title="Regiweb" />
      <MaxWidthSection>
        <div className="cointainer mx-auto max-w-4xl">
          <h2 className="title">Regiweb</h2>
          <List items={regiweb} />
        </div>
      </MaxWidthSection>
    </RootLayout>
  );
}
