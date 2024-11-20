import { List } from "@/Components/root/List";
import { MaxWidthSection } from "@/Components/root/MaxWidthSection";
import { MODULES } from "@/Constants/root";
import { Head } from "@inertiajs/react";
export default function Page() {
  return (
    <>
      <Head title="Modulos" />
      <MaxWidthSection>
        <div className="cointainer mx-auto max-w-4xl">
          <h2 className="title">Modulos</h2>
          <List items={MODULES} />
        </div>
      </MaxWidthSection>
    </>
  );
}
