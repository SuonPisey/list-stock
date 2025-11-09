import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import dataStock from "../data/dataStock.json";
interface itemData {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
  price: number;
  stock: number;
  rating: number;
  created: string;
}
const UpdateStockByItem = ({
  itemId,
  isOpen,
  onClose,
}: {
  itemId: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  //state
  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    categoryId: z.number().min(1, "Category is required."),
    price: z.number().min(0, "Price must be at least 0."),
    stock: z.number().min(0, "Stock must be at least 0."),
    rating: z
      .number()
      .min(0, "Rating must be at least 0")
      .max(5, "Rating cannot be more than 5"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      categoryId: 0,
      price: 0,
      stock: 0,
      rating: 0,
    },
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);
  };
  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);
  useEffect(() => {
    if (itemId) {
      const item = (dataStock as itemData[]).find((item) => item.id === itemId);
      if (item) {
        form.reset({
          name: item.name,
          categoryId: item.categoryId,
          price: item.price,
          stock: item.stock,
          rating: item.rating,
        });
      }
    } else {
      return;
    }
  }, [itemId]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="min-w-[800px]">
          <Form {...form}>
            <DialogHeader>
              <DialogTitle>Update Stock By Item Id: {itemId}</DialogTitle>
              <DialogDescription>
                This is a placeholder for the Update Stock By Item form.
              </DialogDescription>{" "}
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid w-full  grid-cols-2  gap-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Please input name " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="Please input category" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="Please input price " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock </FormLabel>
                      <FormControl>
                        <Input placeholder="Please input stock " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating </FormLabel>
                      <FormControl>
                        <Input placeholder="Please input rating " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
              </div>
              <div className="flex justify-end mt-4">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default UpdateStockByItem;
