import { FC } from "react";
import { ProfileAvatarProps } from "../../types/users";
import { UserIcon } from "@heroicons/react/24/outline";

const ProfileAvatar: FC<ProfileAvatarProps> = ({
  color = "#cdbd8e",
  rounded = false,
}) => {
  const sizeClass = "w-7";

  return (
    <>
      <UserIcon className={`${sizeClass} ${color} ${rounded}`} />
    </>
  );
};

export default ProfileAvatar;
