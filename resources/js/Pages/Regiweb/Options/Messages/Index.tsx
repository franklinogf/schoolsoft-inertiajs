import { MessageForm } from "@/Components/forms/MessageForm";
import { InboxSideBar } from "@/Components/InboxSideBar";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Separator } from "@/Components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { Skeleton } from "@/Components/ui/skeleton";
import { useTranslations } from "@/hooks/translations";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { formatDate, formatTime, isAdmin, isImage } from "@/lib/utils";
import useConfirmationStore from "@/stores/confirmationStore";
import type { PageProps, PagePropsWithUser } from "@/types";
import type { InboxSideBarMenu, InboxType, TeacherInbox } from "@/types/inbox";
import { Teacher } from "@/types/teacher";
import { Deferred, router, usePage } from "@inertiajs/react";
import { FileIcon, InboxIcon, PlusCircleIcon, ReplyIcon, SendIcon, Trash2Icon } from "lucide-react";

export default function Page({
  mails,
  mail,
  type,
}: PageProps<{
  mails: TeacherInbox[];
  mail: TeacherInbox | null;
  type: InboxType;
}>) {
  const { t } = useTranslations();
  const { openConfirmation } = useConfirmationStore();

  function handleDeleteMail(id: number) {
    openConfirmation({
      title: t("Eliminar mensaje"),
      description: t("¿Está seguro de que desea eliminar este mensaje?"),
      actionLabel: t("Eliminar"),
      cancelLabel: t("Cancelar"),
      actionVariant: "destructive",
      onAction: () => {
        router.delete(route("regiweb.options.messages.destroy", { inbox: id, type }));
      },
    });
  }

  function handleRestoreMail(id: number) {
    openConfirmation({
      title: t("Restaurar mensaje"),
      description: t("¿Está seguro de que desea restaurar este mensaje?"),
      actionLabel: t("Restaurar"),
      cancelLabel: t("Cancelar"),
      onAction: () => {
        router.post(route("regiweb.options.messages.restore", { inbox: id, type }));
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
      <div className="mx-auto w-full max-w-4xl pb-8">
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
            onRestoreMail={handleRestoreMail}
          />
          <SidebarInset>
            <header className="bg-card sticky top-0 flex shrink-0 items-center gap-2 border-b border-l p-4">
              <SidebarTrigger className="-ml-1" />
              <Deferred data="mail" fallback={<MailHeaderFallback />}>
                <MailHeader mail={mail} onDeleteMail={handleDeleteMail} />
              </Deferred>
            </header>
            <MailBody mail={mail} />
          </SidebarInset>
        </SidebarProvider>
      </div>
    </RegiwebLayout>
  );
}

function MailBody({ mail }: { mail: TeacherInbox | null }) {
  const { t } = useTranslations();
  if (!mail)
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-card-foreground text-lg">{t("Seleccione un mensaje")}</p>
      </div>
    );

  return (
    <div className="bg-card flex flex-1 flex-col gap-4 p-4">
      <section className="flex flex-col gap-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs">{t("Fecha")}:</span>
              <span className="text-xs font-medium">{formatDate(mail.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs">{t("Hora")}:</span>
              <span className="text-xs font-medium">{formatTime(mail.time)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">{t("De")}:</span>
              <span className="text-sm font-medium">
                {isAdmin(mail.sender)
                  ? mail.sender.usuario
                  : `${mail.sender.nombre} ${mail.sender.apellidos}`}
              </span>
            </div>
          </div>
        </div>

        {mail.attachments.length > 0 && (
          <>
            <Separator />

            <div className="relative">
              <ul className="flex gap-2">
                {mail.attachments.map((attachment) => (
                  <li key={attachment.id} className="bg-muted/50 hover:bg-muted/80">
                    <a
                      href={route("regiweb.options.messages.download", {
                        inbox: mail.id,
                        media: attachment.id,
                      })}
                    >
                      <div className="aspect-square w-20">
                        {isImage(attachment.type) ? (
                          <img
                            src={attachment.url}
                            alt={attachment.name}
                            className="aspect-square w-full object-contain"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <FileIcon />
                          </div>
                        )}

                        <span className="line-clamp-1 text-center text-sm font-medium">
                          {attachment.name}
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              <Button className="absolute top-1 right-1" variant="link" asChild>
                <a
                  href={route("regiweb.options.messages.downloadAll", {
                    inbox: mail.id,
                  })}
                >
                  <span>{t("Descargar todos")}</span>
                </a>
              </Button>
            </div>
          </>
        )}
      </section>

      <Separator />

      <div className="prose lg:prose-2xl" dangerouslySetInnerHTML={{ __html: mail.message }} />
      <div>
        {mail.replies.length > 0 && (
          <div className="flex flex-col gap-2">
            <ul className="space-y-2">
              {mail.replies.map((reply) => (
                <li key={reply.id} className="bg-muted/20 flex flex-col gap-2 border-t p-5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {isAdmin(reply.sender)
                        ? reply.sender.usuario
                        : `${reply.sender.nombre} ${reply.sender.apellidos}`}
                    </span>
                    <span className="text-xs font-medium">{formatDate(reply.date)}</span>
                    <span className="text-xs font-medium">{formatTime(reply.time)}</span>
                  </div>
                  <div className="prose-sm" dangerouslySetInnerHTML={{ __html: reply.message }} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
function MailHeader({
  mail,
  onDeleteMail,
}: {
  mail: TeacherInbox | null;
  onDeleteMail: (id: number) => void;
}) {
  const { t } = useTranslations();
  const { openConfirmation } = useConfirmationStore();
  const { auth } = usePage<PagePropsWithUser<Teacher>>().props;
  if (!mail) return null;
  return (
    <div className="flex w-full items-center">
      <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
      <h2 className="text-foreground text-base font-medium">{mail.subject}</h2>

      <div className="ml-auto flex items-center gap-2">
        {mail.sender.id !== auth.user.id && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="size-8" size="icon">
                <ReplyIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-dvh overflow-y-auto sm:max-w-3xl">
              <DialogHeader>
                <DialogTitle>{t("Responder mensaje")}</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>

              <MessageForm
                isReplying
                onSubmit={(post) => {
                  post(
                    route("regiweb.options.messages.reply", {
                      inbox: mail.id,
                    }),
                  );
                }}
              />
            </DialogContent>
          </Dialog>
        )}
        <Button
          variant="destructive"
          size="icon"
          className="size-8"
          onClick={() => {
            onDeleteMail(mail.id);
          }}
        >
          <Trash2Icon />
        </Button>
      </div>
    </div>
  );
}

function MailHeaderFallback() {
  return (
    <div className="flex w-full items-center">
      <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
      <Skeleton className="h-6 w-1/2" />

      <div className="ml-auto flex items-center gap-2">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
      </div>
    </div>
  );
}
