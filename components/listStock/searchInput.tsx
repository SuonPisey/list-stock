"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
const SearchInputCompo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (value.trim()) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [value, router, searchParams]);

  return (
    <div>
      <Input
        type="text"
        placeholder="Search by name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
export default SearchInputCompo;
