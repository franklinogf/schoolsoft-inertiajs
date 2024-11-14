type Grade = {
  value: string;
  column: string;
};

type GlobalProps = {
  id: number;
  nombre: string;
  apellidos: string;
  changed: boolean;
};

export interface StudentsDefaultGrades extends GlobalProps {
  notas: {
    [key: string]: Grade;
    nota1: Grade;
    nota2: Grade;
    nota3: Grade;
    nota4: Grade;
    nota5: Grade;
    nota6: Grade;
    nota7: Grade;
    nota8: Grade;
    nota9: Grade;
    nota10: Grade;
  };
  total: string;
  tdia: string;
  tlib: string;
  pcor: string;
  tpa: string;
  tdp: string;
  tdiaTdp: string;
  tlibTdp: string;
  pcorTdp: string;
}

export type StudentAttendaceGradeKey = "conduct" | "absence" | "tardy" | "demerits";
export type StudentsAttendanceGrades = Record<StudentAttendaceGradeKey, Grade> & GlobalProps;

export interface StudentsExamGrades extends GlobalProps {
  nota: Grade;
}

export type StudentsGrades = StudentsDefaultGrades | StudentsAttendanceGrades | StudentsExamGrades;
