
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMutation } from "@tanstack/react-query";
import { ILoginFormData } from '@/types/auth';
import { LoginSchema } from '@/utils/schemas/auth.schema';
import { login } from '@/apis/auth';
import PasswordField from "@/components/common/form/PasswordField";
import Button from "@/components/common/form/Button";
import TextField from "@/components/common/form/TextField";

const LoginPage = () => {
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

        localStorage.setItem("accessToken", token);
        if (roles.includes("ADMIN")) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-bold text-gray-900 mb-2">Kigali Hot Market</h1>
        <h2 className="text-center text-xl font-semibold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
            <form onSubmit={handleSubmit(submitLoginData)} className='space-y-6'>
            <div>
                  <TextField
                error={errors.email?.message}
                type='email'
                label='Email address'
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
                className='hover:bg-primary  focus:ring-primary bg-primary w-full'
              />
            </div>
              </form>
            </TabsContent>

            {/* Register Form */}
            <TabsContent value="register">
              {/* <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <div className="mt-1">
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reg-email">Email address</Label>
                  <div className="mt-1">
                    <Input
                      id="reg-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reg-password">Password</Label>
                  <div className="mt-1">
                    <Input
                      id="reg-password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating account...' : 'Create account'}
                  </Button>
                </div>
              </form> */}
            </TabsContent>
          </Tabs>

          {/* Forgot Password Form (Hidden) */}
          {/* <div className="mt-8 border-t pt-6 hidden">
            <h3 id="forgot-password" className="text-lg font-medium">Reset your password</h3>
            <form onSubmit={handleResetPassword} className="mt-4 space-y-6">
              <div>
                <Label htmlFor="forgot-email">Email address</Label>
                <div className="mt-1">
                  <Input
                    id="forgot-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send reset link'}
                </Button>
              </div>
            </form>
          </div> */}
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="text-sm text-primary hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
