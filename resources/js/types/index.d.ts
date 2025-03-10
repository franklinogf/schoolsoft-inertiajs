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

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  flash: {
    success: string | null;
    error: string | null;
    errorList: Errors | null;
  };
  errors: Errors;
  locale: string;
  csrf_token: string;
};

export type PagePropsWithUser<
  U,
  T extends Record<string, unknown> = Record<string, unknown>,
> = PageProps<T> & {
  auth: {
    user: U;
  };
};
