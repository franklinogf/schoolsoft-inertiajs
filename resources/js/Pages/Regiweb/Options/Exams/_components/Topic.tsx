import { Badge, badgeVariants } from "@/Components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";
import { EditIcon, Trash2Icon } from "lucide-react";

interface TopicProps {
  addButton: React.ReactNode;
  children: React.ReactNode;
  amount: number;
  title: string;
}
interface TopicItemProps {
  onEdit: () => void;
  onDelete: () => void;
  label: string;
  answer?: string;
  value: number;
}
export function Topic({ addButton, children, amount, title }: TopicProps) {
  return (
    <TooltipProvider>
      <div className="flex flex-col">
        <header className="flex items-center gap-2 p-2">
          <Tooltip>
            <TooltipTrigger asChild>{addButton}</TooltipTrigger>
            <TooltipContent>
              <p>Agregar</p>
            </TooltipContent>
          </Tooltip>
          <h3>{title}</h3>
        </header>
        {amount > 0 ? (
          children
        ) : (
          <p className="text-muted-foreground text-center text-sm">No hay preguntas</p>
        )}
      </div>
    </TooltipProvider>
  );
}

export function TopicItem({ label, answer, value }: TopicItemProps) {
  return (
    <li className="hover:bg-accent/10 flex items-center justify-between gap-2 p-2">
      <span>{label}</span>
      <div className="flex items-center gap-2">
        {answer && (
          <Badge variant="outline">
            {answer.length > 20 ? `${answer.slice(0, 20)}...` : answer}
          </Badge>
        )}
        <Badge variant="outline">{value}</Badge>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className={badgeVariants({ variant: "secondary", className: "h-5" })}>
              <EditIcon />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Editar</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className={badgeVariants({ variant: "destructive", className: "h-5" })}>
              <Trash2Icon />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Eliminar</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </li>
  );
}
