import { getAllPayments } from "@/apis/payment";
import { IPaged, IPayment } from "@/types/common";
import { TRANSACTIONS } from "@/utils/constants/queryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { debounce } from "lodash";
import PageContent from "@/components/common/PageContent";
import Button from "@/components/common/form/Button";
import Table from "@/components/table/Table";
import { format } from "date-fns";

interface IActionComponent {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ActionsComponent: FC<IActionComponent> = ({ setIsOpen }) => {
  const openCreateTransactionModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      <Button onClick={openCreateTransactionModal} label='Add Payment' />
    </>
  );
};

const TransactionList = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: TRANSACTIONS,
    queryFn: () => getAllPayments(""),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<IPaged<IPayment[]>>();
  const [keyword, setKeyword] = useState<string>();

  const paymentMutation = useMutation(getAllPayments);
  const handleSearch = useCallback(
    debounce((searchq: string) => {
      setKeyword(searchq);
      paymentMutation.mutate(`?searchq=${searchq}&&page=1`, {
        onSuccess(result) {
          setData(result);
        },
      });
    }, 10),
    [],
  );

  const onChangePage = (page: number) => {
    paymentMutation.mutate(`?page=${page}${keyword ? `&searchq=${keyword}` : ``}`, {
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
      title='Transactions'
    //   actionsComponent={<ActionsComponent setIsOpen={setIsOpen} />}
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
              title: "Account Number",
              key: "accountNumber",
            },
            {
              title: "Amount",
              key: "amount",
            },
            {
              title: "Provider",
              key: "accountProvider",
              render: (row: IPayment) => <>{row.accountProvider.toUpperCase()}</>,
            },
            {
              title: "Method",
              key: "method",
            },
            {
              title: "Status",
              key: "status",
            },
            {
              title: "Date",
              key: "paidAt",
              render: (row: IPayment) => (
                <>{format(new Date(row.paidAt), "dd-MM-yyyy")}</>
              ),
            },
          ]}
          data={data?.data || []}
          searchFun={handleSearch}
        />
      </>
    </PageContent>
  );
};

export default TransactionList;
