"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateProduct, useProducts } from '@/domains/products/hooks';
import { useState } from 'react';

export default function ProductsPage() {
  const { data: products = [], isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const [form, setForm] = useState({ name: '', description: '', price: '' });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
      <form
        className="flex gap-2 items-end"
        onSubmit={async (e) => {
          e.preventDefault();
          await createProduct.mutateAsync({ name: form.name, description: form.description, price: Number(form.price || 0) });
          setForm({ name: '', description: '', price: '' });
        }}
      >
        <div className="grid gap-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Product name" required value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="description">Description</Label>
          <Input id="description" name="description" placeholder="Optional" value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" step="0.01" placeholder="0.00" required value={form.price} onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))} />
        </div>
        <Button type="submit" disabled={createProduct.isPending}>Add</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow><TableCell colSpan={3}>Loading...</TableCell></TableRow>
          ) : (
            products.map(p => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell>{p.description}</TableCell>
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


