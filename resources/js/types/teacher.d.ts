import { TeacherAuth } from "@/types/auth";

interface Grade {
  id: string;
  curso: string;
  year: string;
  descripcion: string;
  credito: number;
  peso: number;
  entrada: string;
  salida: string;
  dias: string;
  maestro: string;
  matri: number;
  total: number;
  ava: string;
  valor: number;
  orden: string;
  verano: string;
  mt: number;
}

export interface Teacher extends TeacherAuth {
  grades?: Grade[];
}
