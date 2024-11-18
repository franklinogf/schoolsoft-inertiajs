import { AlertDestructive } from "@/Components/AlertDesctructive";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { HomeLayout } from "@/Layouts/Home/HomeLayout";

import type { Document, PagePropsWithSchool } from "@/types";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
interface DocumentsPageProps extends PagePropsWithSchool {
  documents: Document[];
}
export default function DocumentsPage({ school, documents, flash }: DocumentsPageProps) {
  const { t } = useTranslation(["pages", "common"]);
  return (
    <HomeLayout school={school} title={t("pages:home.documents.meta.title")}>
      <div className="p-5">
        <section className="flex flex-col items-center justify-center">
          <h2 className="text-center text-lg font-bold md:text-3xl">
            {t("pages:home.documents.title")}
          </h2>
          <Button asChild variant="ghost">
            <Link href={route("home.index")}>{t("pages:home.documents.backBtn")}</Link>
          </Button>
          <AlertDestructive className="mt-2" message={flash.error} />
        </section>
        {documents.length > 0 ? (
          <div className="g-2 mt-8 grid grid-cols-2 justify-center gap-2 md:grid-cols-3">
            {documents.map((document) => (
              <Card key={document.id}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {document.titulo} {document.id}
                  </CardTitle>
                  <CardDescription className="flex justify-around">
                    <span className="text-sm">
                      {t("common:grade.initialGrade")}: {document.grado_desde}
                    </span>
                    <span className="text-sm">
                      {t("common:grade.finalGrade")}: {document.grado_hasta}
                    </span>
                  </CardDescription>
                  <CardContent className="flex items-center justify-center py-2">
                    <Button asChild>
                      <a
                        className="d-block"
                        href={route("home.documents.download", { id: document.id })}
                      >
                        {t("common:btn.download")}
                      </a>
                    </Button>
                  </CardContent>
                  <CardFooter className="flex justify-around p-0">
                    <span className="text-sm text-muted-foreground">
                      {t("common:date.initialDate")}: {document.fecha_desde}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {t("common:date.finalDate")}: {document.fecha_hasta}
                    </span>
                  </CardFooter>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="mt-10 flex items-center justify-center">
            <Alert className="max-w-xl" variant="destructive">
              <AlertTitle>{t("pages:home.documents.alert.title")}</AlertTitle>
              <AlertDescription>{t("pages:home.documents.alert.message")}</AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}
