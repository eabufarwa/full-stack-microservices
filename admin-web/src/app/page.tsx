import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Admin</CardTitle>
          <CardDescription>Quick links</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Link className={cn(buttonVariants({ variant: "link" }))} href="/products">Go to Products</Link>
            <Link className={cn(buttonVariants({ variant: "link" }))} href="/orders">Go to Orders</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
