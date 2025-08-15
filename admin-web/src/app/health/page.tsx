"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type Health = { status?: string; timestamp?: string } | { statusCode?: number; message?: string } | unknown;

async function fetchJson(path: string): Promise<{ ok: boolean; data: Health }> {
  try {
    const res = await fetch(path, { cache: "no-store", headers: { "X-Request-ID": `${Date.now()}-health` } });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, data };
  } catch {
    return { ok: false, data: { message: "unreachable" } } as any;
  }
}

export default function HealthPage() {
  const [gateway, setGateway] = useState<{ ok: boolean; data: Health } | null>(null);
  const [products, setProducts] = useState<{ ok: boolean; data: Health } | null>(null);
  const [orders, setOrders] = useState<{ ok: boolean; data: Health } | null>(null);

  useEffect(() => {
    void (async () => {
      const [g, p, o] = await Promise.all([
        fetchJson("/health"),
        fetchJson("/api/products/health"),
        fetchJson("/api/orders/health"),
      ]);
      setGateway(g);
      setProducts(p);
      setOrders(o);
    })();
  }, []);

  const render = (title: string, s: { ok: boolean; data: Health } | null) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{s ? (s.ok ? "ok" : "error") : "loading..."}</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="text-xs whitespace-pre-wrap break-all">{JSON.stringify(s?.data ?? {}, null, 2)}</pre>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {render("Gateway /health", gateway)}
      {render("Product Service /api/products/health", products)}
      {render("Order Service /api/orders/health", orders)}
    </div>
  );
}


