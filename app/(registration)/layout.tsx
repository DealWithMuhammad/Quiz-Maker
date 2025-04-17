import { LayoutForm } from "@/components/layout/layoutForm";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutForm>{children}</LayoutForm>;
}
