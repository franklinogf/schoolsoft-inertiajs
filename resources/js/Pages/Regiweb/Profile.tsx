import { FormCheckbox } from "@/Components/FormCheckbox";
import { FormDatePicker } from "@/Components/FormDatepicker";
import { FormInput } from "@/Components/FormInput";
import { FormSelect } from "@/Components/FormSelect";
import { InputsGrid } from "@/Components/InputsGrid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import {
  GENDERS_SELECT,
  PHONE_COMPANIES_SELECT,
  TEACHER_LEVEL_SELECT,
  YES_NO_SELECT,
} from "@/Constants";
import { YesNoEnum } from "@/Enums";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { formatDateToString } from "@/lib/utils";
import { PagePropsWithUser } from "@/types";
import { Teacher } from "@/types/auth";
import { useForm } from "@inertiajs/react";
import { ArrowUpDown, User2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ProfilePage({ auth: { user } }: PagePropsWithUser<Teacher>) {
  const [sameAddress, setSameAddress] = useState(false);
  const { t } = useTranslation();
  const { data, setData, patch, errors, processing } = useForm({
    fecha_nac: user.fecha_nac,
    nombre: user.nombre,
    apellidos: user.apellidos,
    genero: user.genero,
    email1: user.email1,
    email2: user.email2,
    tel_res: user.tel_res,
    tel_emer: user.tel_emer,
    cel: user.cel,
    cel_com: user.cel_com,
    dir1: user.dir1,
    dir2: user.dir2,
    dir3: user.dir3,
    dir4: user.dir4,
    pueblo1: user.pueblo1,
    pueblo2: user.pueblo2,
    esta1: user.esta1,
    esta2: user.esta2,
    zip1: user.zip1,
    zip2: user.zip2,
    alias: user.alias,
    posicion: user.posicion,
    nivel: user.nivel,
    preparacion1: user.preparacion1,
    preparacion2: user.preparacion2,
    fecha_ini: user.fecha_ini,
    fecha_daja: user.fecha_daja,
    re_e: user.re_e,
    club1: user.club1,
    club2: user.club2,
    club3: user.club3,
    club4: user.club4,
    club5: user.club5,
    pre1: user.pre1,
    pre2: user.pre2,
    pre3: user.pre3,
    pre4: user.pre4,
    pre5: user.pre5,
    vi1: user.vi1,
    vi2: user.vi2,
    vi3: user.vi3,
    vi4: user.vi4,
    vi5: user.vi5,
    se1: user.se1,
    se2: user.se2,
    se3: user.se3,
    se4: user.se4,
    se5: user.se5,
    lic1: user.lic1,
    lic2: user.lic2,
    lic3: user.lic3,
    lic4: user.lic4,
    lp1: user.lp1,
    lp2: user.lp2,
    lp3: user.lp3,
    lp4: user.lp4,
    fex1: user.fex1,
    fex2: user.fex2,
    fex3: user.fex3,
    fex4: user.fex4,
  });

  function residentialAddressToPostalAddress() {
    setSameAddress(true);
    data.dir3 = data.dir1;
    data.dir4 = data.dir2;
    data.pueblo2 = data.pueblo1;
    data.esta2 = data.esta1;
    data.zip2 = data.zip1;
  }
  function clearPostalAddress() {
    setSameAddress(false);
    data.dir3 = "";
    data.dir4 = "";
    data.pueblo2 = "";
    data.esta2 = "";
    data.zip2 = "";
  }
  return (
    <RegiwebLayout user={user} title={t("Perfil")}>
      <div className="flex grow flex-col gap-8 p-2">
        <h1 className="mx-auto flex max-w-2xl items-center gap-2 text-balance text-center text-4xl font-bold">
          {t("Mi perfil")}
          <User2 className="size-8" />
        </h1>

        <section className="mt-5 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("Información personal")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <InputsGrid>
                  <FormInput
                    value={data.nombre}
                    onChange={(e) => {
                      setData("nombre", e.target.value);
                    }}
                    error={errors.nombre}
                    label="Nombre"
                  />
                  <FormInput
                    value={data.apellidos}
                    onChange={(e) => {
                      setData("apellidos", e.target.value);
                    }}
                    error={errors.apellidos}
                    label="Apellidos"
                  />
                </InputsGrid>
                <InputsGrid>
                  <FormSelect
                    value={data.genero}
                    onChange={(value) => {
                      setData("genero", value);
                    }}
                    items={GENDERS_SELECT}
                    label="Genero"
                    error={errors.genero}
                  />
                  <FormDatePicker
                    selected={data.fecha_nac}
                    onSelect={(value) => {
                      setData("fecha_nac", formatDateToString(value));
                    }}
                    label="Fecha de nacimiento"
                    error={errors.fecha_nac}
                  />
                </InputsGrid>
                <FormInput
                  value={data.email1}
                  type="email"
                  onChange={(e) => {
                    setData("email1", e.target.value);
                  }}
                  label="Correo principal"
                  error={errors.email1}
                />
                <FormInput
                  value={data.email2}
                  type="email"
                  onChange={(e) => {
                    setData("email2", e.target.value);
                  }}
                  label="Correo secundario"
                  error={errors.email2}
                />
                <InputsGrid>
                  <FormInput
                    value={data.tel_res}
                    type="tel"
                    onChange={(e) => {
                      setData("tel_res", e.target.value);
                    }}
                    label="Telefono residencial"
                    error={errors.tel_res}
                  />
                  <FormInput
                    value={data.tel_emer}
                    type="tel"
                    onChange={(e) => {
                      setData("tel_emer", e.target.value);
                    }}
                    label="Contacto de emergencia"
                    error={errors.tel_emer}
                  />
                </InputsGrid>
                <InputsGrid>
                  <FormInput
                    value={data.cel}
                    type="tel"
                    onChange={(e) => {
                      setData("cel", e.target.value);
                    }}
                    label="Celular"
                    error={errors.cel}
                  />
                  <FormSelect
                    value={data.cel_com}
                    items={PHONE_COMPANIES_SELECT}
                    onChange={(value) => {
                      setData("cel_com", value);
                    }}
                    label="Compañia del celular"
                    error={errors.cel_com}
                  />
                </InputsGrid>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t("Direcciones")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="space-y-1">
                    <h2 className="font-semibold">{t("Dirección residencial")}</h2>
                    <FormInput
                      placeholder="Dirección 1"
                      value={data.dir1}
                      onChange={(e) => {
                        setData("dir1", e.target.value);
                      }}
                      error={errors.dir1}
                    />
                    <FormInput
                      placeholder="Dirección 2"
                      value={data.dir2}
                      onChange={(e) => {
                        setData("dir2", e.target.value);
                      }}
                      error={errors.dir2}
                    />
                    <InputsGrid className="md:grid-cols-3">
                      <FormInput
                        placeholder="Ciudad"
                        value={data.pueblo1}
                        onChange={(e) => {
                          setData("pueblo1", e.target.value);
                        }}
                        error={errors.pueblo1}
                      />
                      <FormInput
                        placeholder="País"
                        value={data.esta1}
                        onChange={(e) => {
                          setData("esta1", e.target.value);
                        }}
                        error={errors.esta1}
                      />
                      <FormInput
                        placeholder="Código postal"
                        value={data.zip1}
                        onChange={(e) => {
                          setData("zip1", e.target.value);
                        }}
                        error={errors.zip1}
                      />
                    </InputsGrid>
                  </div>
                  <Separator />

                  <div className="relative space-y-1 pt-6">
                    <div className="absolute right-0 top-0 flex flex-col items-center">
                      <Button
                        onClick={
                          !sameAddress ? residentialAddressToPostalAddress : clearPostalAddress
                        }
                        className="size-8"
                        size="icon"
                      >
                        <ArrowUpDown />
                      </Button>
                      <small className="text-xs text-secondary-foreground">
                        {t("Usar la misma dirección que la residencial")}?
                      </small>
                    </div>

                    <h2 className="font-semibold">{t("Dirección postal")}</h2>

                    <FormInput
                      placeholder="Dirección 1"
                      value={data.dir3}
                      onChange={(e) => {
                        setData("dir3", e.target.value);
                      }}
                      error={errors.dir3}
                    />
                    <FormInput
                      placeholder="Dirección 2"
                      value={data.dir4}
                      onChange={(e) => {
                        setData("dir4", e.target.value);
                      }}
                      error={errors.dir4}
                    />
                    <InputsGrid className="md:grid-cols-3">
                      <FormInput
                        placeholder="Ciudad"
                        value={data.pueblo2}
                        onChange={(e) => {
                          setData("pueblo2", e.target.value);
                        }}
                        error={errors.pueblo2}
                      />
                      <FormInput
                        placeholder="País"
                        value={data.esta2}
                        onChange={(e) => {
                          setData("esta2", e.target.value);
                        }}
                        error={errors.esta2}
                      />
                      <FormInput
                        placeholder="Código postal"
                        value={data.zip2}
                        onChange={(e) => {
                          setData("zip2", e.target.value);
                        }}
                        error={errors.zip2}
                      />
                    </InputsGrid>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t("Otros")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <FormInput
                    label="Alias"
                    value={data.alias}
                    onChange={(e) => {
                      setData("alias", e.target.value);
                    }}
                    error={errors.alias}
                  />
                  <InputsGrid>
                    <FormInput
                      label="Posición"
                      value={data.posicion}
                      onChange={(e) => {
                        setData("posicion", e.target.value);
                      }}
                      error={errors.posicion}
                    />
                    <FormSelect
                      label="Nivel"
                      items={TEACHER_LEVEL_SELECT}
                      value={data.nivel ?? ""}
                      onChange={(value) => {
                        setData("nivel", value);
                      }}
                      error={errors.nivel}
                    />
                  </InputsGrid>
                  <div>
                    <h2 className="text-sm font-medium">{t("Preparación")}</h2>
                    <div className="space-y-1">
                      <FormInput
                        placeholder="Preparacion 1"
                        value={data.preparacion1}
                        onChange={(e) => {
                          setData("preparacion1", e.target.value);
                        }}
                        error={errors.preparacion1}
                      />
                      <FormInput
                        placeholder="Preparacion 2"
                        value={data.preparacion2}
                        onChange={(e) => {
                          setData("preparacion2", e.target.value);
                        }}
                        error={errors.preparacion2}
                      />
                    </div>
                  </div>
                  <Separator />
                  <InputsGrid>
                    <FormDatePicker
                      selected={data.fecha_ini}
                      onSelect={(value) => {
                        setData("fecha_ini", formatDateToString(value));
                      }}
                      label="Fecha de inicio"
                      error={errors.fecha_ini}
                    />
                    <FormDatePicker
                      selected={data.fecha_daja}
                      onSelect={(value) => {
                        setData("fecha_daja", formatDateToString(value));
                      }}
                      label="Fecha de baja"
                      error={errors.fecha_daja}
                    />
                  </InputsGrid>
                  <FormSelect
                    label="Recibir email"
                    items={YES_NO_SELECT}
                    value={data.re_e ?? ""}
                    onChange={(value) => {
                      setData("re_e", value);
                    }}
                    error={errors.re_e}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <Accordion className="rounded-md bg-white shadow-sm" type="single" collapsible>
            <AccordionItem value="club">
              <AccordionTrigger className="px-6">{t("Clubes")}</AccordionTrigger>
              <AccordionContent className="space-y-2 px-6">
                {[1, 2, 3, 4, 5].map((number) => {
                  const club = `club${number}` as "club1";
                  const pre = `pre${number}` as "pre1";
                  const vi = `vi${number}` as "vi1";
                  const se = `se${number}` as "se1";
                  return (
                    <InputsGrid key={number} className="md:grid-cols-4">
                      <FormInput
                        value={data[club] ?? ""}
                        onChange={(e) => {
                          setData(club, e.target.value);
                        }}
                        error={errors[club]}
                        label="Nombre"
                      />
                      <FormInput
                        value={data[pre] ?? ""}
                        onChange={(e) => {
                          setData(pre, e.target.value);
                        }}
                        error={errors[pre]}
                        label="Presidente"
                      />
                      <FormInput
                        value={data[vi] ?? ""}
                        onChange={(e) => {
                          setData(vi, e.target.value);
                        }}
                        error={errors[vi]}
                        label="Vice presidente"
                      />
                      <FormInput
                        value={data[se] ?? ""}
                        onChange={(e) => {
                          setData(se, e.target.value);
                        }}
                        error={errors[se]}
                        label="Secretary"
                      />
                    </InputsGrid>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="licens">
              <AccordionTrigger className="px-6">{t("Licencias")}</AccordionTrigger>
              <AccordionContent className="space-y-2 px-6 pt-2">
                {[1, 2, 3, 4].map((number) => {
                  const lic = `lic${number}` as "lic1";
                  const lp = `lp${number}` as "lp1";
                  const fex = `fex${number}` as "fex1";
                  return (
                    <InputsGrid key={number}>
                      <FormInput
                        value={data[lic] ?? ""}
                        onChange={(e) => {
                          setData(lic, e.target.value);
                        }}
                        error={errors[lic]}
                      />
                      <div className="flex w-full gap-2">
                        <FormCheckbox
                          value={data[lp] === YesNoEnum.SI}
                          onChange={(checked) => {
                            setData(lp, checked ? YesNoEnum.SI : YesNoEnum.NO);
                          }}
                          label="Expira"
                        />
                        <FormDatePicker
                          disabled={data[lp] !== YesNoEnum.SI}
                          selected={data[fex] ?? ""}
                          onSelect={(value) => {
                            setData(fex, formatDateToString(value));
                          }}
                          error={errors[fex]}
                        />
                      </div>
                    </InputsGrid>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </RegiwebLayout>
  );
}
