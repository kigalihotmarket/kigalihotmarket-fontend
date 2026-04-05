import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IProduct, IProductRequest, ProductCategory } from "@/types/common";
import { PRODUCT } from "@/utils/constants/queryKeys";
import OptionsField from "../common/form/OptionsField";
import TextField from "../common/form/TextField";
import Button from "../common/form/Button";
import { FormControl, FormField, FormLabel, FormMessage } from "../ui/form";
import { type SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { productSchema } from "@/utils/schemas/product.schema";
import { createProduct, updateProduct } from "@/apis/product";

interface IProductForm {
  product?: IProduct;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isView?: boolean;
}

const ProductForm: FC<IProductForm> = ({ product, setIsOpen }) => {
  const queryClient = useQueryClient();

  const methods = useForm<IProductRequest>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      teaser: product?.teaser || "",
      model: product?.model || "",
      warranty: product?.warranty || "",
      featuresOne: product?.featuresOne || "",
      featuresTwo: product?.featuresTwo || "",
      featuresThree: product?.featuresThree || "",
      featuresFour: product?.featuresFour || "",
      featuresFive: product?.featuresFive || "",
      featuresFix: product?.featuresFix || "",
      featuresSeven: product?.featuresSeven || "",
      featuresEight: product?.featuresEight || "",
      featuresNine: product?.featuresNine || "",
      featuresTen: product?.featuresTen || "",
      description: product?.description || "",
      price: product?.price || 0,
      discountPercentage: product?.discountPercentage || 0,
      category: product?.category || "",
      brand: product?.brand || "",
      stockQuantity: product?.stockQuantity || 0,
      thumbnail: product?.thumbnail || "",
      galleryImages: product?.galleryImages || [],
    },
  });

  const { register, handleSubmit, reset, formState: { errors }, control } = methods;

  const [gallery, setGallery] = useState<(string | File)[]>(product?.galleryImages || []);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [galleryUrls, setGalleryUrls] = useState<Record<number, string>>({});
  const [visibleFeatures, setVisibleFeatures] = useState<number>(1);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (thumbnailUrl) {
        URL.revokeObjectURL(thumbnailUrl);
      }
      Object.values(galleryUrls).forEach(url => URL.revokeObjectURL(url));
    };
  }, [thumbnailUrl, galleryUrls]);

  const handleRemoveGalleryItem = (index: number) => {
    // Clean up the URL before removing
    if (galleryUrls[index]) {
      URL.revokeObjectURL(galleryUrls[index]);
      const newUrls = {...galleryUrls};
      delete newUrls[index];
      setGalleryUrls(newUrls);
    }
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddGalleryFiles = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).filter(file => 
        file.type.startsWith('image/')
      );
      
      // Create object URLs for new files
      const newUrls = {...galleryUrls};
      newFiles.forEach((file, i) => {
        const newIndex = gallery.length + i;
        newUrls[newIndex] = URL.createObjectURL(file);
      });
      setGalleryUrls(newUrls);
      
      setGallery((prev) => [...prev, ...newFiles]);
    }
  };

  const handleGalleryUpload = () => {
    const galleryInput = document.getElementById("gallery-upload") as HTMLInputElement;
    if (galleryInput?.files) {
      handleAddGalleryFiles(galleryInput.files);
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (value && index === visibleFeatures) {
      setVisibleFeatures((prev) => Math.min(prev + 1, 10));
    }
  };

  const createProductMutation = useMutation((data: FormData) => createProduct(data));
  const updateProductMutation = useMutation(({ id, data }: { id: string; data: FormData }) => updateProduct(id, data));

  const onSubmit: SubmitHandler<IProductRequest> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("teaser", data.teaser);
      formData.append("model", data.model || "");
      formData.append("warranty", data.warranty);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("discountPercentage", data.discountPercentage.toString());
      formData.append("category", String(data.category));
      formData.append("brand", data.brand);
      formData.append("stockQuantity", data.stockQuantity.toString());
      formData.append("featuresOne", data.featuresOne || "");
      formData.append("featuresTwo", data.featuresTwo || "");
      formData.append("featuresThree", data.featuresThree || "");
      formData.append("featuresFour", data.featuresFour || "");
      formData.append("featuresFive", data.featuresFive || "");
      formData.append("featuresFix", data.featuresFix || "");
      formData.append("featuresSeven", data.featuresSeven || "");
      formData.append("featuresEight", data.featuresEight || "");
      formData.append("featuresNine", data.featuresNine || "");
      formData.append("featuresTen", data.featuresTen || "");

      const thumbnailInput = document.getElementById("thumbnail-upload") as HTMLInputElement;
      if (thumbnailInput?.files?.[0]) {
        formData.append("thumbnail", thumbnailInput.files[0]);
      } else if (product?.thumbnail) {
        formData.append("thumbnail", product.thumbnail);
      }

      gallery.forEach((item, index) => {
        if (item instanceof File) {
          formData.append(`galleryImages[${index}]`, item);
        } else {
          formData.append(`galleryImages[${index}]`, item);
        }
      });

      if (product && product.id) {
        updateProductMutation.mutate(
          { id: product.id, data: formData },
          {
            onSuccess() {
              toast.success("Product updated successfully");
              setIsOpen(false);
              queryClient.invalidateQueries(PRODUCT);
              reset();
            },
            onError(error) {
              toast.error("Failed to update product");
            },
          }
        );
      } else {
        createProductMutation.mutate(formData, {
          onSuccess() {
            toast.success("Product created successfully");
            setIsOpen(false);
            queryClient.invalidateQueries(PRODUCT);
            reset();
          },
          onError(error) {
            toast.error("Failed to create product");
          },
        });
      }
    } catch (error) {
      toast.error("Error processing product");
    }
  };

  const categoryData = [
    "WOMENS_FASHION",
    "MENS_FASHION",
    "FASHION",
    "ELECTRONICS",
    "FURNITURES",
    "MADE_IN_RWANDA",
    "HOME_AND_LIVING",
    "SUPERMARKETING",
    "MOBILES_AND_TABLETS",
    "COMPUTERS_AND_GAMING",
    "HEALTH_AND_BEAUTY",
    "SPORTS_EQUIPMENT",
    "ART_AND_ENTERTAINMENT",
    "RESTAURANTS",
    "JEWELRY_AND_WATCHES",
    "KIDS_AND_BABIES",
    "AUTO_SPARE_PARTS",
    "VEHICLES_SHOPPING",
  ];

  return (
    <FormProvider {...methods}>
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 flex-col">
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Product Name"
          type="text"
          error={errors.name?.message}
          register={register("name")}
        />
         <OptionsField
          label="Category"
          register={register("category")}
          error={errors.category?.message}
          required={true}
          defaultLabel="Select Category"
          options={categoryData.map((type) => ({
            value: type,
            label: type.replace("_", " "),
          }))}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Model"
          type="text"
          error={errors.model?.message}
          register={register("model")}
        />

<TextField
          label="Brand"
          type="text"
          error={errors.brand?.message}
          register={register("brand")}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
      <TextField
          label="Teaser"
          type="text"
          error={errors.teaser?.message}
          register={register("teaser")}
        />
        <TextField
          label="Warranty"
          type="text"
          error={errors.warranty?.message}
          register={register("warranty")}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">

      <TextField
          label="Price"
          type="number"
          error={errors.price?.message}
          register={register("price")}
        />
        <TextField
          label="Discount Percentage"
          type="number"
          error={errors.discountPercentage?.message}
          register={register("discountPercentage")}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
      <TextField
          label="Stock Quantity"
          type="number"
          error={errors.stockQuantity?.message}
          register={register("stockQuantity")}
        />
        <TextField
          label="Feature 1"
          type="text"
          error={errors.featuresOne?.message}
          register={register("featuresOne")}
          onChange={(e) => handleFeatureChange(1, e.target.value)}
        />
        </div>
        {visibleFeatures >= 2 && (
           <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Feature 2"
            type="text"
            error={errors.featuresTwo?.message}
            register={register("featuresTwo")}
            onChange={(e) => handleFeatureChange(2, e.target.value)}
          />
          {visibleFeatures >= 3 && (
          <TextField
            label="Feature 3"
            type="text"
            error={errors.featuresThree?.message}
            register={register("featuresThree")}
            onChange={(e) => handleFeatureChange(3, e.target.value)}
          />
        )}
        </div>
        )}
      {visibleFeatures >= 4 && (
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Feature 4"
            type="text"
            error={errors.featuresFour?.message}
            register={register("featuresFour")}
            onChange={(e) => handleFeatureChange(4, e.target.value)}
          />
          {visibleFeatures >= 5 && (
            <TextField
              label="Feature 5"
              type="text"
              error={errors.featuresFive?.message}
              register={register("featuresFive")}
              onChange={(e) => handleFeatureChange(5, e.target.value)}
            />
          )}
        </div>
      )}
      {visibleFeatures >= 6 && (
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Feature 6"
            type="text"
            error={errors.featuresFix?.message}
            register={register("featuresFix")}
            onChange={(e) => handleFeatureChange(6, e.target.value)}
          />
          {visibleFeatures >= 7 && (
            <TextField
              label="Feature 7"
              type="text"
              error={errors.featuresSeven?.message}
              register={register("featuresSeven")}
              onChange={(e) => handleFeatureChange(7, e.target.value)}
            />
          )}
        </div>
      )}
      {visibleFeatures >= 8 && (
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Feature 8"
            type="text"
            error={errors.featuresEight?.message}
            register={register("featuresEight")}
            onChange={(e) => handleFeatureChange(8, e.target.value)}
          />
          {visibleFeatures >= 9 && (
            <TextField
              label="Feature 9"
              type="text"
              error={errors.featuresNine?.message}
              register={register("featuresNine")}
              onChange={(e) => handleFeatureChange(9, e.target.value)}
            />
          )}
        </div>
      )}
      {visibleFeatures >= 10 && (
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Feature 10"
            type="text"
            error={errors.featuresTen?.message}
            register={register("featuresTen")}
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
      <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <div>
              <FormLabel className="text-gray-500 text-xs">Description</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className="w-full rounded-md border px-3 py-10 text-sm"
                  placeholder="Enter product description"
                />
              </FormControl>
              <FormMessage />
            </div>
          )}
        />
         <FormField
          control={control}
          name="thumbnail"
          render={({ field }) => {
            const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files.length > 0) {
                // Clean up previous URL if exists
                if (thumbnailUrl) {
                  URL.revokeObjectURL(thumbnailUrl);
                }

                const file = e.target.files[0];
                field.onChange(file);

                try {
                  setThumbnailUrl(URL.createObjectURL(file));
                } catch (error) {
                  console.error("Error creating object URL:", error);
                  setThumbnailUrl(null);
                }
              }
            };

            const previewUrl = thumbnailUrl || product?.thumbnail;

            return (
              <div>
                <FormLabel className="text-gray-500 text-xs">
                  Upload Thumbnail
                </FormLabel>
                <FormControl>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                </FormControl>
                <label htmlFor="thumbnail-upload" className="cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center w-32 h-32">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm">Click to upload</span>
                    )}
                  </div>
                </label>
                <FormMessage />
              </div>
            );
          }}
        />
      </div>
      <div className="block">
       
      </div>
      <div className="block">
        <FormField
          control={control}
          name="galleryImages"
          render={() => (
            <div>
              <FormLabel className="text-gray-500 text-xs">
                Upload Gallery
              </FormLabel>
              <div className="mb-2">
                <div className="flex gap-2 flex-wrap mb-2">
                  {gallery.map((item, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={item instanceof File ? 
                          galleryUrls[index] || URL.createObjectURL(item) : 
                          item}
                        alt={`Gallery Image ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryItem(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <FormControl>
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleGalleryUpload()}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="gallery-upload"
                    />
                    <label 
                      htmlFor="gallery-upload" 
                      className="block w-full rounded-md border bg-background px-3 py-3 text-sm text-center cursor-pointer"
                    >
                      {gallery.length > 0 ? 'Add more images' : 'Select gallery images'}
                    </label>
                  </div>
                </FormControl>
                <p className="text-xs text-gray-500 mt-1">
                  {gallery.length} images selected
                </p>
              </div>
              <FormMessage />
            </div>
          )}
        />
      </div>
      <div className="py-4 mx-auto flex items-center justify-end md:justify-start md:flex-start space-x-2">
        <Button
          isLoading={
            product && product.id
              ? updateProductMutation.isLoading
              : createProductMutation.isLoading
          }
          label={product && product.id ? "Update product" : "Create product"}
        />
      </div>
    </form>
  </FormProvider>
  );
};

export default ProductForm;