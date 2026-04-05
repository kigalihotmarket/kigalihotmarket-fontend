import { IDelivery } from "@/types/common";
import { format } from "date-fns";
import { Dispatch, FC, SetStateAction } from "react";

interface IDeliveryForm {
  delivery?: IDelivery;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isView?: boolean;
}

const DeliveryDetails: FC<IDeliveryForm> = ({ delivery }) => {

  return (
    <form  className='p-1 bg-white'>
      <div className='w-full bg-white p-8 rounded-md'>
        <div className='grid gap-3'>
          <div className={`grid gap-4`}>
            <div className={``}>
              <div className='grid gap-3'>
                <div className='py-2'>
                  <div className='font-bold'>Info </div>
                </div>
                <List
                  label='Customer Names'
                  value={delivery ? `${delivery.customerFirstName} ${delivery.customerLastName}` : "N/A"}
                />
                <List
                  label='Customer Email'
                  value={delivery?.customerEmail ?? "N/A"}
                />
                 <List
                  label='Customer Phone'
                  value={delivery?.customerPhone ?? "N/A"}
                />
                 <List
                  label='Country'
                  value={delivery?.country ?? "N/A"}
                />
                <List
                label='Province'
                value={delivery?.province ?? "N/A"}
              />
                 <List
                  label='City'
                  value={delivery?.city ?? "N/A"}
                />
                 <List
                  label='Customer Address'
                  value={delivery?.address ?? "N/A"}
                />
                 
                 <List
                  label='Postal Code'
                  value={delivery?.postalCode ?? "N/A"}
                />
                 <List
                  label='Delivery Status'
                  value={delivery?.deliveryStatus ?? "N/A"}
                />
                 <List
                  label='Estimated Date'
                  value={delivery?.estimatedDate ? format(new Date(delivery.estimatedDate), "dd-MM-yyyy") : "N/A"}
                />
                 <List
                  label='Delivered At'
                  value={delivery?.deliveredAt ? format(new Date(delivery.deliveredAt), "dd-MM-yyyy") : "N/A"}
                />
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const List = ({ label, value }: { label: string; value: string| number | boolean | null }) => {
  return (
    <div className='grid sm:grid-cols-2 gap-2'>
      <div className='text-gray-500'>{label}</div>
      <div className='text-gray-900'>
        {label === 'Photo' && value ? (
          <img src={String(value)} alt={`${label}`} className='w-16 h-16 rounded-full' />
        ) : (
          value
        )}
      </div>
    </div>
  );
};

export default DeliveryDetails;
