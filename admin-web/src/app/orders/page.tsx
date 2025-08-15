"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateOrder, useOrders } from '@/domains/orders/hooks';
import { useProducts } from '@/domains/products/hooks';
import { useState } from 'react';

export default function OrdersPage() {
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: orders = [], isLoading: ordersLoading } = useOrders();
  const createOrder = useCreateOrder();

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<string>('1');

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
      <form
        className="flex gap-2 items-end"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!selectedProductId) return;
          await createOrder.mutateAsync({ productId: selectedProductId, quantity: Number(quantity || 1) });
          setSelectedProductId(null);
          setQuantity('1');
        }}
      >
        <div className="grid gap-1 min-w-64">
          <Label htmlFor="productId">Product</Label>
          <Select value={selectedProductId ?? ''} onValueChange={setSelectedProductId}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              {productsLoading ? null : products.map(p => (
                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1">
          <Label htmlFor="quantity">Quantity</Label>
          <Input id="quantity" name="quantity" type="number" min={1} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <Button type="submit" disabled={!selectedProductId || createOrder.isPending}>Create</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Snapshot Price</TableHead>
            <TableHead>Qty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersLoading ? (
            <TableRow><TableCell colSpan={3}>Loading...</TableCell></TableRow>
          ) : (
            orders.map(o => (
              <TableRow key={o.id}>
                <TableCell>{o.productName}</TableCell>
                <TableCell>{o.productPrice}</TableCell>
                <TableCell>{o.quantity}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
        </CardContent>
      </Card>
    </div>
  );
}


