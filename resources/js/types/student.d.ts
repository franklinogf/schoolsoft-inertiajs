export interface StudentGrade {
  id?: string; // char(7)
  padre: string; // char(35)
  madre: string; // char(35)
  nombre: string; // char(25)
  apellidos: string; // char(30)
  descripcion: string; // char(100)
  grado: string; // char(5)
  curso: string; // char(7)
  profesor: string; // char(35)
  hora: string; // char(7)
  dias: string; // char(5)
  nota1: string; // char(4)
  nota2: string; // char(4)
  nota3: string; // char(4)
  nota4: string; // char(4)
  con1: string; // varchar(3)
  con2: string; // varchar(3)
  con3: string; // varchar(3)
  con4: string; // varchar(3)
  sem1: string; // char(3)
  sem2: string; // char(3)
  credito: string; // varchar(4)
  final: string; // char(3)
  usuario: string; // char(20)
  clave: string; // char(20)
  desc2: string; // char(100)
  email: string; // char(35)
  idioma: string; // char(7)
  not1: string; // char(3)
  not2: string; // char(3)
  not3: string; // char(3)
  not4: string; // char(3)
  not5: string; // char(3)
  not6: string; // char(3)
  not7: string; // char(3)
  not8: string; // char(3)
  not9: string; // char(3)
  not10: string; // char(3)
  not11: string; // char(3)
  not12: string; // char(3)
  not13: string; // char(3)
  not14: string; // char(3)
  not15: string; // char(3)
  not16: string; // char(3)
  not17: string; // char(3)
  not18: string; // char(3)
  not19: string; // char(3)
  not20: string; // char(3)
  tpa1: string; // char(4)
  tpa2: string; // char(4)
  tpa3: string; // char(4)
  tpa4: string; // char(4)
  por1: string; // char(4)
  por2: string; // char(4)
  por3: string; // char(4)
  por4: string; // char(4)
  ss: string; // char(11)
  not21: string; // char(3)
  not22: string; // char(3)
  not23: string; // char(3)
  not24: string; // char(3)
  not25: string; // char(3)
  not26: string; // char(3)
  not27: string; // char(3)
  not28: string; // char(3)
  not29: string; // char(3)
  not30: string; // char(3)
  not31: string; // char(3)
  not32: string; // char(3)
  not33: string; // char(3)
  not34: string; // char(3)
  not35: string; // char(3)
  not36: string; // char(3)
  not37: string; // char(3)
  not38: string; // char(3)
  not39: string; // char(3)
  not40: string; // char(3)
  letra: string; // char(4)
  aus1: string; // char(3)
  aus2: string; // char(3)
  aus3: string; // char(3)
  aus4: string; // char(3)
  tar1: string; // char(3)
  tar2: string; // char(3)
  tar3: string; // char(3)
  tar4: string; // char(3)
  tl1: string; // char(4)
  tl2: string; // char(4)
  tl3: string; // char(4)
  tl4: string; // char(4)
  td1: string; // char(4)
  td2: string; // char(4)
  td3: string; // char(4)
  td4: string; // char(4)
  year: string; // char(5)
  id2: string; // char(7)
  nota_por: string; // char(1)
  ptd1: string; // char(4)
  ptd2: string; // char(4)
  ptd3: string; // char(4)
  ptd4: string; // char(4)
  ptl1: string; // char(4)
  ptl2: string; // char(4)
  ptl3: string; // char(4)
  ptl4: string; // char(4)
  pal: string; // char(10)
  sutri: string; // char(10)
  sie1: string; // char(1)
  sie2: string; // char(1)
  sie3: string; // char(1)
  sie4: string; // char(1)
  sie5: string; // char(1)
  sie6: string; // char(1)
  sie7: string; // char(1)
  sie8: string; // char(1)
  pc1: string; // char(4)
  pc2: string; // char(4)
  pc3: string; // char(4)
  pc4: string; // char(4)
  tpc1: string; // char(4)
  tpc2: string; // char(4)
  tpc3: string; // char(4)
  tpc4: string; // char(4)
  control: string; // varchar(10)
  ex1: string; // char(3)
  ex2: string; // char(3)
  de1: string; // char(2)
  de2: string; // char(2)
  de3: string; // char(2)
  de4: string; // char(2)
  com1: string; // char(2)
  com2: string; // char(2)
  com3: string; // char(2)
  com4: string; // char(2)
  verano: string; // char(1)
  baja: string; // char(2)
  orden: number; // int(2)
  ava: string; // varchar(2)
  valor: number; // float(4,2)
  aa: number; // int(11)
  average1: number; // int(11)
  average2: number; // int(11)
  average3: number; // int(11)
  average4: number; // int(11)
  peso: number; // float(4,2)
}

