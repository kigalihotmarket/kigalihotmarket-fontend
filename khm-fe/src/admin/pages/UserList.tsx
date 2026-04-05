/* eslint-disable react-hooks/exhaustive-deps */
import { useState, SetStateAction, Dispatch, FC, useEffect, useCallback } from "react";
import Button from "../../components/common/form/Button";
import { getAllUsers } from "../../apis/users";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IPaged, IUser } from "../../types/common";
import Table from "../../components/table/Table";
import PageContent from "@/components/common/PageContent";
import Modal from "../../components/common/Modal";
import UserForm from "@/components/users/UserForm";
import { ALL_USERS } from "@/utils/constants/queryKeys";
import { format } from "date-fns";
import TableActions from "@/components/table/TableActions";
import UserTableActions from "@/components/users/UserTableActions";
import { debounce } from "lodash";
interface IActionComponent {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ActionsComponent: FC<IActionComponent> = ({ setIsOpen }) => {
  const openCreateUserModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      <Button onClick={openCreateUserModal} label='Add user' />
    </>
  );
};

const UserList = () => {
	const { data: response, isLoading } = useQuery({
		queryKey: ALL_USERS,
		queryFn: () => getAllUsers(""),
	}); 
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<IPaged<IUser[]>>();
  const [keyword, setKeyword] = useState<string>();


  const usersMutation = useMutation(getAllUsers);


  const handleSearch = useCallback(
    debounce((searchq: string) => {
      setKeyword(searchq);
      usersMutation.mutate(`?searchq=${searchq}&page=1`, {
        onSuccess(result) {
          setData(result);
        },
      });
    }, 10),
    [],
  );
  const onChangePage = (page: number) => {
    usersMutation.mutate(
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
      title='Users'
      actionsComponent={<ActionsComponent setIsOpen={setIsOpen} />}
    >
        <>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title='Create user'
        >
          <UserForm setIsOpen={setIsOpen} />
        </Modal>
        <Table
          isLoading={isLoading}
          currentPage={data?.currentPage || 1}
          totalItems={data?.totalItems || 30}
          itemsPerPage={data?.itemsPerPage || 15}
          onChangePage={onChangePage}
          columns={[
            {
              title: "First name",
              key: "firstName",
            },
            {
              title: "Last name",
              key: "lastName",
            },
            {
              title: "Email",
              key: "email",
            },

            {
              title: "Phone",
              key: "phoneNumber",
            },
            {
              title: "Role",
              key: "role",
              render: (row: IUser) => (
                <>{row.roles[0].role}</>
              ),
            },
            
            {
              title: "Date",
              key: "",
              render: (row: IUser) => (
                <>{format(new Date(row.createdAt), "dd-MM-yyyy")}</>
              ),
            },
            {
              title: "Actions",
              key: "actions",
              render: (row: IUser) => {
                return (
                  <TableActions>
                    <UserTableActions user={row} />
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

export default UserList;
