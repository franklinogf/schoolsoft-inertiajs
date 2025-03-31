import { ArchiveRestoreIcon, Trash2Icon } from "lucide-react";
import * as React from "react";

import { Label } from "@/Components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/Components/ui/sidebar";
import { Switch } from "@/Components/ui/switch";
import { useTranslations } from "@/hooks/translations";
import { cn, isAdmin, ucfirst } from "@/lib/utils";
import useConfirmationStore from "@/stores/confirmationStore";
import { InboxSideBarMenu, InboxType, TeacherInbox } from "@/types/inbox";
import { Deferred, Link } from "@inertiajs/react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

interface InboxSideBarProps extends React.ComponentProps<typeof Sidebar> {
  sideBarNav: InboxSideBarMenu;
  mails: TeacherInbox[];
  type: InboxType;
  onDeleteMail: (id: number) => void;
  onRestoreMail: (id: number) => void;
}
export function InboxSideBar({
  mails,
  type,
  sideBarNav,
  onDeleteMail,
  onRestoreMail,
  ...props
}: InboxSideBarProps) {
  const { t } = useTranslations();
  const { setOpen } = useSidebar();

  const activeMenu = sideBarNav.menu.find((item) => item.type === type);
  return (
    <Sidebar
      collapsible="icon"
      className="static overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className="bg-card text-card-foreground w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuButton
              tooltip={{
                children: t(sideBarNav.header.title),
                hidden: false,
              }}
              className="px-2.5 md:px-2"
              asChild
            >
              <Link href={sideBarNav.header.route}>
                <sideBarNav.header.icon />
                <span>{t(sideBarNav.header.title)}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {sideBarNav.menu.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={{
                        children: t(item.title),
                        hidden: false,
                      }}
                      onClick={() => {
                        setOpen(true);
                      }}
                      isActive={activeMenu?.type === item.type}
                      className="data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground cursor-pointer px-2.5 md:px-2"
                    >
                      <Link href={item.route}>
                        {<item.icon />}
                        <span>{t(item.title)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter></SidebarFooter>
      </Sidebar>

      <Sidebar collapsible="none" className="bg-card/80 text-card-foreground hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4.5">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              {ucfirst(activeMenu?.title || "")}
            </div>
            {type !== "sent" && (
              <Label className="flex cursor-pointer items-center gap-2 text-sm">
                <span>{t("Sin leer")}</span>
                <Switch className="data-[checked=true]:bg-sidebar-primary shadow-none" />
              </Label>
            )}
          </div>
          {/* <SidebarInput placeholder="Type to search..." /> */}
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              <Deferred data="mails" fallback={<MailInboxFallback />}>
                {mails?.length > 0 ? (
                  <MailInbox
                    mails={mails}
                    onDeleteMail={onDeleteMail}
                    onRestoreMail={onRestoreMail}
                    type={type}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-4 text-sm">
                    <span>{t("No hay mensajes")}</span>
                  </div>
                )}
              </Deferred>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}

function MailInboxFallback() {
  return (
    <div className="flex flex-col gap-2 p-2">
      {Array.from({ length: 5 }, (_, i) => (
        <Skeleton key={i} className="h-30 w-full" />
      ))}
    </div>
  );
}
function MailInbox({
  mails,
  type,
  onDeleteMail,
  onRestoreMail,
}: {
  mails: TeacherInbox[];
  type: InboxType;
  onDeleteMail: (id: number) => void;
  onRestoreMail: (id: number) => void;
}) {
  const { openConfirmation } = useConfirmationStore();
  const { t } = useTranslations();
  return mails.map((mail) => (
    <Link
      href={route("regiweb.options.messages.index", { type, inbox: mail })}
      key={mail.id}
      className={cn(
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground relative flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0",
        { "bg-primary/80 text-primary-foreground": !mail.is_read },
      )}
    >
      <span className="absolute top-0.5 right-1 ml-auto self-start text-xs">
        {mail.datetime_human_readeable}
      </span>
      <span className="line-clamp-1">{mail.subject}</span>
      <span className="text-xs font-bold">
        {isAdmin(mail.sender)
          ? mail.sender.usuario
          : `${mail.sender.nombre} ${mail.sender.apellidos}`}
      </span>
      <span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">{mail.preview}</span>

      {type === "trash" ? (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 bottom-3 size-8 cursor-pointer text-blue-200 hover:bg-blue-200 hover:text-blue-400"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRestoreMail(mail.id);
          }}
        >
          <ArchiveRestoreIcon />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-destructive hover:text-destructive-foreground text-destructive absolute right-2 bottom-3 size-8 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDeleteMail(mail.id);
          }}
        >
          <Trash2Icon />
        </Button>
      )}
    </Link>
  ));
}
