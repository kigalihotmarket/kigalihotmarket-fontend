import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import Modal from "../common/Modal";
import ConfirmDelete from "../common/ConfirmDelete";
import { IDelivery } from "@/types/common";
import DeliveryDetails from "./DeliveryDetails";
import { deleteDelivery } from "@/apis/delivery";
import { DELIVERY } from "@/utils/constants/queryKeys";
import DeliveryForm from "./DeliveryForm";

interface IDeliveryTableActionsProps {
  delivery: IDelivery;
}

const DeliveryTableActions: FC<IDeliveryTableActionsProps> = ({
  delivery,
}) => {
  const { id } = delivery;
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
              title={`Details for delivery ${delivery.customerFirstName} ${delivery.customerLastName}`}
            >
              <DeliveryDetails delivery={delivery} setIsOpen={setIsOpen} />
            </Modal>
          )}
          <div
            className='flex gap-2 py-1 px-2 hover:bg-gray-100 cursor-pointer'
            onClick={() => update(id)}
          >
            <PencilIcon className='w-4 text-green' /> Edit
          </div>
          {toUpdate != "" && (
            <Modal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title={`Update delivery of ${delivery.customerFirstName} ${delivery.customerLastName}`}
            >
              <DeliveryForm delivery={delivery} setIsOpen={setIsOpen} />
            </Modal>
           )}
            {toDelete && (  <ConfirmDelete
              type='delivery'
              id={toDelete}
              fn={async (id: string) => {
                await deleteDelivery(id);
                return 1;
              }}
              queryKey={DELIVERY}
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

export default DeliveryTableActions;
