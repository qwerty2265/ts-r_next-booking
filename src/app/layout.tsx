import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import AuthProvider from "@/lib/providers/auth-provider";

export const metadata: Metadata = {

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <AuthProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {children}
          </AppRouterCacheProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
