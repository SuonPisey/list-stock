"use client";

import { categories } from "@/components/listStock/data/categories";
import { DataTableStock } from "@/components/listStock/dataTable";
import ChangeThemeComponent from "@/components/store/theme";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useState } from "react";


export default function ListStockPage() {

  const pageSizeOptions = [5, 10, 20, 50, 100];
  // state
  const [pageSize, setPageSize] = useState(pageSizeOptions[0].toString());
  return (
    <div className=" min-h-screen p-8">
      <Card className="w-full p-6 ">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">Inventory Dashboard</p>
          <div>
            <ChangeThemeComponent />
            <Button className="ml-4" variant={"default"}>
              Menu
            </Button>
          </div>
        </div>
      </Card>
      <Card className="w-full p-6 mt-4">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p>Search</p>
            <Input placeholder="Search items..." />
          </div>
          <div>
            <p>Category</p>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>{" "}
          <div>
            <p>Page size</p>
            <Select value={pageSize} onValueChange={setPageSize}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select page size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Page Size</SelectLabel>
                  {pageSizeOptions.map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>{" "}
          <div className="flex  gap-2 items-center mt-6">
            <Checkbox id="in-stock" />
            <p>In Stock only</p>
          </div>{" "}
          <div>
            <p>Min rating:0</p>
            <Slider
              max={5}
              step={1}
              className={cn("w-[60%]", "mt-4")}
              defaultValue={[0]}
            />
          </div>
        </div>
      </Card>
      <div className="mt-4">
        <DataTableStock />
      </div>
    </div>
  );
}
