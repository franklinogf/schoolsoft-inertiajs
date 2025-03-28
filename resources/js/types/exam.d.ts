import { YesNoEnum } from "@/Enums";
import type { Teacher } from "./teacher";

export type TrueFalseTopic = {
  id: number;
  examen?: Exam;
  pregunta: string;
  respuesta: "v" | "f";
  valor: number;
};

export type SelectTopic = {
  id: number;
  examen?: Exam;
  pregunta: string;
  correcta: number;
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

export type QuestionTopic = {
  id: number;
  examen?: Exam;
  pregunta: string;
  lineas: number;
  valor: number;
};

export type BlankLinesTopic = {
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

export type PairTopic = {
  id: number;
  examen?: Exam;
  pregunta: string;
  valor: number;
  respuesta_c: number;
};

export type PairAnswer = {
  id: number;
  examen?: Exam;
  respuesta: string;
};

type Topic<T> = {
  titulo: string;
  preguntas: T[];
};

export type Topics = {
  verdadero_falso: Topic<TrueFalseTopic>;
  selecciona: Topic<SelectTopic>;
  preguntas: Topic<QuestionTopic>;
  lineas_blanco: Topic<BlankLinesTopic>;
  parea: Topic<PairTopic> & {
    respuestas: PairAnswer[];
  };
};

export interface Exam {
  id: number;
  profesor?: Teacher;
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
