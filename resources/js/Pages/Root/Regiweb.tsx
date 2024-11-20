import { List } from "@/Components/root/List";
import { MaxWidthSection } from "@/Components/root/MaxWidthSection";
import { REGIWEB } from "@/Constants/root";
import { Head } from "@inertiajs/react";

export default function Page() {
  return (
    <>
      <Head title="Regiweb" />
      <MaxWidthSection>
        <div className="cointainer mx-auto max-w-4xl">
          <h2 className="title">Regiweb</h2>
          <List items={REGIWEB} />
        </div>
      </MaxWidthSection>
    </>
  );
}
