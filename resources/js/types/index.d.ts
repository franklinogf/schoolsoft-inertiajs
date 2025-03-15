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
type Theme = {
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  popover: string;
  popoverForeground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  radius: string;
};
type Themes = {
  light: Theme;
  dark: Theme;
};
export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  flash: {
    success: string | null;
    error: string | null;
    errorList: Errors | null;
  };
  errors: Errors;
  locale: string;
  csrf_token: string;
  theme: {
    current: keyof Themes;
    themes: Themes;
  };
};

export type PagePropsWithUser<
  U,
  T extends Record<string, unknown> = Record<string, unknown>,
> = PageProps<T> & {
  auth: {
    user: U;
  };
};
