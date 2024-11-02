import { ChangePasswordForm } from "@/Components/ChangePasswordForm";
import { CheckboxField } from "@/Components/forms/inputs/CheckboxField";
import { DateField } from "@/Components/forms/inputs/DateField";
import { FieldsGrid } from "@/Components/forms/inputs/FieldsGrid";
import { InputField } from "@/Components/forms/inputs/InputField";
import { PhoneField } from "@/Components/forms/inputs/PhoneField";
import { ProfilePictureField } from "@/Components/forms/inputs/ProfilePictureField";
import { SelectField } from "@/Components/forms/inputs/SelectField";
import { InfoBadge } from "@/Components/InfoBadge";
import SubmitButton from "@/Components/SubmitButton";
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
} from "@/Constants/FormSelects";
import { YesNoEnum } from "@/Enums";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { PagePropsWithUser } from "@/types";
import { Teacher } from "@/types/Teacher";
import { useForm } from "@inertiajs/react";
import { ArrowUpDown, User2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export default function Page({ auth: { user } }: PagePropsWithUser<Teacher>) {
  const [sameAddress, setSameAddress] = useState(false);
  const { t } = useTranslation();
  const { data, setData, post, errors, processing } = useForm<Partial<Teacher> & { picture: null }>(
    {
      picture: null,
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
    },
  );

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route("regiweb.profile.update"), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success(t("Perfil guardado"));
      },
    });
  }

  return (
    <RegiwebLayout user={user} title={t("Perfil")}>
      <form onSubmit={handleSubmit}>
        <div className="flex grow flex-col gap-8 px-2 pb-10 pt-5">
          <h1 className="page-primary-title flex items-center gap-2">
            {t("Mi perfil")}
            <User2 className="size-8" />
          </h1>
          <section className="mt-5 grid grid-cols-1 gap-8 md:grid-cols-2">
            <ProfilePictureField
              initialFile={user.foto_name}
              data={data}
              name="picture"
              setData={setData}
              error={errors.picture}
            />

            <div className="hidden md:flex md:items-center md:justify-center">
              <Card className="border-accent bg-accent">
                <CardHeader className="p-2">
                  <CardTitle className="text-lg">{t("Información")}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 rounded-b-md bg-background pt-2">
                  <InfoBadge label={t("Id")} value={user.id} />
                  <InfoBadge label={t("User")} value={user.usuario} />
                  {user.grado && <InfoBadge label={t("Salón hogar")} value={user.grado} />}
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mt-5 grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("Información personal")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <FieldsGrid>
                    <InputField
                      data={data}
                      setData={setData}
                      label={t("Nombre")}
                      name="nombre"
                      error={errors.nombre}
                    />
                    <InputField
                      data={data}
                      setData={setData}
                      label={t("Apellidos")}
                      name="apellidos"
                      error={errors.apellidos}
                    />
                  </FieldsGrid>
                  <FieldsGrid>
                    <SelectField
                      data={data}
                      setData={setData}
                      label={t("Genero")}
                      name="genero"
                      error={errors.genero}
                      items={GENDERS_SELECT}
                    />
                    <DateField
                      data={data}
                      setData={setData}
                      label={t("Fecha de nacimiento")}
                      name="fecha_nac"
                      error={errors.fecha_nac}
                    />
                  </FieldsGrid>
                  <InputField
                    data={data}
                    setData={setData}
                    label={t("Correo principal")}
                    name="email1"
                    type="email"
                    error={errors.email1}
                  />
                  <InputField
                    data={data}
                    setData={setData}
                    label={t("Correo secundario")}
                    name="email2"
                    type="email"
                    error={errors.email2}
                  />
                  <FieldsGrid>
                    <PhoneField
                      data={data}
                      setData={setData}
                      label={t("Telefono residencial")}
                      name="tel_res"
                      error={errors.tel_res}
                    />
                    <PhoneField
                      data={data}
                      setData={setData}
                      label={t("Contacto de emergencia")}
                      name="tel_emer"
                      error={errors.tel_emer}
                    />
                  </FieldsGrid>
                  <FieldsGrid>
                    <PhoneField
                      data={data}
                      setData={setData}
                      label={t("Celular")}
                      name="cel"
                      error={errors.cel}
                    />
                    <SelectField
                      name="cel_com"
                      data={data}
                      setData={setData}
                      label={t("Compañia del celular")}
                      error={errors.cel_com}
                      items={PHONE_COMPANIES_SELECT}
                    />
                  </FieldsGrid>
                  <div className="mt-5">
                    <ChangePasswordForm route={route("regiweb.password")} />
                  </div>
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
                      <InputField
                        data={data}
                        setData={setData}
                        placeholder={`${t("Dirección")} 1`}
                        name="dir1"
                        error={errors.dir1}
                      />
                      <InputField
                        data={data}
                        setData={setData}
                        placeholder={`${t("Dirección")} 2`}
                        name="dir2"
                        error={errors.dir2}
                      />
                      <FieldsGrid cols={3}>
                        <InputField
                          data={data}
                          setData={setData}
                          placeholder={t("Ciudad")}
                          name="pueblo1"
                          error={errors.pueblo1}
                        />
                        <InputField
                          data={data}
                          setData={setData}
                          placeholder={t("País")}
                          name="esta1"
                          error={errors.esta1}
                        />
                        <InputField
                          data={data}
                          setData={setData}
                          placeholder={t("Código postal")}
                          name="zip1"
                          error={errors.zip1}
                        />
                      </FieldsGrid>
                    </div>
                    <Separator />

                    <div className="space-y-1 md:relative md:pt-6">
                      <div className="flex flex-col items-center md:absolute md:right-0 md:top-0">
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

                      <InputField
                        data={data}
                        setData={setData}
                        placeholder={`${t("Dirección")} 1`}
                        name="dir3"
                        error={errors.dir3}
                      />
                      <InputField
                        data={data}
                        setData={setData}
                        placeholder={`${t("Dirección")} 2`}
                        name="dir4"
                        error={errors.dir4}
                      />
                      <FieldsGrid cols={3}>
                        <InputField
                          data={data}
                          setData={setData}
                          placeholder={t("Ciudad")}
                          name="pueblo2"
                          error={errors.pueblo2}
                        />
                        <InputField
                          data={data}
                          setData={setData}
                          placeholder={t("País")}
                          name="esta2"
                          error={errors.esta2}
                        />
                        <InputField
                          data={data}
                          setData={setData}
                          placeholder={t("Código postal")}
                          name="zip2"
                          error={errors.zip2}
                        />
                      </FieldsGrid>
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
                    <InputField
                      data={data}
                      setData={setData}
                      label={t("Alias")}
                      name="alias"
                      error={errors.alias}
                    />
                    <FieldsGrid>
                      <InputField
                        data={data}
                        setData={setData}
                        label={t("Posición")}
                        name="posicion"
                        error={errors.posicion}
                      />
                      <SelectField
                        data={data}
                        setData={setData}
                        label={t("Nivel")}
                        name="nivel"
                        error={errors.nivel}
                        items={TEACHER_LEVEL_SELECT}
                      />
                    </FieldsGrid>
                    <div>
                      <h2 className="text-sm font-medium">{t("Preparación")}</h2>
                      <div className="space-y-1">
                        <InputField
                          data={data}
                          setData={setData}
                          placeholder={`${t("Preparación")} 2`}
                          name="preparacion1"
                          error={errors.preparacion1}
                        />
                        <InputField
                          data={data}
                          setData={setData}
                          placeholder={`${t("Preparación")} 2`}
                          name="preparacion2"
                          error={errors.preparacion2}
                        />
                      </div>
                    </div>
                    <Separator />
                    <FieldsGrid>
                      <DateField
                        data={data}
                        setData={setData}
                        label={t("Fecha de inicio")}
                        name="fecha_ini"
                        error={errors.fecha_ini}
                      />
                      <DateField
                        data={data}
                        setData={setData}
                        label={t("Fecha de baja")}
                        name="fecha_daja"
                        error={errors.fecha_daja}
                      />
                    </FieldsGrid>
                    <SelectField
                      data={data}
                      setData={setData}
                      label={t("Recibir email")}
                      items={YES_NO_SELECT}
                      name="re_e"
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
                      <FieldsGrid key={number} className="md:grid-cols-4">
                        <InputField
                          data={data}
                          setData={setData}
                          label={t("Nombre")}
                          name={club}
                          error={errors[club]}
                        />
                        <InputField
                          data={data}
                          setData={setData}
                          label={t("Presidente")}
                          name={pre}
                          error={errors[pre]}
                        />
                        <InputField
                          data={data}
                          setData={setData}
                          label={t("Vice presidente")}
                          name={vi}
                          error={errors[vi]}
                        />
                        <InputField
                          data={data}
                          setData={setData}
                          label={t("Secretario")}
                          name={se}
                          error={errors[se]}
                        />
                      </FieldsGrid>
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
                      <FieldsGrid key={number}>
                        <InputField data={data} setData={setData} name={lic} error={errors[lic]} />

                        <div className="grid grid-flow-col items-center gap-2">
                          <CheckboxField
                            className="grow"
                            label="Expira"
                            data={data}
                            setData={setData}
                            name={lp}
                            error={errors[lp]}
                          />
                          <DateField
                            disabled={data[lp] !== YesNoEnum.SI}
                            className="max-w-[300px]"
                            data={data}
                            setData={setData}
                            name={fex}
                            error={errors[fex]}
                          />
                        </div>
                      </FieldsGrid>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
          <SubmitButton disabled={processing} size="lg">
            {t("Guardar")}
          </SubmitButton>
        </div>
      </form>
    </RegiwebLayout>
  );
}
