"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productService, type CreateProductInput, type UpdateProductInput } from "./service";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => productService.list(),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateProductInput) => productService.create(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateProductInput }) => 
      productService.update(id, input),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["products", id] });
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}


