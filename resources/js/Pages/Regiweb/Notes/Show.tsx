import { InfoBadge } from "@/Components/InfoBadge";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";

import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";

import { PagesEnum, TrimesterEnum } from "@/Enums";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { formatDate } from "@/lib/utils";
import { useId, useState } from "react";
import { useTranslation } from "react-i18next";

import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { PAGES, TRIMESTERS } from "@/Constants";
import { Info } from "lucide-react";
import { AttendaceForm } from "./_components/AttendanceForm";
import { DefaultForm } from "./_components/DefaultForm";
import { ExamForm } from "./_components/ExamForm";
import { GradesValues, ValuesForm } from "./_components/ValuesForm";
import { OptionsContext } from "./_context/OptionsContext";
import {
  StudentsAttendanceGrades,
  StudentsDefaultGrades,
  StudentsExamGrades,
  StudentsGrades,
} from "./_types/studentsGrades";

interface PageProps {
  course: string;
  page: PagesEnum;
  trimester: TrimesterEnum;
  studentsGrades: StudentsGrades[];
  initialDate: string;
  finalDate: string;
  isLetter: boolean;
  isPercent: boolean;
  canEnd: boolean;
  hasEnded: boolean;
  amountOfGrades: number | null;
  columns: string[] | null;
  gradesValues: GradesValues | null;
  gradesValuesId: number | null;
}
export default function Page({
  course,
  page,
  trimester,
  studentsGrades,
  initialDate,
  finalDate,
  isLetter,
  isPercent,
  canEnd,
  hasEnded,
  amountOfGrades,
  columns,
  gradesValues,
  gradesValuesId,
}: PageProps) {
  const [convert, setConvert] = useState(false);

  const [values, setValues] = useState(gradesValues);
  const { t } = useTranslation(["common", "pages"]);

  function handleValueChange(valueKey: string, value: string) {
    if (!values) return;
    const updatedValues = Object.entries(values).reduce((acc, [key, val]) => {
      if (key === valueKey) {
        return { ...acc, [key]: value };
      }
      return { ...acc, [key]: val };
    }, {});

    setValues(updatedValues);
  }
  return (
    <RegiwebLayout title={t("pages:regiweb.notes.show.meta.title")}>
      <section className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("pages:regiweb.notes.show.card1.title")}</CardTitle>
            <CardDescription hidden></CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <InfoBadge label={t("common:course.label")} value={course} />
              <InfoBadge label={t("common:trimester.label")} value={TRIMESTERS[trimester]} />
              <InfoBadge
                label={t("pages:regiweb.notes.show.card1.addingNotes")}
                value={PAGES[page]}
              />
              <InfoBadge
                label={t("pages:regiweb.notes.show.card1.studentsTotal")}
                value={studentsGrades.length}
              />
              <InfoBadge
                label={t("common:date.initialDate")}
                value={formatDate(initialDate, { dateStyle: "long" })}
              />
              <InfoBadge
                label={t("common:date.finalDate")}
                value={formatDate(finalDate, { dateStyle: "long" })}
              />
              <InfoBadge
                label={t("pages:regiweb.notes.show.card1.noteType.label")}
                value={
                  isPercent
                    ? t("pages:regiweb.notes.show.card1.noteType.percent")
                    : t("pages:regiweb.notes.show.card1.noteType.sum")
                }
              />
            </div>
          </CardContent>
        </Card>
        {(page === PagesEnum.GRADES || page === PagesEnum.SUMMER_GRADES) && (
          <Card>
            <CardHeader>
              <CardTitle>{t("pages:regiweb.notes.show.card2.title")}</CardTitle>
              <CardDescription hidden></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <SwitchCheckbox
                  checked={isLetter}
                  label={t("pages:regiweb.notes.show.card2.convertToLetters.label")}
                  description={t("pages:regiweb.notes.show.card2.convertToLetters.description", {
                    noteNumber: page === PagesEnum.GRADES ? 9 : 7,
                  })}
                />
                <SwitchCheckbox
                  checked={convert}
                  onChange={setConvert}
                  label={t("pages:regiweb.notes.show.card2.convert.label")}
                  description={t("pages:regiweb.notes.show.card2.convert.description")}
                />
                {canEnd && (
                  <SwitchCheckbox
                    checked={hasEnded}
                    label={t("pages:regiweb.notes.show.card2.notification.label")}
                    description={t("pages:regiweb.notes.show.card2.notification.description")}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        )}
        {page !== PagesEnum.GRADES &&
        page !== PagesEnum.SUMMER_GRADES &&
        page !== PagesEnum.FINAL_EXAM &&
        page !== PagesEnum.CONDUCT_ATTENDANCE ? (
          <Alert variant="warning">
            <Info className="size-4" />
            <AlertTitle>{t("pages:regiweb.notes.show.importantAlert.title")}</AlertTitle>
            <AlertDescription>
              {t("pages:regiweb.notes.show.importantAlert.message")}
            </AlertDescription>
          </Alert>
        ) : null}
      </section>
      <section className="mt-8">
        <OptionsContext.Provider value={{ page, trimester, course }}>
          {values &&
          amountOfGrades &&
          (page === PagesEnum.GRADES ||
            page === PagesEnum.SUMMER_GRADES ||
            page === PagesEnum.SHORT_TESTS ||
            page === PagesEnum.DAILY_WORKS ||
            page === PagesEnum.NOTEBOOKS_WORKS) ? (
            <DefaultForm
              values={values}
              amountOfGrades={amountOfGrades}
              columns={columns}
              convert={convert}
              students={studentsGrades as StudentsDefaultGrades[]}
            />
          ) : page === PagesEnum.CONDUCT_ATTENDANCE ? (
            <AttendaceForm students={studentsGrades as StudentsAttendanceGrades[]} />
          ) : page === PagesEnum.FINAL_EXAM ? (
            <ExamForm students={studentsGrades as StudentsExamGrades[]} />
          ) : null}
        </OptionsContext.Provider>
      </section>
      {values && gradesValuesId && amountOfGrades && (
        <section className="mt-8">
          <ValuesForm
            values={values}
            id={gradesValuesId}
            amoutOfGrades={amountOfGrades}
            onValueChange={handleValueChange}
          />
        </section>
      )}
    </RegiwebLayout>
  );
}

function SwitchCheckbox({
  checked,
  description,
  label,
  disabled,
  onChange,
}: {
  checked: boolean;
  description: string;
  label: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="items-top flex gap-2">
      <Switch id={id} onCheckedChange={onChange} checked={checked} disabled={disabled} />
      <div className="space-y-1 leading-none">
        <Label htmlFor={id}>{label}</Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
