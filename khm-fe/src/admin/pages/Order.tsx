/* eslint-disable react-hooks/exhaustive-deps */
import { useState, SetStateAction, Dispatch, FC, useEffect, useCallback } from "react";
import Button from "../../components/common/form/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllOrders } from "@/apis/order";
import { IOrder, IPaged } from "@/types/common";
import { debounce } from "lodash";
import PageContent from "@/components/common/PageContent";
import Modal from "@/components/common/Modal";
import Table from "@/components/table/Table";
import { format } from "date-fns";
import TableActions from "@/components/table/TableActions";
// import OrderForm from "@/components/order/OrderForm";
import OrderTableActions from "@/components/order/OrderTableActions";
import { ORDER } from "@/utils/constants/queryKeys";


// interface IActionComponent {
//   setIsOpen: Dispatch<SetStateAction<boolean>>;
// }

// const ActionsComponent: FC<IActionComponent> = ({ setIsOpen }) => {
//   const openCreateOrderModal = () => {
//     setIsOpen(true);
//   };
//   return (
//     <>
//       <Button onClick={openCreateOrderModal} label='Create order' />
//     </>
//   );
// };

const OrderList = () => {
    const { data: response, isLoading } = useQuery({
      queryKey: ORDER,
      queryFn: () => getAllOrders(""),
    }); 
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<IPaged<IOrder[]>>();
    const [keyword, setKeyword] = useState<string>();
  
  
    const orderMutation = useMutation(getAllOrders);
      const handleSearch = useCallback(
        debounce((searchq: string) => {
          setKeyword(searchq);
          orderMutation.mutate(`?searchq=${searchq}&page=1`, {
            onSuccess(result) {
              setData(result);
            },
          });
        }, 10),
        [],
      );
      const onChangePage = (page: number) => {
        orderMutation.mutate(
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
    title='Orders'
    // actionsComponent={<ActionsComponent setIsOpen={setIsOpen} />}
  >
      <>
      {/* <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title='Create order'
      >
        <OrderForm setIsOpen={setIsOpen} />
      </Modal> */}
      <Table
        isLoading={isLoading}
        currentPage={data?.currentPage || 1}
        totalItems={data?.totalItems || 30}
        itemsPerPage={data?.itemsPerPage || 15}
        onChangePage={onChangePage}
        columns={[
          {
            title: "Order number",
            key: "orderNumber",
          },
          {
            title: "Total Amount",
            key: "totalAmount",
          },

          {
            title: "Status",
            key: "status",
          },
          {
            title: "Delivery Fee",
            key: "deliveryFee",
            render: (row: IOrder) => (
              <>{row.deliveryFee || 0}</>
            ),
          },

          {
            title: "Delivery Status",
            key: "",
            render: (row: IOrder) => (
                <>{row.delivery?.deliveryStatus || "PENDING"}</>
            ),
          },

          {
            title: "Payment Status",
            key: "",
            render: (row: IOrder) => (
              <>{row.payment?.status || "PENDING"}</>
            ),
          },
          
          {
            title: "Date",
            key: "",
            render: (row: IOrder) => (
              <>{format(new Date(row.createdAt), "dd-MM-yyyy")}</>
            ),
          },
          {
            title: "Actions",
            key: "actions",
            render: (row: IOrder) => {
              return (
                <TableActions>
                  <OrderTableActions order={row} />
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

export default OrderList;
