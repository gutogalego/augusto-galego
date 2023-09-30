import { Metadata } from "next";

import UILayout from "~/components/ui-layout";

export const metadata: Metadata = {
  title: "Examples",
  description: "Check out some examples app built using the components.",
};

interface ExamplesLayoutProps {
  children: React.ReactNode;
}

export default function ExamplesLayout({ children }: ExamplesLayoutProps) {
  return (
    <>
      <UILayout><>A</></UILayout>
    </>
  );
}
