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
import { useTranslations } from "@/hooks/translations";
import { HomeLayout } from "@/Layouts/Home/HomeLayout";

import type { Document, PagePropsWithSchool } from "@/types";
import { Link } from "@inertiajs/react";
interface DocumentsPageProps extends PagePropsWithSchool {
  documents: Document[];
}
export default function DocumentsPage({ school, documents }: DocumentsPageProps) {
  const { t } = useTranslations();
  return (
    <HomeLayout school={school} title={t("Documents")}>
      <div className="p-5">
        <section className="flex flex-col items-center justify-center">
          <h2 className="text-center text-lg font-bold md:text-3xl">
            {t("List of documents to download")}
          </h2>
          <Button asChild variant="link">
            <Link href={route("home.index")}>{t("Go to the main page")}</Link>
          </Button>
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
                      {t("Initial Grade")}: {document.grado_desde}
                    </span>
                    <span className="text-sm">
                      {t("Final Grade")}: {document.grado_hasta}
                    </span>
                  </CardDescription>
                  <CardContent className="flex items-center justify-center py-2">
                    <Button asChild>
                      <a
                        className="d-block"
                        href={route("home.documents.download", { id: document.id })}
                      >
                        {t("Download")}
                      </a>
                    </Button>
                  </CardContent>
                  <CardFooter className="flex justify-around p-0">
                    <span className="text-muted-foreground text-sm">
                      {t("Initial Date")}: {document.fecha_desde}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {t("Final Date")}: {document.fecha_hasta}
                    </span>
                  </CardFooter>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="mt-10 flex items-center justify-center">
            <Alert className="max-w-xl" variant="destructive">
              <AlertTitle>{t("No documents!")}</AlertTitle>
              <AlertDescription>
                {t("If you have been asked to find a document, please contact administration")}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}
