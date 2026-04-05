import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import Modal from "../common/Modal";
import ConfirmDelete from "../common/ConfirmDelete";
import { IOrder } from "@/types/common";
import { deleteOrder } from "@/apis/order";
import { ORDER } from "@/utils/constants/queryKeys";
// import OrderForm from "./OrderForm";
import OrderDetails from "./OrderDetails";

interface IOrderTableActionsProps {
  order: IOrder;
}

const OrderTableActions: FC<IOrderTableActionsProps> = ({
  order,
}) => {
  const { id } = order;
  const [toUpdate, setToUpdate] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [toDelete, setToDelete] = useState<string | undefined>();
  const [toView, setToView] = useState("");

  const update = (id: string) => {
    setToUpdate(id);
  };

  const view = (id: string) => {
    setToView(id);
  };
  return (
    <>
      {isOpen && (
        <div id={id} className='w-full'>
                      <div
              className='flex gap-2 py-1 px-2 hover:bg-gray-100 cursor-pointer'
              onClick={() => view(id)}
            >
              <EyeIcon className='w-4 text-green' /> View
            </div>
            {toView != "" && (
            <Modal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title={`Details for order with order number #${order.orderNumber}`}
            >
              <OrderDetails order={order} setIsOpen={setIsOpen} />
            </Modal>
          )}
          {/* <div
            className='flex gap-2 py-1 px-2 hover:bg-gray-100 cursor-pointer'
            onClick={() => update(id)}
          >
            <PencilIcon className='w-4 text-green' /> Edit
          </div>
          {toUpdate != "" && (
            <Modal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title={`Update order with order number ${order.orderNumber}`}
            >
              <OrderForm order={order} setIsOpen={setIsOpen} />
            </Modal>
           )} */}
            {toDelete && (  <ConfirmDelete
              type='order'
              id={toDelete}
              fn={async (id: string) => {
                await deleteOrder(id);
                return 1;
              }}
              queryKey={ORDER}
              setToDelete={setToDelete}
            /> )}
            <div
              className='flex gap-2 py-1 px-2 hover:bg-gray-100 cursor-pointer'
              onClick={() => setToDelete(id)}
            >
              <TrashIcon className='w-4 text-red' /> Delete
            </div>
        </div>
      )}
    </>
  );
};

export default OrderTableActions;
