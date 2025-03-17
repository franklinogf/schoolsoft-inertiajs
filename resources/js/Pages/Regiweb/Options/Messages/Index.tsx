import { InboxSideBar } from "@/Components/InboxSideBar";
import { Separator } from "@/Components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";

export default function Page() {
  return (
    <RegiwebLayout title="Mensajes">
      <div className="w-full pb-8">
        <SidebarProvider
          className="shadow-sm"
          style={
            {
              "--sidebar-width": "350px",
            } as React.CSSProperties
          }
        >
          <InboxSideBar />
          <SidebarInset>
            <header className="bg-card sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <h2 className="text-foreground text-base font-medium">Message subject</h2>
            </header>
            <div className="bg-card flex flex-1 flex-col gap-4 p-4">
              <section className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">De:</span>
                    <span className="text-sm font-medium">Nombre</span>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Fecha:</span>
                    <span className="text-sm font-medium"></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Hora:</span>
                    <span className="text-sm font-medium"></span>
                  </div>
                </div>
                <Separator />

                <ul className="flex gap-2">
                  <li className="flex items-center gap-2">
                    <span className="text-sm font-medium">Archivo 1</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-sm font-medium">Archivo 2</span>
                  </li>
                </ul>
              </section>

              <Separator />

              <p className="text-card-foreground text-sm">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem ex, fuga
                laboriosam, quidem autem nobis odio, omnis adipisci alias blanditiis earum
                temporibus aliquid maxime expedita laborum incidunt possimus. At, fugit!
              </p>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </RegiwebLayout>
  );
}