export interface Student {
  ss?: string; // Corresponds to `char(11)`
  year?: string; // Corresponds to `char(5)`
  grado: string; // Corresponds to `char(5)`
  nombre: string; // Corresponds to `char(25)`
  apellidos: string; // Corresponds to `char(35)`
  id: number; // Corresponds to `int(7)`
  genero: string; // Corresponds to `char(1)`
  rema: string; // Corresponds to `char(2)`
  fecha: string; // Corresponds to `date`
  cta: string; // Corresponds to `char(15)`
  alias: string; // Corresponds to `char(25)`
  verano: string; // Corresponds to `char(1)`
  clase_verano: string; // Corresponds to `char(2)`
  fechagra: string; // Corresponds to `date`
  vivecon: string; // Corresponds to `char(12)`
  activo: string; // Corresponds to `char(10)`
  beca: string; // Corresponds to `char(2)`
  desc_men: string; // Corresponds to `char(7)`
  desc_mat: string; // Corresponds to `char(7)`
  desc_otro1: string; // Corresponds to `char(7)`
  desc_otro2: string; // Corresponds to `char(7)`
  fecha_baja: string; // Corresponds to `date`
  mat_retenida: string; // Corresponds to `char(2)`
  tr1: number; // Corresponds to `float(10,2)`
  tr2: number; // Corresponds to `float(6,2)`
  se1: number; // Corresponds to `float(6,2)`
  tr3: number; // Corresponds to `float(6,2)`
  tr4: number; // Corresponds to `float(6,2)`
  se2: number; // Corresponds to `float(6,2)`
  fin: number; // Corresponds to `float(6,2)`
  crs: string; // Corresponds to `char(4)`
  cn1: string; // Corresponds to `char(7)`
  cn2: string; // Corresponds to `char(7)`
  cns1: string; // Corresponds to `char(7)`
  cn3: string; // Corresponds to `char(7)`
  cn4: string; // Corresponds to `char(7)`
  cns2: string; // Corresponds to `char(7)`
  cnf: string; // Corresponds to `char(50)`
  cursos: string; // Corresponds to `char(2)`
  cel: string; // Corresponds to `char(10)`
  comp: string; // Corresponds to `char(15)`
  nuref: string; // Corresponds to `varchar(10)`
  lugar_nac: string; // Corresponds to `varchar(25)`
  imp1: string; // Corresponds to `varchar(35)`
  imp2: string; // Corresponds to `varchar(35)`
  imp3: string; // Corresponds to `varchar(35)`
  imp4: string; // Corresponds to `varchar(35)`
  enf1: string; // Corresponds to `varchar(40)`
  enf2: string; // Corresponds to `varchar(40)`
  enf3: string; // Corresponds to `varchar(40)`
  enf4: string; // Corresponds to `varchar(40)`
  med1: string; // Corresponds to `varchar(40)`
  med2: string; // Corresponds to `varchar(40)`
  med3: string; // Corresponds to `varchar(40)`
  med4: string; // Corresponds to `varchar(40)`
  rec1: string; // Corresponds to `varchar(40)`
  rec2: string; // Corresponds to `varchar(40)`
  rec3: string; // Corresponds to `varchar(40)`
  rec4: string; // Corresponds to `varchar(40)`
  medico: string; // Corresponds to `varchar(35)`
  tel1: string; // Corresponds to `varchar(13)`
  tel2: string; // Corresponds to `varchar(13)`
  religion: string; // Corresponds to `char(20)`
  iglesia: string; // Corresponds to `char(40)`
  bau: string; // Corresponds to `char(40)`
  com: string; // Corresponds to `char(40)`
  con: string; // Corresponds to `char(40)`
  fbau: string; // Corresponds to `date`
  fcom: string; // Corresponds to `date`
  fcon: string; // Corresponds to `date`
  desc1: string; // Corresponds to `varchar(40)`
  desc2: string; // Corresponds to `varchar(40)`
  desc3: string; // Corresponds to `varchar(40)`
  desc4: string; // Corresponds to `varchar(40)`
  nuevo: string; // Corresponds to `varchar(2)`
  fecha_matri: string; // Corresponds to `date`
  codigobaja: number; // Corresponds to `int(4)`
  edad: number; // Corresponds to `int(2)`
  gra2: string; // Corresponds to `varchar(5)`
  imagen?: Blob; // Corresponds to `longblob`
  tipo: string; // Corresponds to `varchar(15)`
  act2: string; // Corresponds to `varchar(10)`
  usuario: string; // Corresponds to `varchar(25)`
  clave: string; // Corresponds to `varchar(25)`
  tipo_foro?: number; // Corresponds to `int(11)`
  mt: number; // Corresponds to `int(11)` (Auto-incremented Primary Key)
  email: string; // Corresponds to `varchar(200)`
  avatar?: string; // Corresponds to `varchar(20)`
  padre: string; // Corresponds to `varchar(1)`
  nombre_padre: string; // Corresponds to `varchar(50)`
  dir1: string; // Corresponds to `varchar(50)`
  dir2: string; // Corresponds to `varchar(50)`
  pueblo: string; // Corresponds to `varchar(15)`
  estado: string; // Corresponds to `varchar(4)`
  zip: string; // Corresponds to `varchar(12)`
  colpro: string; // Corresponds to `varchar(40)`
  cdb1: string; // Corresponds to `varchar(5)`
  cdb2: string; // Corresponds to `varchar(5)`
  cdb3: string; // Corresponds to `varchar(5)`
  pop: string; // Corresponds to `varchar(1)`
  celp: string; // Corresponds to `varchar(13)`
  emailp: string; // Corresponds to `varchar(70)`
  telp: string; // Corresponds to `varchar(13)`
  id3: string; // Corresponds to `varchar(4)`
  raza: number; // Corresponds to `int(2)`
  rel: number; // Corresponds to `int(2)`
  cantidad: number; // Corresponds to `float(7,2)`
  cantidad_alerta: number; // Corresponds to `float(7,2)`
  f_deposito: string; // Corresponds to `date`
  cbarra: string; // Corresponds to `varchar(20)`
  avisar: string; // Corresponds to `varchar(2)`
  transporte: number; // Corresponds to `int(2)`
  municipio: string; // Corresponds to `varchar(25)`
  acomodo: string; // Corresponds to `varchar(2)`
  trajo: string; // Corresponds to `varchar(2)`
  emaile: string; // Corresponds to `varchar(70)`
  zona: string; // Corresponds to `varchar(10)`
  ent: string; // Corresponds to `varchar(1)`
  ip: string; // Corresponds to `varchar(25)`
  datem: string; // Corresponds to `date`
  horam: string; // Corresponds to `varchar(25)`
  tmat: number; // Corresponds to `float(8,2)`
  matri: string; // Corresponds to `varchar(2)`
  her: string; // Corresponds to `varchar(2)`
  pago: string; // Corresponds to `varchar(10)`
  feg2: string; // Corresponds to `varchar(25)`
  feg: string; // Corresponds to `varchar(25)`
  re_ma: string; // Corresponds to `varchar(2)`
  cuota?: number; // Corresponds to `float(10,2)`
  major?: string; // Corresponds to `varchar(1)`
}
