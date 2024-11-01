import { type Admin } from "@/types/auth";

export interface Document {
  id: number;
  categoria: string;
  titulo: string;
  descripcion: string;
  fecha_desde: string;
  fecha_hasta: string;
  archivo: string;
  grado_desde: string;
  grado_hasta: string;
}
export type Errors = { [key: string]: string };
export type PageProps = {
  flash: {
    success: string | null;
    error: string | null;
    errorList: Errors | null;
  };
  errors: Errors;
};
export type PagePropsWithUser<T> = PageProps & {
  auth: {
    user: T;
  };
};
export type PagePropsWithSchool = PageProps & {
  school: Admin;
};

export type PagePropsWithSchoolAndUser<T> = PagePropsWithSchool & PagePropsWithUser<T>;
