import { ChangePasswordForm } from "@/Components/ChangePasswordForm";
import { CheckboxField } from "@/Components/forms/inputs/CheckboxField";
import { DateField } from "@/Components/forms/inputs/DateField";
import { FieldsGrid } from "@/Components/forms/inputs/FieldsGrid";
import { InputField } from "@/Components/forms/inputs/InputField";
import { PhoneField } from "@/Components/forms/inputs/PhoneField";
import { ProfilePictureField } from "@/Components/forms/inputs/ProfilePictureField";
import { SelectField } from "@/Components/forms/inputs/SelectField";
import SubmitButton from "@/Components/forms/SubmitButton";
import { InfoBadge } from "@/Components/InfoBadge";
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
import { Teacher } from "@/types/teacher";
import { useForm } from "@inertiajs/react";
import { ArrowUpDown, User2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
export default function Page({ auth: { user } }: PagePropsWithUser<Teacher>) {
  const [sameAddress, setSameAddress] = useState(false);
  const { t } = useTranslation(["common", "input", "pages"]);
  const { data, setData, post, errors, processing } = useForm({
    picture: null as File | null,
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
    alias: user.alias ?? "",
    posicion: user.posicion,
    nivel: user.nivel ?? "",
    preparacion1: user.preparacion1 ?? "",
    preparacion2: user.preparacion2 ?? "",
    fecha_ini: user.fecha_ini,
    fecha_daja: user.fecha_daja,
    re_e: user.re_e,
    club1: user.club1 ?? "",
    club2: user.club2 ?? "",
    club3: user.club3 ?? "",
    club4: user.club4 ?? "",
    club5: user.club5 ?? "",
    pre1: user.pre1 ?? "",
    pre2: user.pre2 ?? "",
    pre3: user.pre3 ?? "",
    pre4: user.pre4 ?? "",
    pre5: user.pre5 ?? "",
    vi1: user.vi1 ?? "",
    vi2: user.vi2 ?? "",
    vi3: user.vi3 ?? "",
    vi4: user.vi4 ?? "",
    vi5: user.vi5 ?? "",
    se1: user.se1 ?? "",
    se2: user.se2 ?? "",
    se3: user.se3 ?? "",
    se4: user.se4 ?? "",
    se5: user.se5 ?? "",
    lic1: user.lic1 ?? "",
    lic2: user.lic2 ?? "",
    lic3: user.lic3 ?? "",
    lic4: user.lic4 ?? "",
    lp1: user.lp1 ?? "",
    lp2: user.lp2 ?? "",
    lp3: user.lp3 ?? "",
    lp4: user.lp4 ?? "",
    fex1: user.fex1 ?? "",
    fex2: user.fex2 ?? "",
    fex3: user.fex3 ?? "",
    fex4: user.fex4 ?? "",
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route("regiweb.profile.update"), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success(t("pages:regiweb.profile.successMessage"));
      },
    });
  }

  return (
    <RegiwebLayout title={t("pages:regiweb.profile.meta.title")}>
      <form onSubmit={handleSubmit}>
        <div className="flex grow flex-col gap-8 px-2 pb-10 pt-5">
          <h1 className="page-primary-title flex items-center gap-2">
            {t("pages:regiweb.profile.title")}
            <User2 className="size-8" />
          </h1>
          <section className="mt-5 grid grid-cols-1 gap-8 md:grid-cols-2">
            <ProfilePictureField
              initialFile={user.foto_name}
              value={data.picture}
              onChange={(value) => setData("picture", value)}
              error={errors.picture}
            />

            <div className="hidden md:flex md:items-center md:justify-center">
              <Card className="border-accent bg-accent">
                <CardHeader className="p-2">
                  <CardTitle className="text-lg">{t("pages:regiweb.profile.info.title")}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 rounded-b-md bg-background pt-2">
                  <InfoBadge label={t("pages:regiweb.profile.info.id")} value={user.id} />
                  <InfoBadge label={t("pages:regiweb.profile.info.user")} value={user.usuario} />
                  {user.grado && (
                    <InfoBadge
                      label={t("pages:regiweb.profile.info.homeCourse")}
                      value={user.grado}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mt-5 grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("pages:regiweb.profile.card1.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <FieldsGrid>
                    <InputField
                      label={t("input:name")}
                      value={data.nombre}
                      onChange={(value) => setData("nombre", value)}
                      error={errors.nombre}
                    />
                    <InputField
                      label={t("input:lastname")}
                      value={data.apellidos}
                      onChange={(value) => setData("apellidos", value)}
                      error={errors.apellidos}
                    />
                  </FieldsGrid>
                  <FieldsGrid>
                    <SelectField
                      label={t("input:gender")}
                      value={data.genero}
                      onChange={(value) => setData("genero", value)}
                      error={errors.genero}
                      items={GENDERS_SELECT}
                    />
                    <DateField
                      label={t("input:dob")}
                      value={data.fecha_nac}
                      onChange={(value) => setData("fecha_nac", value)}
                      error={errors.fecha_nac}
                    />
                  </FieldsGrid>
                  <InputField
                    label={t("input:primaryEmail")}
                    value={data.email1}
                    onChange={(value) => setData("email1", value)}
                    type="email"
                    error={errors.email1}
                  />
                  <InputField
                    onChange={(value) => setData("email2", value)}
                    label={t("input:secondaryEmail")}
                    type="email"
                    error={errors.email2}
                  />
                  <FieldsGrid>
                    <PhoneField
                      value={data.tel_res}
                      onChange={(value) => setData("tel_res", value)}
                      label={t("input:residencePhone")}
                      error={errors.tel_res}
                    />
                    <PhoneField
                      value={data.tel_emer}
                      onChange={(value) => setData("tel_emer", value)}
                      label={t("input:emergencyContact")}
                      error={errors.tel_emer}
                    />
                  </FieldsGrid>
                  <FieldsGrid>
                    <PhoneField
                      value={data.cel}
                      onChange={(value) => setData("cel", value)}
                      label={t("input:mobilePhone")}
                      error={errors.cel}
                    />
                    <SelectField
                      value={data.cel_com}
                      onChange={(value) => setData("cel_com", value)}
                      label={t("input:mobilePhoneCompany")}
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
                  <CardTitle>{t("pages:regiweb.profile.card2.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="space-y-1">
                      <h2 className="font-semibold">
                        {t("pages:regiweb.profile.card2.subtitle1")}
                      </h2>
                      <InputField
                        value={data.dir1}
                        onChange={(value) => setData("dir1", value)}
                        placeholder={t("input:address1")}
                        error={errors.dir1}
                      />
                      <InputField
                        value={data.dir2}
                        onChange={(value) => setData("dir2", value)}
                        placeholder={t("input:address2")}
                        error={errors.dir2}
                      />
                      <FieldsGrid cols={3}>
                        <InputField
                          value={data.pueblo1}
                          onChange={(value) => setData("pueblo1", value)}
                          placeholder={t("input:city")}
                          error={errors.pueblo1}
                        />
                        <InputField
                          value={data.esta1}
                          onChange={(value) => setData("esta1", value)}
                          placeholder={t("input:country")}
                          error={errors.esta1}
                        />
                        <InputField
                          value={data.zip1}
                          onChange={(value) => setData("zip1", value)}
                          placeholder={t("input:zip")}
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
                          {t("pages:regiweb.profile.card2.sameAddressHelpText")}?
                        </small>
                      </div>

                      <h2 className="font-semibold">
                        {t("pages:regiweb.profile.card2.subtitle2")}
                      </h2>

                      <InputField
                        value={data.dir3}
                        onChange={(value) => setData("dir3", value)}
                        placeholder={t("input:address1")}
                        error={errors.dir3}
                      />
                      <InputField
                        value={data.dir4}
                        onChange={(value) => setData("dir4", value)}
                        placeholder={t("input:address2")}
                        error={errors.dir4}
                      />
                      <FieldsGrid cols={3}>
                        <InputField
                          value={data.pueblo2}
                          onChange={(value) => setData("pueblo2", value)}
                          placeholder={t("input:city")}
                          error={errors.pueblo2}
                        />
                        <InputField
                          value={data.esta2}
                          onChange={(value) => setData("esta2", value)}
                          placeholder={t("input:country")}
                          error={errors.esta2}
                        />
                        <InputField
                          value={data.zip2}
                          onChange={(value) => setData("zip2", value)}
                          placeholder={t("input:zip")}
                          error={errors.zip2}
                        />
                      </FieldsGrid>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t("pages:regiweb.profile.card3.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <InputField
                      value={data.alias}
                      onChange={(value) => setData("alias", value)}
                      label={t("input:alias")}
                      error={errors.alias}
                    />
                    <FieldsGrid>
                      <InputField
                        value={data.posicion}
                        onChange={(value) => setData("posicion", value)}
                        label={t("input:position")}
                        error={errors.posicion}
                      />
                      <SelectField
                        value={data.nivel}
                        onChange={(value) => setData("nivel", value)}
                        label={t("input:level")}
                        error={errors.nivel}
                        items={TEACHER_LEVEL_SELECT}
                      />
                    </FieldsGrid>
                    <div>
                      <h2 className="text-sm font-medium">
                        {t("pages:regiweb.profile.card3.subtitle1")}
                      </h2>
                      <div className="space-y-1">
                        <InputField
                          value={data.preparacion1}
                          onChange={(value) => setData("preparacion1", value)}
                          placeholder={t("input:preparation1")}
                          error={errors.preparacion1}
                        />
                        <InputField
                          value={data.preparacion2}
                          onChange={(value) => setData("preparacion2", value)}
                          placeholder={t("input:preparation2")}
                          error={errors.preparacion2}
                        />
                      </div>
                    </div>
                    <Separator />
                    <FieldsGrid>
                      <DateField
                        value={data.fecha_ini}
                        onChange={(value) => setData("fecha_ini", value)}
                        label={t("input:initialDate")}
                        error={errors.fecha_ini}
                      />
                      <DateField
                        value={data.fecha_daja}
                        onChange={(value) => setData("fecha_daja", value)}
                        label={t("input:finalDate")}
                        error={errors.fecha_daja}
                      />
                    </FieldsGrid>
                    <SelectField
                      value={data.re_e}
                      onChange={(value) => setData("re_e", value)}
                      label={t("input:receiveEmails")}
                      items={YES_NO_SELECT}
                      error={errors.re_e}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          <section>
            <Accordion className="rounded-md bg-white shadow-xs" type="single" collapsible>
              <AccordionItem value="club">
                <AccordionTrigger className="px-6">
                  {t("pages:regiweb.profile.card4.title1")}
                </AccordionTrigger>
                <AccordionContent className="space-y-2 px-6">
                  {[1, 2, 3, 4, 5].map((number) => {
                    const club = `club${number}` as "club1";
                    const pre = `pre${number}` as "pre1";
                    const vi = `vi${number}` as "vi1";
                    const se = `se${number}` as "se1";
                    return (
                      <FieldsGrid key={number} className="md:grid-cols-4">
                        <InputField
                          value={data[club]}
                          onChange={(value) => setData(club, value)}
                          label={t("input:name")}
                          error={errors[club]}
                        />
                        <InputField
                          value={data[pre]}
                          onChange={(value) => setData(pre, value)}
                          label={t("input:president")}
                          error={errors[pre]}
                        />
                        <InputField
                          value={data[vi]}
                          onChange={(value) => setData(vi, value)}
                          label={t("input:vicePresident")}
                          error={errors[vi]}
                        />
                        <InputField
                          value={data[se]}
                          onChange={(value) => setData(se, value)}
                          label={t("input:secretary")}
                          error={errors[se]}
                        />
                      </FieldsGrid>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="licens">
                <AccordionTrigger className="px-6">
                  {t("pages:regiweb.profile.card4.title2")}
                </AccordionTrigger>
                <AccordionContent className="space-y-2 px-6 pt-2">
                  {[1, 2, 3, 4].map((number) => {
                    const lic = `lic${number}` as "lic1";
                    const lp = `lp${number}` as "lp1";
                    const fex = `fex${number}` as "fex1";
                    return (
                      <FieldsGrid key={number}>
                        <InputField
                          value={data[lic]}
                          onChange={(value) => setData(lic, value)}
                          error={errors[lic]}
                        />

                        <div className="grid grid-flow-col items-center gap-2">
                          <CheckboxField
                            className="grow"
                            label={t("input:expires")}
                            value={data[lp]}
                            onChange={(value) => setData(lp, value)}
                            error={errors[lp]}
                          />
                          <DateField
                            disabled={data[lp] !== YesNoEnum.YES}
                            className="max-w-[300px]"
                            value={data[fex]}
                            onChange={(value) => setData(fex, value)}
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
            {t("btn.save")}
          </SubmitButton>
        </div>
      </form>
    </RegiwebLayout>
  );
}
