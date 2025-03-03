import { InfoBadge } from "@/Components/InfoBadge";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";

import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";

import { PagesEnum, TrimesterEnum } from "@/Enums";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { formatDate } from "@/lib/utils";
import { useId, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { PAGES, TRIMESTERS } from "@/Constants";
import { useTranslations } from "@/hooks/translations";
import { Deferred } from "@inertiajs/react";
import { Info } from "lucide-react";
import { AttendaceTableForm } from "./_components/AttendanceTableForm";
import { DefaultTableForm } from "./_components/DefaultTableForm";
import { ExamForm } from "./_components/ExamTableForm";
import { TableFormFallback } from "./_components/TableFormFallback";
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
  const { t } = useTranslations();

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
    <RegiwebLayout title={t("Notes entry")}>
      <section className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("Information")}</CardTitle>
            <CardDescription hidden></CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <InfoBadge label={t("Course")} value={course} />
              <InfoBadge label={t("Trimester")} value={TRIMESTERS[trimester]} />
              <InfoBadge label={t("Adding notes to")} value={PAGES[page]} />
              <Deferred
                data="studentsGrades"
                fallback={<InfoBadge label={t("Students total")} value={0} />}
              >
                <InfoBadge label={t("Students total")} value={studentsGrades?.length} />
              </Deferred>
              <InfoBadge
                label={t("Initial Date")}
                value={formatDate(initialDate, { dateStyle: "long" })}
              />
              <InfoBadge
                label={t("Final Date")}
                value={formatDate(finalDate, { dateStyle: "long" })}
              />
              <InfoBadge label={t("Note type")} value={isPercent ? t("Percentage") : t("Sum")} />
            </div>
          </CardContent>
        </Card>
        {(page === PagesEnum.GRADES || page === PagesEnum.SUMMER_GRADES) && (
          <Card>
            <CardHeader>
              <CardTitle>{t("Options")}</CardTitle>
              <CardDescription hidden></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <SwitchCheckbox
                  checked={isLetter}
                  label={t("Convert to letters")}
                  description={t("Applied to the Grade column :number exclusively", {
                    number: page === PagesEnum.GRADES ? 9 : 7,
                  })}
                />
                <SwitchCheckbox
                  checked={convert}
                  onChange={setConvert}
                  label={t("Convert")}
                  description={t("Convert numbers to letters")}
                />
                {canEnd && (
                  <SwitchCheckbox
                    checked={hasEnded}
                    label={t("Notification")}
                    description={t("Mark when the trimester end")}
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
            <AlertTitle>{t("Important") + "!"}</AlertTitle>
            <AlertDescription>
              {t("Rembember to go to the grades page and save to get the correct averages")}
            </AlertDescription>
          </Alert>
        ) : null}
      </section>
      <section className="mt-8">
        <Deferred data="studentsGrades" fallback={<TableFormFallback />}>
          <OptionsContext.Provider value={{ page, trimester, course }}>
            {values &&
            amountOfGrades &&
            (page === PagesEnum.GRADES ||
              page === PagesEnum.SUMMER_GRADES ||
              page === PagesEnum.SHORT_TESTS ||
              page === PagesEnum.DAILY_WORKS ||
              page === PagesEnum.NOTEBOOKS_WORKS) ? (
              <DefaultTableForm
                values={values}
                amountOfGrades={amountOfGrades}
                columns={columns}
                convert={convert}
                students={studentsGrades as StudentsDefaultGrades[]}
              />
            ) : page === PagesEnum.CONDUCT_ATTENDANCE ? (
              <AttendaceTableForm students={studentsGrades as StudentsAttendanceGrades[]} />
            ) : page === PagesEnum.FINAL_EXAM ? (
              <ExamForm students={studentsGrades as StudentsExamGrades[]} />
            ) : null}
          </OptionsContext.Provider>
        </Deferred>
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
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}
