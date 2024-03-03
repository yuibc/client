import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-7 flex-grow">
              {children}
            </main>
            <footer className="w-full flex flex-col items-center justify-center p-3 mt-7 border-t-1 border-t-default-100">
              <div className="grid grid-cols-6 gap-y-2 h-[460px] container mx-auto max-w-7xl pt-7 flex-grow">
                <div className="w-full col-span-2">
                  <h1 className="text-3xl">YUI</h1>
                  <p className="">
                    Where pixels transform into masterpieces, embraces NFT Art
                    as a medium of expression and innovation.
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="">© 2024 - Networks, Inc</p>
                <span className="flex gap-2">
                  <p>Privacy Policy</p>
                  <p>Terms of Service</p>
                </span>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
