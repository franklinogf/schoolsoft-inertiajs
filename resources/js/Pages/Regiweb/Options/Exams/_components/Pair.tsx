import { Button } from "@/Components/ui/button";
import { Topics } from "@/types/exam";
import { PlusCircleIcon } from "lucide-react";
import { Topic, TopicItem } from "./Topic";

export function Pair({ topic }: { topic: Topics["parea"] }) {
  return (
    <Topic amount={topic.preguntas.length} title={topic.titulo} addButton={<AddButton />}>
      {topic.preguntas.map((question) => (
        <TopicItem
          key={question.id}
          label={question.pregunta}
          answer={topic.respuestas
            .find((answer) => answer.id === question.respuesta_c)
            ?.respuesta.toString()}
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
