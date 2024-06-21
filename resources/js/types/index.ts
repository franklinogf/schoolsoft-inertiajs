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
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Hour = `${0 | 1}${Digit}` | `2${0 | 1 | 2 | 3}`;
type Minute = `${0 | 1 | 2 | 3 | 4 | 5}${Digit}`;
type Time = `${Hour}:${Minute}`;

type Year = `19${Exclude<Digit, 0 | 1 | 2 | 3>}${Digit}` | `${19 | 20}${Digit}${Digit}`;
type Month = `0${Exclude<Digit, 0>}` | `1${0 | 1 | 2}`;
type Day = `${0 | 1 | 2}${Exclude<Digit, 0>}` | `3${0 | 1}`;

type Date_ = `${Year}-${Month}-${Day}`;

type Grade = `${Digit}${Digit}` | `${Char}${Char}` | `${Digit}${Char}` | `${Char}${Digit}`;
type FullGrade = `${Digit}${Exclude<Digit, 0>}-${Digit}${Exclude<Digit, 0>}`;

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}

export interface School {
  colegio: string;
  dir1: string;
  dir2: string;
  pueblo1: string;
  esta1: string;
  zip1: string;
  dir3: string;
  dir4: string;
  pueblo2: string;
  esta2: string;
  zip2: string;
  correo: string;
  telefono: string;
  fax: string;
  logo: string;
  foto: string;
  director: string;
  usuario: string;
  clave: string;
  principal: string;
  pagina: string;
  idioma: string;
  filename: string;
  filename2: string;
  filesize: string;
  filesize2: string;
  filetype: string;
  filetype2: string;
  description: string;
  ft1: Date_;
  ft2: Date_;
  ft3: Date_;
  ft4: Date_;
  ft5: Date_;
  ft6: Date_;
  ft7: Date_;
  ft8: Date_;
  men_ini: string;
  men_nota: string;
  grupo: string;
  activo: string;
  ufecha: Date_;
  id: string;
  year: string;
  Colegio2: string;
  dir5: string;
  dir6: string;
  pueblo3: string;
  est3: string;
  zip3: string;
  tel3: string;
  tel4: string;
  pag_ini2: string;
  fax2: string;
  email3: string;
  email4: string;
  a: string;
  b: string;
  c: string;
  d: string;
  f: string;
  sutri: string;
  vala: string;
  valb: string;
  valc: string;
  vald: string;
  valf: string;
  sie: string;
  sieab: string;
  asist: string;
  asis: string;
  curso: string;
  por1: string;
  por2: string;
  por3: string;
  cv: string;
  np: string;
  teg: string;
  tr1: string;
  tr2: string;
  tr3: string;
  tr4: string;
  vt1: string;
  vt2: string;
  vt3: string;
  vt4: string;
  email5: string;
  cm: string;
  tpa: string;
  nin: string;
  tarjeta: string;
  forzar: string;
  clavepadre: string;
  nivel: string;
  fechav1: Date_;
  fechav2: Date_;
  nota: string;
  prom: string;
  cant: string;
  sem: string;
  nota2: string;
  prom2: string;
  cant2: string;
  sem2: string;
  nota3: string;
  prom3: string;
  cant3: string;
  sem3: string;
  bo1: string;
  bo2: string;
  bo3: string;
  bo4: string;
  mensa: string;
  tar: string;
  men_inac: string;
  inactivo: string;
  year2: string;
  vs1: string;
  vs2: string;
  vf: string;
  ns1: string;
  ns2: string;
  nf: string;
  bloqueo: string;
  codigo: string;
  bloqueoauto: string;
  des1: string;
  des2: string;
  des3: string;
  controlb: string;
  param1: string;
  param2: string;
  param3: string;
  param4: string;
  param5: string;
  param6: string;
  esn: number;
  esncodigo: string;
  esnmes: string;
  act_paypal: string;
  email_paypal: string;
  costo: number;
  caja: number;
  rec: string;
  asis1: Date_;
  asis2: Date_;
  asis3: Date_;
  asis4: Date_;
  asis5: Date_;
  asis6: Date_;
  asis7: Date_;
  asis8: Date_;
  clave_email: string;
  host_smtp: string;
  port: number;
  email_smtp: string;
  host: string;
  tri: number;
  fec_t: Date_;
  se1: string;
  se2: string;
  fin: string;
  paypalcodigo: string;
  enf: string;
  nmf: string;
  dia_vence: number;
  etd: string;
  npn: string;
  cppd: string;
  codc1: string;
  codc2: number;
  suantri: string;
  nel: string;
  chk: string;
  not1: string;
  not2: string;
  fra: number;
  vnf: string;
  hdp: string;
  hdt: number;
  token_whatsapp: string | null;
  cel_whatsapp: string | null;
  rema_msg: string | null;
  can_min: number;
  ip7: string;
  fecha7: string;
  hora7: string;
}
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
export type PageProps = {
  flash?: {
    message: string | null;
  };
};
export type PagePropsWithUser<T extends Record<string, unknown> = Record<string, unknown>> = T &
  PageProps & {
    auth: {
      user: User;
    };
  };
export type PagePropsWithSchool<T extends Record<string, unknown> = Record<string, unknown>> = T &
  PageProps & {
    school: School;
  };

export type PagePropsWithSchoolAndUser = PagePropsWithSchool & PagePropsWithUser;
