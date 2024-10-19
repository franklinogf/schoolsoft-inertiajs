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
export type PagePropsWithFlashMessage = {
  flash: {
    message: string | null;
  };
};
export type PagePropsWithUser<T> = PagePropsWithFlashMessage & {
  auth: {
    user: T;
  };
};
export type PagePropsWithSchool = PagePropsWithFlashMessage & {
  school: Admin;
};

export type PagePropsWithSchoolAndUser<T> = PagePropsWithSchool & PagePropsWithUser<T>;
