"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderService, type CreateOrderInput } from "./service";

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => orderService.list(),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => orderService.getById(id),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateOrderInput) => orderService.create(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}


