import { ContactForm } from "@/Components/root/ContactForm";
import { MaxWidthSection } from "@/Components/root/MaxWidthSection";
import { Head } from "@inertiajs/react";

export default function Page() {
  return (
    <>
      <Head title="Contacto" />
      <MaxWidthSection>
        <h1 className="title">Formulario de contacto</h1>
        <ContactForm />
      </MaxWidthSection>
    </>
  );
}
