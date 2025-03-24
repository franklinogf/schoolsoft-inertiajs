import { Button } from "@/Components/ui/button";
import { Topics } from "@/types/exam";
import { PlusCircleIcon } from "lucide-react";
import { Topic, TopicItem } from "./Topic";

export function TrueFalse({ topic }: { topic: Topics["verdadero_falso"] }) {
  return (
    <Topic amount={topic.preguntas.length} addButton={<AddButton />} title={topic.titulo}>
      {topic.preguntas.map((question) => (
        <TopicItem
          key={question.id}
          label={question.pregunta}
          answer={question.respuesta === "v" ? "Verdadero" : "Falso"}
          value={question.valor}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      ))}
    </Topic>
  );
}

function AddButton() {
  return (
    <Button className="size-6" size="icon">
      <PlusCircleIcon />
    </Button>
  );
}
