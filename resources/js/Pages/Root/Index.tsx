import { MaxWidthSection } from "@/Components/root/MaxWidthSection";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { OTHER_SERVICES, SERVICES } from "@/Constants/root";
import { useTranslations } from "@/hooks/translations";
import RootLayout from "@/Layouts/Root/RootLayout";
import { Link } from "@inertiajs/react";
import { CircleCheckBig } from "lucide-react";
import { motion, type Variants } from "motion/react";
const listVariants: Variants = {
  offScreen: {
    y: 50,
    opacity: 0,
  },
  onScreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

export default function Page() {
  const { t } = useTranslations();
  return (
    <RootLayout
      title={t("Sistema administrativo para colegios")}
      description={t(
        "SchoolSoft es un sistema administrativo para colegios diseñado en español e inglés con un sistema sofisticado de seguridad para control de acceso.",
      )}
    >
      <div className="absolute top-0 z-[-2] h-full w-full bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
      <MaxWidthSection className="relative">
        <div className="mx-auto grid max-w-(--breakpoint-xl) lg:grid-cols-12 lg:gap-8 xl:gap-0">
          <div className="mr-auto flex flex-col items-center place-self-center md:mx-auto lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 max-w-2xl text-center text-4xl leading-none font-extrabold tracking-tight md:mb-6 md:text-4xl xl:text-5xl"
            >
              {t("Sistema administrativo para colegios")}
            </motion.h1>
            <motion.p
              transition={{ delay: 0.5 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-muted-foreground mb-6 max-w-prose font-light text-pretty lg:mb-8"
            >
              {t(
                "Programa diseñado en español e inglés con un sistema sofisticado de seguridad para control de acceso. Este sistema administrativo facilita las labores administrativas aumentando la eficiencia de los trabajos proveyendo mas tiempo para concentrarse en la fase de supervisión de los procesos educativos.",
              )}
            </motion.p>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center"
            >
              <Button asChild>
                <Link href="/">{t("Solicita una demostración")}</Link>
              </Button>
            </motion.div>
          </div>
          <div className="hidden lg:col-span-5 lg:mt-0 lg:flex lg:justify-center">
            <motion.img
              transition={{ delay: 0.5, duration: 0.5 }}
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="aspect-541/784"
              src="/assets/schoolsoft-book.png"
              alt="Schoolsoft libro"
            />
          </div>
        </div>
      </MaxWidthSection>
      <MaxWidthSection>
        <div className="mx-auto max-w-(--breakpoint-lg)">
          <motion.h2
            initial="offScreen"
            whileInView="onScreen"
            viewport={{ once: true }}
            variants={listVariants}
            className="title mb-8"
          >
            {t("Servicios")}
          </motion.h2>
          <div className="space-y-8 md:grid md:grid-cols-2 md:gap-10 md:space-y-0 lg:grid-cols-3">
            {SERVICES.map(({ title, description, Icon }, i) => (
              <motion.div
                key={i}
                initial="offScreen"
                whileInView="onScreen"
                viewport={{ once: true, amount: 0.8 }}
              >
                <motion.div variants={listVariants} className="h-full">
                  <ServiceCard
                    className="h-full"
                    title={t(title)}
                    description={description}
                    icon={<Icon className="text-primary ml-auto size-6 stroke-2 md:mx-auto" />}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </MaxWidthSection>
      <MaxWidthSection>
        <div className="mx-auto max-w-(--breakpoint-lg)">
          <motion.h2
            initial="offScreen"
            whileInView="onScreen"
            viewport={{ once: true }}
            variants={listVariants}
            className="title mb-8"
          >
            {t("Otros Servicios")}
          </motion.h2>
          <div className="grid max-w-3xl grid-cols-1 gap-2 md:mx-auto md:mb-2 md:grid-cols-2">
            {OTHER_SERVICES.map(({ title }) => (
              <motion.div
                key={title}
                initial="offScreen"
                whileInView="onScreen"
                viewport={{ once: true, amount: 0.8 }}
                className="h-full"
              >
                <motion.div variants={listVariants} key={title} className="h-full">
                  <div className="bg-muted flex h-full items-center gap-x-2 rounded p-4">
                    <CircleCheckBig className="text-primary size-4" />
                    <p className="text-muted-foreground shrink text-xs font-medium sm:text-sm">
                      {t(title)}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </MaxWidthSection>
    </RootLayout>
  );
}
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}
function ServiceCard({ title, description, icon, className }: ServiceCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-1.5">
        <div>
          {icon}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-xs text-pretty">{description}</p>
      </CardContent>
    </Card>
  );
}
