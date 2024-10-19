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
  const { t } = useTranslation();
  return (
    <HomeLayout school={school} title="Documentos">
      <div className="p-5">
        <section className="flex flex-col items-center justify-center">
          <h2 className="text-center text-lg font-bold md:text-3xl">
            {t("Lista de documentos para descargar")}
          </h2>
          <Button asChild variant="ghost">
            <Link href={route("home.index")}>{t("Ir a la pagina principal")}</Link>
          </Button>
          {flash.message && (
            <div className="mt-2 flex items-center justify-center">
              <Alert className="max-w-xl" variant="destructive">
                <AlertTitle>{t("Error")}!</AlertTitle>
                <AlertDescription>{flash.message}</AlertDescription>
              </Alert>
            </div>
          )}
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
                      {t("Grado inicial")}: {document.grado_desde}{" "}
                    </span>
                    <span className="text-sm">
                      {t("Grado final")}: {document.grado_hasta}{" "}
                    </span>
                  </CardDescription>
                  <CardContent className="flex items-center justify-center py-2">
                    <Button asChild>
                      <a
                        className="d-block"
                        href={route("home.documents.download", { id: document.id })}
                      >
                        {t("Descargar")}
                      </a>
                    </Button>
                  </CardContent>
                  <CardFooter className="flex justify-around p-0">
                    <span className="text-sm text-muted-foreground">
                      {t("Fecha inicial")}: {document.fecha_desde}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {t("Fecha final")}: {document.fecha_hasta}
                    </span>
                  </CardFooter>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="mt-10 flex items-center justify-center">
            <Alert className="max-w-xl" variant="destructive">
              <AlertTitle>No hay documentos!</AlertTitle>
              <AlertDescription>
                Si le han solicitado buscar un documento, por favor contactarse con administración
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}
