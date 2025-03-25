import { InputField } from "@/Components/forms/inputs/InputField";
import SubmitButton from "@/Components/forms/SubmitButton";
import { Badge, badgeVariants } from "@/Components/ui/badge";
import { useTranslations } from "@/hooks/translations";
import useConfirmationStore from "@/stores/confirmationStore";
import { InertiaHTTPMethod } from "@/types";
import { useForm } from "@inertiajs/react";
import { CheckCircle2Icon, SaveIcon, Trash2Icon } from "lucide-react";

interface TopicProps {
  addButton: React.ReactNode;
  children: React.ReactNode;
  amount: number;
  title: string;
  onTitleSubmit: (post: InertiaHTTPMethod) => void;
}
interface TopicItemProps {
  editButton: React.ReactNode;
  onDelete: () => void;
  label: string;
  answer?: string;
  value: number;
}
export function Topic({ addButton, children, amount, title, onTitleSubmit }: TopicProps) {
  const { t } = useTranslations();
  const { data, setData, processing, put, recentlySuccessful } = useForm({
    titulo: title,
  });

  return (
    <div className="flex flex-col">
      <header className="flex items-center gap-2 p-2">
        {addButton}
        <form
          className="flex w-full gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            onTitleSubmit(put);
          }}
        >
          <InputField
            placeholder={t("Título")}
            value={data.titulo}
            onChange={(value) => {
              setData("titulo", value);
            }}
            className="flex-1"
          />
          <SubmitButton
            disabled={data.titulo === title}
            isSubmitting={processing}
            variant="outline"
            size="icon"
          >
            {recentlySuccessful ? <CheckCircle2Icon /> : <SaveIcon />}
          </SubmitButton>
        </form>
      </header>
      {amount > 0 ? (
        children
      ) : (
        <p className="text-muted-foreground text-center text-sm">No hay preguntas</p>
      )}
    </div>
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
        {editButton}
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
      </div>
    </li>
  );
}
