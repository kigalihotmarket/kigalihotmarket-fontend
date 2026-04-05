import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { IProduct } from "../../types/common";
import Modal from "../common/Modal";
import ConfirmDelete from "../common/ConfirmDelete";
import ProductDetails from "./ProductDetails";
import { PRODUCT } from "@/utils/constants/queryKeys";
import { deleteProduct } from "@/apis/product";
import ProductForm from "./ProductForm";

interface IProductTableActionsProps {
  product: IProduct;
}

const ProductTableActions: FC<IProductTableActionsProps> = ({
  product,
}) => {
  const { id } = product;
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
              title={`Details for ${product.name}`}
            >
              <ProductDetails product={product} setIsOpen={setIsOpen} />
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
              title={`Update ${product.name}`}
            >
              <ProductForm product={product} setIsOpen={setIsOpen} />
            </Modal>
           )}
            {toDelete && (  <ConfirmDelete
              type='product'
              id={toDelete}
              fn={async (id: string) => {
                await deleteProduct(id);
                return 1;
              }}
              queryKey={PRODUCT}
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

export default ProductTableActions;
