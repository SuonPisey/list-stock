import { categories } from "@/components/listStock/data/categories";
import { DataTableStock } from "@/components/listStock/dataTable";
import DeleteStockByIdCompo from "@/components/listStock/form/deleteStockById";
import DeleteStockSelected from "@/components/listStock/form/deleteStockSelected";
import UpdateStockByItem from "@/components/listStock/form/updateStockByItem";
import SearchInputCompo from "@/components/listStock/searchInput";
import ChangeThemeComponent from "@/components/store/theme";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { CircleCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
type typeFilterChange = "category" | "inStock" | "minRating" | "pageSize";
const ListStockCompo = () => {
  const pageSizeOptions = [5, 10, 20, 50, 100];
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  // state
  const [pageSize, setPageSize] = useState(pageSizeOptions[0].toString());
  const [minRating, setMinRating] = useState<number>(0);
  const [updateItemId, setUpdateItemId] = useState<number | null>(null);
  const [deleteItemSelected, setDeleteItemSelected] = useState<number[]>([]);
  const [isUpdateStockOpen, setIsUpdateStockOpen] = useState<boolean>(false);
  const [isDeleteStockOpen, setIsDeleteStockOpen] = useState<boolean>(false);
  const [isDeleteSelectedOpen, setIsDeleteSelectedOpen] =
    useState<boolean>(false);
  const handleFilterChange = (value: string, type: typeFilterChange) => {
    if (type === "category") {
      params.set("category", value);
    } else if (type === "inStock") {
      params.set("inStock", value);
    } else if (type === "minRating") {
      if (value === "0") {
        params.delete("minRating");
      } else {
        params.set("minRating", value);
      }
    } else if (type === "pageSize") {
      params.set("pageSize", value);
    }
    router.push(`?${params.toString()}`);
  };
  const handleOpenUpdateModal = (id: number) => {
    setIsUpdateStockOpen(true);
    setUpdateItemId(id);
  };
  const handleDeleteModalById = (id: number) => {
    setIsDeleteStockOpen(true);
    setUpdateItemId(id);
  };
  const handleDeleteSelected = (selectedIds: number[]) => {
    setDeleteItemSelected(selectedIds);
  };
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (pageSize) {
      params.set("pageSize", pageSize);
    } else {
      params.delete("pageSize");
    }
    router.push(`/`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className=" min-h-screen p-8">
      <Card className="w-full p-6 ">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CircleCheck className="text-blue-500" absoluteStrokeWidth/>
            <p className="text-xl font-bold"> Inventory Dashboard</p>
          </div>
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
            <SearchInputCompo />
          </div>
          <div>
            <p>Category</p>
            <Select
              onValueChange={(value) => handleFilterChange(value, "category")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>{" "}
          <div>
            <p>Page size</p>
            <Select
              value={pageSize}
              onValueChange={(value) => {
                setPageSize(value);
                handleFilterChange(value, "pageSize");
              }}
            >
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
            <Checkbox
              id="in-stock"
              onCheckedChange={(checked) =>
                handleFilterChange(checked ? "true" : "false", "inStock")
              }
            />
            <p>In Stock only</p>
          </div>{" "}
          <div>
            <p>Min rating: {minRating}</p>
            <Slider
              max={5}
              step={1}
              className={cn("w-[60%]", "mt-4")}
              defaultValue={[0]}
              onValueChange={(value) => {
                handleFilterChange(value[0].toString(), "minRating");
                setMinRating(value[0]);
              }}
            />
          </div>
        </div>
      </Card>
      <div className="mt-4">
        <DataTableStock
          handleOpenUpdateModal={handleOpenUpdateModal}
          handleDeleteModalById={handleDeleteModalById}
          handleDeleteSelected={handleDeleteSelected}
          handleOpenDeleteSelectedModal={() => setIsDeleteSelectedOpen(true)}
        />
      </div>
      {isUpdateStockOpen && updateItemId !== null && (
        <UpdateStockByItem
          itemId={updateItemId}
          isOpen={isUpdateStockOpen}
          onClose={() => setIsUpdateStockOpen(false)}
        />
      )}
      {isDeleteStockOpen && updateItemId !== null && (
        <DeleteStockByIdCompo
          itemId={updateItemId}
          isOpen={isDeleteStockOpen}
          onClose={() => setIsDeleteStockOpen(false)}
        />
      )}
      {isDeleteSelectedOpen && deleteItemSelected.length > 0 && (
        <DeleteStockSelected
          isOpen={isDeleteSelectedOpen}
          onClose={() => setIsDeleteSelectedOpen(false)}
          selectedIds={deleteItemSelected}
        />
      )}
    </div>
  );
};

export default ListStockCompo;
