"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import dataStock from "./data/dataStock.json";
import StarRating from "./starRating";

type StockItem = {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
  price: number;
  stock: number;
  rating: number;
  created: string;
};

export function DataTableStock({
  handleOpenUpdateModal,
  handleDeleteModalById,
  handleDeleteSelected,
  handleOpenDeleteSelectedModal,
}: {
  handleOpenUpdateModal: (id: number) => void;
  handleDeleteModalById: (id: number) => void;
  handleDeleteSelected: (id: number[]) => void;
  handleOpenDeleteSelectedModal: () => void;
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [data, setData] = React.useState<StockItem[]>(dataStock);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [selectedProductIds, setSelectedProductIds] = React.useState<number[]>(
    []
  );
  const columns: ColumnDef<StockItem>[] = [
    {
      id: "select",
      header: ({ table }) => {
        // Get all visible product ids
        const visibleIds = table
          .getRowModel()
          .rows.map((row) => row.original.id);
        const allSelected = visibleIds.every((id) =>
          selectedProductIds.includes(id)
        );
        const someSelected = visibleIds.some((id) =>
          selectedProductIds.includes(id)
        );
        return (
          <Checkbox
            checked={
              allSelected ? true : someSelected ? "indeterminate" : false
            }
            onCheckedChange={(value) => {
              if (value) {
                setSelectedProductIds((prev) =>
                  Array.from(new Set([...prev, ...visibleIds]))
                );
              } else {
                setSelectedProductIds((prev) =>
                  prev.filter((id) => !visibleIds.includes(id))
                );
              }
            }}
            aria-label="Select all"
          />
        );
      },
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <Checkbox
            checked={selectedProductIds.includes(id)}
            value={id}
            onCheckedChange={(value) => {
              setSelectedProductIds((prev) =>
                value ? [...prev, id] : prev.filter((pid) => pid !== id)
              );
            }}
            aria-label="Select row"
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "categoryName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("categoryName")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Price ($)</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));

        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "stock",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Stock
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("stock")}</div>
      ),
    },
    {
      accessorKey: "rating",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <StarRating rating={row.getValue("rating")} />,
    },
    {
      accessorKey: "created",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("created")}</div>
      ),
    },
    {
      id: "actions",
      header: () => <span>Actions</span>,
      cell: ({ row }) => {
        return (
          <div>
            <Button
              variant={"default"}
              onClick={() => handleOpenUpdateModal(row.original.id)}
            >
              Edit
            </Button>
            <Button
              className="ml-2"
              variant={"destructive"}
              onClick={() => handleDeleteModalById(row.original.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  const table = useReactTable<StockItem>({
    data,
    columns,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  });
  React.useEffect(() => {
    if (params.get("pageSize")) {
      setPagination((prev) => ({
        ...prev,
        pageSize: parseInt(params.get("pageSize") || "5"),
      }));
    }

    const filteredData = dataStock.filter((item) => {
      //search
      const searchQuery = params.get("search")?.toLowerCase() || "";
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery) &&
        !item.categoryName.toLowerCase().includes(searchQuery)
      ) {
        return false;
      }

      // Filter by category
      const categoryFilter = params.get("category") || 0;
      if (categoryFilter && item.categoryId !== Number(categoryFilter)) {
        return false;
      }

      // Filter by inStock
      const inStockFilter = params.get("inStock");
      if (inStockFilter) {
        const inStock = inStockFilter === "true";
        if (inStock && item.stock <= 0) {
          return false;
        }
      }

      // Filter by minRating
      const minRatingFilter = params.get("minRating");
      if (minRatingFilter) {
        const minRating = parseInt(minRatingFilter);
        if (item.rating < minRating) {
          return false;
        }
      }
      return true;
    });
    setData(filteredData);
  }, [searchParams]);

  React.useEffect(() => {
    if (selectedProductIds.length > 0) {
      handleDeleteSelected(selectedProductIds);
    }
  }, [selectedProductIds]);
  return (
    <div className="w-full">
      <div className=" min-h-[55vh]  rounded-md border  ">
        <Table className="min-w-full ">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className=" ">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          <Button
            onClick={() => {
              handleOpenDeleteSelectedModal();
            }}
            disabled={selectedProductIds.length === 0}
          >
            Delete Selected
          </Button>
        </div>
        <div className="space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            First
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Back
          </Button>
          <div className="inline-flex items-center px-2">
            <div>Page </div>
            <p className="ml-2">
              {table.getState().pagination.pageIndex + 1} /
              {table.getPageCount()}
            </p>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>{" "}
          <Button
            variant="default"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  );
}
