import { Controller, useForm } from "react-hook-form";
import type { ProductType } from "../lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../actions/product";
import toast from "react-hot-toast";

interface ModalContentProps {
  onClose: () => void;
}
export default function AddProductModal({ onClose }: ModalContentProps) {
  const queryClient = useQueryClient();

  const { mutate: addProduct, isPending } = useMutation({
    mutationFn: createProduct,
    mutationKey: ["products"],
    onSuccess: () => {
      toast.success("Product Added successfully");
      onClose();
      queryClient.invalidateQueries({ queryKey: ["products"] }); //Invalidating the query of products that will auto refetch the latest products
    },
    onError: (error) => {
      toast.error("Failed to add product Error: " + error?.message);
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProductType>({
    defaultValues: {
      title: "",
      category: "",
      price: 0,
      stock: 0,
    },
  });

  const onSubmit = (data: ProductType) => {
    addProduct(data);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-100 flex items-center justify-center">
      <div className="absolute inset-0" onClick={() => onClose()}></div>
      <div className="bg-gray-200 z-10 shadow-xl p-5 rounded-lg w-lg flex items-center justify-center">
        <div className="flex flex-col gap-3 items-center justify-center w-full">
          <div className="text-xl font-bold">Add Product</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 mb-3">
              <div>
                <Controller
                  control={control}
                  name="title"
                  rules={{
                    required: "Name is Required",
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor="name"
                        className={`text-sm font-medium  ${fieldState.error ? "text-red-500" : "text-slate-700"}`}
                      >
                        Title
                      </label>
                      <input
                        id="name"
                        {...field}
                        className={`font-medium bg-white w-full text-md border  rounded-md px-2 p-1 ${fieldState.error ? "border-red-700 focus:outline-red-800" : "border-slate-700 focus:outline-slate-800"}`}
                        placeholder="Enter Name"
                      />
                    </>
                  )}
                />
                {errors.title && (
                  <div className="text-xs text-red-500">
                    {errors.title.message}
                  </div>
                )}
              </div>
              <div>
                <Controller
                  control={control}
                  name="price"
                  rules={{
                    required: "Price is Required",
                    min: 1,
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor="price"
                        className={`text-sm font-medium  ${fieldState.error ? "text-red-500" : "text-slate-700"}`}
                      >
                        Price
                      </label>
                      <input
                        {...field}
                        id="price"
                        type="number"
                        className={`font-medium bg-white w-full text-md border  rounded-md px-2 p-1 ${fieldState.error ? "border-red-700 focus:outline-red-800" : "border-slate-700 focus:outline-slate-800"}`}
                        placeholder="Enter price"
                      />
                    </>
                  )}
                />
                {errors.price?.type == "required" && (
                  <div className="text-xs text-red-500">
                    {errors.price.message}
                  </div>
                )}
                {errors.price?.type == "min" && (
                  <div className="text-xs text-red-500">
                    Price must be greater than 0
                  </div>
                )}
              </div>

              <div>
                <Controller
                  control={control}
                  name="stock"
                  rules={{
                    required: "Stock Quantity is Required",
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor="stock_quantity"
                        className={`text-sm font-medium  ${fieldState.error ? "text-red-500" : "text-slate-700"}`}
                      >
                        Stock Quantity
                      </label>
                      <input
                        {...field}
                        id="stock_quantity"
                        type="number"
                        className={`font-medium bg-white w-full text-md border  rounded-md px-2 p-1 ${fieldState.error ? "border-red-700 focus:outline-red-800" : "border-slate-700 focus:outline-slate-800"}`}
                        placeholder="Enter price"
                      />
                    </>
                  )}
                />

                {errors.stock?.type == "required" && (
                  <div className="text-xs text-red-500">
                    {errors.stock.message}
                  </div>
                )}
                {errors.stock?.type == "min" && (
                  <div className="text-xs text-red-500">
                    Stock Quantity must be greater than 0
                  </div>
                )}
              </div>
            </div>
            <button
              className={`w-full bg-cyan-500  p-1 px-2 rounded-md cursor-pointer ${!isDirty ? "opacity-50 cursor-not-allowed!" : ""}`}
              disabled={!isDirty}
            >
              {isPending ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
