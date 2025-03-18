import { InboxSideBar } from "@/Components/InboxSideBar";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { useTranslations } from "@/hooks/translations";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { formatDate, formatTime, isAdmin } from "@/lib/utils";
import useConfirmationStore from "@/stores/confirmationStore";
import type { InboxSideBarMenu, InboxType, PageProps, TeacherInbox } from "@/types";
import { router } from "@inertiajs/react";
import { InboxIcon, PlusCircleIcon, SendIcon, Trash2Icon } from "lucide-react";

export default function Page({
  mails,
  mail,
  type,
}: PageProps<{
  mails: TeacherInbox[];
  mail: TeacherInbox | null;
  type: InboxType;
}>) {
  console.log(mails);
  const { t } = useTranslations();
  const { openConfirmation } = useConfirmationStore();
  function handleDeleteMail(id: number) {
    router.delete(route("regiweb.options.messages.destroy", { id }), {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        router.reload();
      },
    });
  }
  const sideBarNav: InboxSideBarMenu = {
    header: {
      title: "Nuevo",
      icon: PlusCircleIcon,
      route: route("regiweb.options.messages.create"),
    },
    menu: [
      {
        title: "Bandeja de entrada",
        route: route("regiweb.options.messages.index", { type: "inbox", inbox: mail?.id }),
        icon: InboxIcon,
        type: "inbox",
      },
      {
        title: "Enviados",
        route: route("regiweb.options.messages.index", { type: "sent", inbox: mail?.id }),
        icon: SendIcon,
        type: "sent",
      },
      {
        title: "Papelera",
        route: route("regiweb.options.messages.index", { type: "trash", inbox: mail?.id }),
        icon: Trash2Icon,
        type: "trash",
      },
    ],
  };
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
          <InboxSideBar
            sideBarNav={sideBarNav}
            mails={mails}
            type={type}
            onDeleteMail={handleDeleteMail}
            onRestoreMail={(id) => {}}
          />
          <SidebarInset>
            <header className="bg-card sticky top-0 flex shrink-0 items-center gap-2 border-b border-l p-4">
              <SidebarTrigger className="-ml-1" />
              {mail && (
                <>
                  <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                  />
                  <h2 className="text-foreground text-base font-medium">{mail.subject}</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-destructive hover:text-destructive-foreground text-destructive absolute right-2 bottom-3 size-8 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openConfirmation({
                        title: t("Eliminar mensaje"),
                        description: t("¿Está seguro de que desea eliminar este mensaje?"),
                        actionLabel: t("Eliminar"),
                        cancelLabel: t("Cancelar"),
                        onAction: () => {
                          handleDeleteMail(mail.id);
                        },
                      });
                    }}
                  >
                    <Trash2Icon />
                  </Button>
                </>
              )}
            </header>

            {mail ? (
              <div className="bg-card flex flex-1 flex-col gap-4 p-4">
                <section className="flex flex-col gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs">Fecha:</span>
                        <span className="text-xs font-medium">{formatDate(mail.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs">Hora:</span>
                        <span className="text-xs font-medium">{formatTime(mail.time)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">De:</span>
                        <span className="text-sm font-medium">
                          {isAdmin(mail.sender)
                            ? mail.sender.usuario
                            : `${mail.sender.nombre} ${mail.sender.apellidos}`}
                        </span>
                      </div>
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

                <div
                  className="prose lg:prose-2xl mx-auto w-full max-w-4xl"
                  dangerouslySetInnerHTML={{ __html: mail.message }}
                />
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-card-foreground text-lg">Seleccione un mensaje</p>
              </div>
            )}
          </SidebarInset>
        </SidebarProvider>
      </div>
    </RegiwebLayout>
  );
}
