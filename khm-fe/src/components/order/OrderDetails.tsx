import { IOrder } from "@/types/common";
import { formatNumberWithCommas } from "@/utils/formats/formats";
import { Dispatch, FC, SetStateAction } from "react";

interface IOrderForm {
  order?: IOrder;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isView?: boolean;
}

const OrderDetails: FC<IOrderForm> = ({ order }) => {

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
                  label='Order Number'
                  value={order?.orderNumber ?? "N/A"}
                />
                <List
                  label='Status'
                  value={order?.status ?? "N/A"}
                />
                <List
                  label='Total Amount'
                  value={order?.totalAmount ? `${order.totalAmount} RWF` : "N/A"}
                />
                <List
                  label='Sub Total'
                  value={order?.subTotal ? `${order.subTotal} RWF` : "N/A"}
                />
                <List
                  label='Delivery Fee'
                  value={order?.deliveryFee ? `${order.deliveryFee} RWF` : "N/A"}
                />
                <List
                  label='Created At'
                  value={order?.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}
                />
                <List
                  label='Updated At'
                  value={order?.updatedAt ? new Date(order.updatedAt).toLocaleString() : "N/A"}
                />
                <div className='font-bold mt-4'>Order Items</div>
                {order?.orderItems?.map((item, index) => (
                  <div key={index} className='border p-2 rounded-md'>
                    <List label='Product Name' value={item.product.name ?? "N/A"} />
                    <List label='Quantity' value={item.quantity ?? "N/A"} />
                    <List label='Unit Price' value={item.unitPrice ? `${formatNumberWithCommas(item.unitPrice)} RWF` : "N/A"} />
                    <List label='Discount' value={item.discount ?? "N/A"} />
                  </div>
                ))}
                <div className='font-bold mt-4'>Payment Details</div>
                <List
                  label='Payment Method'
                  value={order?.payment?.method ?? "N/A"}
                />
                <List
                  label='Payment Status'
                  value={order?.payment?.status ?? "N/A"}
                />
                <List
                  label='Paid At'
                  value={order?.payment?.paidAt ? new Date(order.payment.paidAt).toLocaleString() : "N/A"}
                />
                <List
                  label='Account Number'
                  value={order?.payment?.accountNumber ?? "N/A"}
                />
                <List
                  label='Account Provider'
                  value={order?.payment?.accountProvider ?? "N/A"}
                />
                <List
                  label='Amount'
                  value={order?.payment?.amount ? `${order.payment.amount} RWF` : "N/A"}
                />
                <div className='font-bold mt-4'>Delivery Details</div>
                <List
                  label='Customer Name'
                  value={
                    order?.delivery
                      ? `${order.delivery.customerFirstName} ${order.delivery.customerLastName}`
                      : "N/A"
                  }
                />
                <List
                  label='Customer Email'
                  value={order?.delivery?.customerEmail ?? "N/A"}
                />
                <List
                  label='Customer Phone'
                  value={order?.delivery?.customerPhone ?? "N/A"}
                />
                <List
                  label='Address'
                  value={order?.delivery?.address ?? "N/A"}
                />
                <List
                  label='City'
                  value={order?.delivery?.city ?? "N/A"}
                />
                <List
                  label='Province'
                  value={order?.delivery?.province ?? "N/A"}
                />
                <List
                  label='Country'
                  value={order?.delivery?.country ?? "N/A"}
                />
                <List
                  label='Postal Code'
                  value={order?.delivery?.postalCode ?? "N/A"}
                />
                <List
                  label='Delivery Status'
                  value={order?.delivery?.deliveryStatus ?? "N/A"}
                />
                <List
                  label='Estimated Date'
                  value={
                    order?.delivery?.estimatedDate
                      ? new Date(order.delivery.estimatedDate).toLocaleString()
                      : "N/A"
                  }
                />
                <List
                  label='Delivered At'
                  value={
                    order?.delivery?.deliveredAt
                      ? new Date(order.delivery.deliveredAt).toLocaleString()
                      : "N/A"
                  }
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

export default OrderDetails;
