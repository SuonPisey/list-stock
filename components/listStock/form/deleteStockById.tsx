import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
const DeleteStockByIdCompo = ({
  itemId,
  isOpen,
  onClose,
}: {
  itemId: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const handleDelete = () => {
    console.log("Deleting item with ID:", itemId);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Stock Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the stock item with ID {itemId}?
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteStockByIdCompo;
