/* eslint-disable react-hooks/exhaustive-deps */
import { getAllDelivery } from "@/apis/delivery";
import { IDelivery, IPaged } from "@/types/common";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  useState,
  useEffect,
  useCallback,
} from "react";
import { debounce } from "lodash";
import PageContent from "@/components/common/PageContent";
import TableActions from "@/components/table/TableActions";
import Table from "@/components/table/Table";
import DeliveryTableActions from "@/components/delivery/DeliveryTableActions";
import { format } from "date-fns";
import { DELIVERY } from "@/utils/constants/queryKeys";

const DeliveryList = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: DELIVERY,
    queryFn: () => getAllDelivery(""),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<IPaged<IDelivery[]>>();
  const [keyword, setKeyword] = useState<string>();

  const deliveryMutation = useMutation(getAllDelivery);
  const handleSearch = useCallback(
    debounce((searchq: string) => {
      setKeyword(searchq);
      deliveryMutation.mutate(`?searchq=${searchq}&page=1`, {
        onSuccess(result) {
          setData(result);
        },
      });
    }, 10),
    [],
  );
  const onChangePage = (page: number) => {
    deliveryMutation.mutate(`?page=${page}${keyword ? `&searchq=${keyword}` : ``}`, {
      onSuccess(result) {
        setData(result);
      },
    });
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
      title='Deliveries'
    >
      <>
        <Table
          isLoading={isLoading}
          currentPage={data?.currentPage || 1}
          totalItems={data?.totalItems || 30}
          itemsPerPage={data?.itemsPerPage || 15}
          onChangePage={onChangePage}
          columns={[
            {
              title: "Names",
              key: "",
              render: (row: IDelivery) => (
                <>
                  {row.customerFirstName && row.customerLastName
                    ? `${row.customerFirstName} ${row.customerLastName}`
                    : "N/A"}
                </>
              ),
            },
            {
              title: "Email",
              key: "customerEmail",
            },
            {
              title: "Phone number",
              key: "customerPhone",
            },

            {
              title: "Province",
              key: "province",
            },
            {
              title: "City",
              key: "city",
            },
            {
              title: "Payment status",
              key: "",
              render: (row: IDelivery) => (
                <>
                  {row.order?.payment?.status || "N/A"}
                </>
              ),
            },
            {
              title: "Delivery Status",
              key: "deliveryStatus",
            },

            {
              title: "estimated Date",
              key: "",
              render: (row: IDelivery) => (
                <>{format(new Date(row.estimatedDate), "dd-MM-yyyy")}</>
              ),
            },

            {
              title: "delivered At",
              key: "",
              render: (row: IDelivery) => (
                <>{row.deliveredAt ? format(new Date(row.deliveredAt), "dd-MM-yyyy") : "N/A" }</>
              ),
            },

            {
              title: "Actions",
              key: "actions",
              render: (row: IDelivery) => {
                return (
                  <TableActions>
                    <DeliveryTableActions delivery={row} />
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

export default DeliveryList;
