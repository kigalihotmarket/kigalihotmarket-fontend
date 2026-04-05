
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, SetStateAction, Dispatch, FC, useEffect, useCallback } from "react";
import Button from "../../components/common/form/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IPaged, IProduct,  } from "../../types/common";
import Table from "../../components/table/Table";
import PageContent from "@/components/common/PageContent";
import Modal from "../../components/common/Modal";
import { PRODUCT } from "@/utils/constants/queryKeys";
import { format } from "date-fns";
import TableActions from "@/components/table/TableActions";
import { debounce } from "lodash";
import { getAllProducts } from "@/apis/product";
import ProductTableActions from "@/components/product/ProductTableActions";
import ProductForm from "@/components/product/ProductForm";
import { formatNumberWithCommas } from "@/utils/formats/formats";
interface IActionComponent {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ActionsComponent: FC<IActionComponent> = ({ setIsOpen }) => {
  const openCreateProductModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      <Button onClick={openCreateProductModal} label='Add product' />
    </>
  );
};

const ProductList = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: PRODUCT,
    queryFn: () => getAllProducts(""),
  }); 
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<IPaged<IProduct[]>>();
  const [keyword, setKeyword] = useState<string>();


  const productMutation = useMutation(getAllProducts);


  const handleSearch = useCallback(
    debounce((searchq: string) => {
      setKeyword(searchq);
      productMutation.mutate(`?searchq=${searchq}&page=1`, {
        onSuccess(result) {
          setData(result);
        },
      });
    }, 10),
    [],
  );
  const onChangePage = (page: number) => {
    productMutation.mutate(
      `?page=${page}${keyword ? `&searchq=${keyword}` : ``}`,
      {
        onSuccess(result) {
          setData(result);
        },
      },
    );
  };

  useEffect(() => {
    if (response) {
      setData(response);
    }
  }, [response]);

  return (
    <PageContent
      isLoading={isLoading}
      hasPadding={true}
      title='Products'
      actionsComponent={<ActionsComponent setIsOpen={setIsOpen} />}
    >
        <>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title='Create product'
        >
          <ProductForm setIsOpen={setIsOpen} />
        </Modal>
        <Table
          isLoading={isLoading}
          currentPage={data?.currentPage || 1}
          totalItems={data?.totalItems || 30}
          itemsPerPage={data?.itemsPerPage || 15}
          onChangePage={onChangePage}
          columns={[
            {
              title: "Product Name",
              key: "name",
            },
            {
              title: "Model",
              key: "model",
            },
            {
              title: "Category",
              key: "category",
            },

            {
              title: "Brand",
              key: "brand",
            },
            {
              title: "Price",
              key: "price",
              render: (row : IProduct) => (
                <> {formatNumberWithCommas(row.price)}</>
              )
            },
            {
              title: "Stock Quantity",
              key: "stockQuantity",
            },
            
            {
              title: "Date",
              key: "createdAt",
              render: (row: IProduct) => (
                <>{format(new Date(row.createdAt), "dd-MM-yyyy")}</>
              ),
            },
            {
              title: "Actions",
              key: "actions",
              render: (row: IProduct) => {
                return (
                  <TableActions>
                    <ProductTableActions product={row} />
                  </TableActions>
                );
              },
            },
          ]}
          data={data?.data || []}
          searchFun={handleSearch}
        />
          </>
    </PageContent>
  );
};

export default ProductList;
