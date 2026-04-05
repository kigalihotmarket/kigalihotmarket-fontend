import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "./../styles/auth.scss";
import { ILoginFormData } from "../types/auth";
import { LoginSchema } from "../utils/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import Button from "../components/common/form/Button";
import TextField from "../components/common/form/FileField";
import PasswordField from "../components/common/form/PasswordField";
import { login } from "../apis/auth";

const Login = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ILoginFormData>({
    resolver: zodResolver(LoginSchema),
  });
  const loginMutation = useMutation(login);

  const submitLoginData = async (data: ILoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess(response) {
        const { token, roles = [], ...authState } = response;
        signIn({
          token: token,
          expiresIn: 3600,
          authState: { ...authState, roles },
          tokenType: "JWT",
        });


        if (roles.includes("ADMIN")) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      },
    });
  };
  return (
    <>
      <div className='flex flex-col w-full gap-5  justify-center'>
        <div>
          <h2 className='my-6 text-2xl font-bold text-center tracking-tight text-gray-900'>
            Sign In
          </h2>
          <p className='mt-2 text-sm text-center text-gray-400 max-w'>
            Enter your email address and password below to authenticate
          </p>
        </div>
        <div className='mt-6'>
          <form onSubmit={handleSubmit(submitLoginData)} className='space-y-6'>
            <div>
              <TextField
                error={errors.email?.message}
                type='email'
                label='Email'
                onValueChage={(value: string) => setValue("email", value)}
                register={register("email")}
              />
            </div>

            <div className='space-y-1'>
              <PasswordField
                label='Password'
                error={errors.password?.message}
                {...register("password", {
                  onChange: (e) => {
                    setValue("password", e.target.value);
                  },
                })}
              />
            </div>

            <div className='flex items-center justify-between'>
              <div className='text-sm'>
                <Link
                  to='/forgot-password'
                  className='font-medium text-gray-600 hover:text-gray-500'
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button
                label='Sign In'
                isLoading={loginMutation.isLoading}
                className='hover:bg-darkblue  focus:ring-darkblue bg-darkblue w-full'
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
