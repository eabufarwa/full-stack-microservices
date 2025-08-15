import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ReactQueryProvider } from "@/components/providers/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin Web",
  description: "Admin Web", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased p-6`}>
        <ReactQueryProvider>
          <Container>
            <Card>
              <CardContent>
              <nav className="flex gap-2 mb-6">
                <Link href="/products" className={cn(buttonVariants({ variant: "link" }))}>Products</Link>
                <Link href="/orders" className={cn(buttonVariants({ variant: "link" }))}>Orders</Link>
              </nav>
              {children}
              </CardContent>
            </Card>
          </Container>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
