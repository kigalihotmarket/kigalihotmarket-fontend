import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, FC, SetStateAction } from "react";
import toast from "react-hot-toast";
import { IDelivery, IDeliveryRequest } from "@/types/common";
import { DELIVERY } from "@/utils/constants/queryKeys";
import OptionsField from "../common/form/OptionsField";
import TextField from "../common/form/TextField";
import Button from "../common/form/Button";
import { type SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { deliverySchema } from "@/utils/schemas/delivery.schema";
import { updateDelivery } from "@/apis/delivery";

interface IDeliveryForm {
  delivery?: IDelivery;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isView?: boolean;
}

const DeliveryForm: FC<IDeliveryForm> = ({ delivery, setIsOpen }) => {
  const queryClient = useQueryClient();

  const methods = useForm<IDeliveryRequest>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
        customerFirstName: delivery?.customerFirstName || "",
        customerLastName: delivery?.customerLastName || "",
        customerEmail: delivery?.customerEmail || "",
        customerPhone: delivery?.customerPhone || "",
        deliveredAt: delivery?.deliveredAt?.split("T")[0] ||  "",
        province: delivery?.province || "",
        country: delivery?.country || "",
        city: delivery?.city || "",
        address: delivery?.address || "",
        postalCode: delivery?.postalCode || "",
        deliveryStatus: delivery?.deliveryStatus || "",
        estimatedDate: delivery?.estimatedDate?.split("T")[0] || "",
    },
  });

  const { register, handleSubmit, reset, formState: { errors }, control } = methods;


  const updateDeliveryMutation = useMutation(({ id, data }: { id: string; data: Partial<IDeliveryRequest> }) => updateDelivery(id, data));

  const onSubmit: SubmitHandler<IDeliveryRequest> = async (data) => {
    try {
      const updatedData: Partial<IDeliveryRequest> = {
        customerFirstName: data.customerFirstName,
        customerLastName: data.customerLastName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        deliveredAt: data.deliveredAt,
        province: data.province,
        country: data.country,
        city: data.city,
        address: data.address,
        postalCode: data.postalCode,
        estimatedDate: data.estimatedDate,
        deliveryStatus: data.deliveryStatus,
      };

      if (delivery && delivery.id) {
        updateDeliveryMutation.mutate(
          { id: delivery.id, data: updatedData },
          {
            onSuccess() {
              toast.success("Delivery updated successfully");
              setIsOpen(false);
              queryClient.invalidateQueries(DELIVERY);
              reset();
            },
            onError(error) {
              toast.error("Failed to update Delivery");
            },
          }
        );
      }
    } catch (error) {
      toast.error("Error processing Delivery");
    }
  };

  const deliveryStatusData = [
    "PENDING",
    "DISPATCHED",
    "IN_TRANSIT",
    "DELIVERED",
    "RETURNED",
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 flex-col">
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Customer First Name"
            type="text"
            error={errors.customerFirstName?.message}
            register={register("customerFirstName")}
            disabled={true}
          />
          <TextField
            label="Customer Last Name"
            type="text"
            error={errors.customerLastName?.message}
            register={register("customerLastName")}
            disabled={true}
          />
          <TextField
            label="Customer Email"
            type="text"
            error={errors.customerEmail?.message}
            register={register("customerEmail")}
            disabled={true}
          />
          <TextField
            label="Customer Phone number"
            type="text"
            error={errors.customerPhone?.message}
            register={register("customerPhone")}
            disabled={true}
          />
          <TextField
            label="Country"
            type="text"
            error={errors.country?.message}
            register={register("country")}
            disabled={true}
          />
          <TextField
            label="Province"
            type="text"
            error={errors.province?.message}
            register={register("province")}
            disabled={true}
          />
          <TextField
            label="City"
            type="text"
            error={errors.city?.message}
            register={register("city")}
            disabled={true}
          />
          <TextField
            label="Address"
            type="text"
            error={errors.address?.message}
            register={register("address")}
            disabled={true}
          />
         <TextField
            label="PostalCode"
            type="text"
            error={errors.postalCode?.message}
            register={register("postalCode")}
            disabled={true}
          />
          <OptionsField
            label="Delivery Status"
            register={register("deliveryStatus")}
            error={errors.deliveryStatus?.message}
            required={true}
            defaultLabel="Select Delivery Status"
            options={deliveryStatusData.map((type) => ({
              value: type,
              label: type.replace("_", " "),
            }))}
          />
          <TextField
            label="Estimated Date"
            type="date"
            error={errors.estimatedDate?.message}
            register={register("estimatedDate")}
            disabled={true}
          />
          <TextField
            label="Delivered At"
            type="date"
            error={errors.deliveredAt?.message}
            register={register("deliveredAt")}
          />
        </div>
        <div className="py-4 mx-auto flex items-center justify-end md:justify-start md:flex-start space-x-2">
          <Button
            isLoading={
                delivery && delivery.id && updateDeliveryMutation.isLoading
            }
            label={"Update Delivery"}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default DeliveryForm;