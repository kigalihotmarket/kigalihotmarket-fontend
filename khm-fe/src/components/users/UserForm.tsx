import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IUser, IUserRequest } from "@/types/common";
import { ALL_USERS } from "@/utils/constants/queryKeys";
import OptionsField from "../common/form/OptionsField";
import TextField from "../common/form/TextField";
import Button from "../common/form/Button";
import { createUser, updateUser } from "@/apis/users";
import { userSchema } from "@/utils/schemas/users.schema";
import { FormControl, FormField, FormLabel, FormMessage } from "../ui/form";
import { Controller, type SubmitHandler, useForm, FormProvider } from "react-hook-form";
import type z from "zod";

interface IUserForm {
  user?: IUser;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isView?: boolean;
}

const UserForm: FC<IUserForm> = ({ user, setIsOpen }) => {
  const queryClient = useQueryClient();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const methods = useForm<IUserRequest>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      password: user?.password || "",
      role: user?.role || "",
      photo: user?.photo || "",
    },
  });

  const { register, handleSubmit, reset, formState: { errors }, control } = methods;

  useEffect(() => {
    return () => {
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [photoUrl]);

  const createUserMutation = useMutation((data: FormData) => createUser(data));
  const updateUserMutation = useMutation(({ id, data }: { id: string; data: FormData }) => updateUser(id, data));

  const onSubmit: SubmitHandler<IUserRequest> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("role", data.role);

      if (data.password) {
        formData.append("password", data.password);
      }

      const fileInput = document.getElementById("photo-upload") as HTMLInputElement;
      if (fileInput?.files?.[0]) {
        formData.append("photo", fileInput.files[0]);
      } else if (user?.photo) {
        formData.append("photo", user.photo);
      }

      if (user && user.id) {
        updateUserMutation.mutate(
          { id: user.id, data: formData },
          {
            onSuccess() {
              toast.success("User updated successfully");
              setIsOpen(false);
              queryClient.invalidateQueries(ALL_USERS);
              reset();
            },
            onError(error) {
              toast.error("Failed to update user");
            },
          }
        );
      } else {
        createUserMutation.mutate(formData, {
          onSuccess() {
            toast.success("User created successfully");
            setIsOpen(false);
            queryClient.invalidateQueries(ALL_USERS);
            reset();
          },
          onError(error) {
            toast.error("Failed to create user");
          },
        });
      }
    } catch (error) {
      toast.error("Error processing user");
    }
  };

  const rolesData = ["AGENT", "CLIENT", "ADMIN"];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 flex-col">
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="First Name"
            type="text"
            error={errors.firstName?.message}
            register={register("firstName")}
          />
          <TextField
            label="Last Name"
            type="text"
            error={errors.lastName?.message}
            register={register("lastName")}
          />
          <TextField
            label="Email"
            type="text"
            error={errors.email?.message}
            register={register("email")}
          />
          <TextField
            label="Phone number"
            type="text"
            error={errors.phoneNumber?.message}
            register={register("phoneNumber")}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <OptionsField
            label="Role"
            register={register("role")}
            error={errors.role?.message}
            required={true}
            defaultLabel="Select Role"
            options={rolesData.map((type) => ({
              value: type,
              label: type.replace("_", " "),
            }))}
          />
          {!user?.id && (
            <TextField
              label="Password"
              type="text"
              error={errors.password?.message}
              register={register("password")}
            />
          )}
        </div>
        <div className="block">
          <FormField
            control={control}
            name="photo"
            render={({ field }) => {
              const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length > 0) {
                  if (photoUrl) {
                    URL.revokeObjectURL(photoUrl);
                  }

                  const file = e.target.files[0];
                  field.onChange(e.target.files);

                  try {
                    setPhotoUrl(URL.createObjectURL(file));
                  } catch (error) {
                    console.error("Error creating object URL:", error);
                    setPhotoUrl(null);
                  }
                }
              };

              const previewUrl = photoUrl || user?.photo;

              return (
                <div>
                  <FormLabel className="text-gray-500 text-xs">Upload Thumbnail</FormLabel>
                  <FormControl>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="photo-upload"
                    />
                  </FormControl>
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center w-32 h-32">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Photo preview"
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <span className="text-gray-500 text-sm">Click to upload</span>
                      )}
                    </div>
                  </label>
                  <FormMessage />
                </div>
              );
            }}
          />
        </div>
        <div className="py-4 mx-auto flex items-center justify-end md:justify-start md:flex-start space-x-2">
          <Button
            isLoading={
              user && user.id
                ? updateUserMutation.isLoading
                : createUserMutation.isLoading
            }
            label={user && user.id ? "Update User" : "Create User"}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default UserForm;