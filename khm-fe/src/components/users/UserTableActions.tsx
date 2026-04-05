import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { IUser } from "../../types/common";
import Modal from "../common/Modal";
import UserForm from "./UserForm";
import ConfirmDelete from "../common/ConfirmDelete";
import { ALL_USERS } from "../../utils/constants/queryKeys";
import { deleteUser } from "@/apis/users";
import UserDetails from "./UserDetails";

interface IUserTableActionsProps {
  user: IUser;
}

const UserTableActions: FC<IUserTableActionsProps> = ({
  user,
}) => {
  const { id } = user;
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
              title={`Details for ${user.firstName} ${user.lastName}`}
            >
              <UserDetails user={user} setIsOpen={setIsOpen} />
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
              title={`Update ${user.firstName} ${user.lastName}`}
            >
              <UserForm user={user} setIsOpen={setIsOpen} />
            </Modal>
           )}
            {toDelete && (  <ConfirmDelete
              type='user'
              id={toDelete}
              fn={async (id: string) => {
                await deleteUser(id);
                return 1;
              }}
              queryKey={ALL_USERS}
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

export default UserTableActions;
