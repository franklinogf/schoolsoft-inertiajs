import { Admin } from "./auth";

type Char =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";
export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Hour = `${0 | 1}${Digit}` | `2${0 | 1 | 2 | 3}`;
export type Minute = `${0 | 1 | 2 | 3 | 4 | 5}${Digit}`;
export type Time = `${Hour}:${Minute}`;

export type Year = `19${Exclude<Digit, 0 | 1 | 2 | 3>}${Digit}` | `${19 | 20}${Digit}${Digit}`;
export type Month = `0${Exclude<Digit, 0>}` | `1${0 | 1 | 2}`;
export type Day = `${0 | 1 | 2}${Exclude<Digit, 0>}` | `3${0 | 1}`;

export type Date_ = `${Year}-${Month}-${Day}`;
export type Grade = `${Digit}${Digit}` | `${Char}${Char}` | `${Digit}${Char}` | `${Char}${Digit}`;
export type FullGrade = `${Digit}${Exclude<Digit, 0>}-${Digit}${Exclude<Digit, 0>}`;

export interface Document {
  id: number;
  categoria: string;
  titulo: string;
  descripcion: string;
  fecha_desde: string;
  fecha_hasta: string;
  archivo: string;
  grado_desde: Grade;
  grado_hasta: Grade;
}
export type PagePropsWithFlashMessage = {
  flash?: {
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
