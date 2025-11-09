import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
const DeleteStockSelected = ({
  isOpen,
  onClose,
  selectedIds,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedIds: number[];
}) => {
  const handleDelete = () => {
    console.log("Deleting items with IDs:", selectedIds);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Selected Stocks</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the selected stocks with IDs:{" "}
            {selectedIds.join(", ")}.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteStockSelected;
