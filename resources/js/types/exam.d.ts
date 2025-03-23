import { YesNoEnum } from "@/Enums";
import type { Teacher } from "./teacher";

type TrueFalseTopic = {
  id: number;
  examen?: Exam;
  pregunta: string;
  respuesta: string;
  valor: number;
};

type SelectTopic = {
  id: number;
  examen?: Exam;
  pregunta: string;
  respuesta: string;
  valor: number;
  respuestas: {
    respuesta1: string;
    respuesta2: string;
    respuesta3: string;
    respuesta4: string;
    respuesta5: string;
    respuesta6: string;
    respuesta7: string;
    respuesta8: string;
  };
};

type QuestionTopic = {
  id: number;
  examen?: Exam;
  pregunta: string;
  lineas: number;
  valor: number;
};

type BlankLinesTopic = {
  id: number;
  examen?: Exam;
  pregunta: string;
  valor: number;
  respuestas: {
    respuesta1: string;
    respuesta2: string;
    respuesta3: string;
    respuesta4: string;
    respuesta5: string;
  };
};

type PairTopic = {
  id: number;
  examen?: Exam;
  pregunta: string;
  valor: number;
  respuesta_c: number;
};

type PairAnswer = {
  id: number;
  examen?: Exam;
  respuesta: string;
};

type Topic<T> = {
  titulo: string;
  preguntas: T[];
};

type Topics = {
  verdadero_falso: Topic<TrueFalseTopic>;
  selecciona: Topic<SelectTopic>;
  preguntas: Topic<QuestionTopic>;
  lineas_blanco: Topic<BlankLinesTopic>;
  parea: Topic<PairTopic> & {
    respuestas: PairAnswer[];
  };
};

interface Exam {
  id: number;
  profesor: Teacher;
  titulo: string;
  curso: string;
  valor: number;
  valor2: number;
  ver_nota: YesNoEnum;
  fecha: string;
  hora: string;
  hora_final: string;
  activo: YesNoEnum;
  tiempo: number;
  temas: Topics;
}
