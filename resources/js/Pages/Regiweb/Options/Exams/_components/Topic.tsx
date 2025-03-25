import { Badge, badgeVariants } from "@/Components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";
import useConfirmationStore from "@/stores/confirmationStore";
import { Trash2Icon } from "lucide-react";

interface TopicProps {
  addButton: React.ReactNode;
  children: React.ReactNode;
  amount: number;
  title: string;
}
interface TopicItemProps {
  editButton: React.ReactNode;
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
          {addButton}
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

export function TopicItem({ label, answer, value, editButton, onDelete }: TopicItemProps) {
  const { openConfirmation } = useConfirmationStore();
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
          <TooltipTrigger asChild>{editButton}</TooltipTrigger>
          <TooltipContent>
            <p>Editar</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={badgeVariants({ variant: "destructive", className: "h-5" })}
              onClick={() => {
                openConfirmation({
                  title: "Eliminar pregunta",
                  description: "¿Estás seguro de que deseas eliminar esta pregunta?",
                  onAction: onDelete,
                  actionVariant: "destructive",
                  actionLabel: "Eliminar",
                  cancelLabel: "Cancelar",
                });
              }}
            >
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
