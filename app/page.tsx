"use client";

import ListStockCompo from "@/components/listStock";
import { Suspense } from "react";

export default function ListStockPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListStockCompo />
    </Suspense>
  );
}
