import { Metadata } from "next";
import Dashboard from "../components/common/dashboard/dashboard";
import AppProvider from "../contexts/appProvider";

export const metadata: Metadata = {
  title: "Dashboard App",
  description: "Powered by NextJS & Material-UI",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProvider>
          <Dashboard>{children}</Dashboard>
        </AppProvider>
      </body>
    </html>
  );
}
