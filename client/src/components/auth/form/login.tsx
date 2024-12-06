import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/schema/auth.schema";
import { Form } from "@/components/ui/form";
import gaiLogo from "/gai.jpg";
import { ArrowRight, Loader } from "lucide-react";
import { FormFieldType } from "@/constant";
import CustomForm from "@/components/common/FormField";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getCurrentAdmin, loginAdmin } from "@/store/auth/auth.slice";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    dispatch(loginAdmin(data)).then((res) => {
      if (res.payload && res.payload.email && res.payload.email === data.identifier) {
        toast({
          title: "Login successfully",
        });
        dispatch(getCurrentAdmin()).then((data) => {
          if (data.payload.email === res.payload.email) {
            navigate("/admin");
          }
        });
      }
      if (res.payload && res.payload.statusCode >= 400) {
        toast({
          title: "Login Failed",
          description: res.payload.message.split(":")[1],
          variant: "destructive",
        });
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
      <Form {...form}>
        <div className="flex flex-col items-center space-y-2 text-center gap-3 mb-8">
          <div className="h-28 w-28 text-primary text-green-500">
            <img className="w-full" src={gaiLogo} alt="" />
          </div>
          <h1 className="text-2xl font-bold ">Login Account</h1>
          <p className="flex items-center gap-2 text-sky-500">
            Login with email and password to go dashboard
            <ArrowRight className="w-4 h-4 " />
          </p>
        </div>

        <CustomForm<LoginSchemaType>
          name="identifier"
          control={form.control}
          inputType={FormFieldType.INPUT}
          label="Email"
          placeholder="gai@example.com"
        />
        <CustomForm<LoginSchemaType>
          name="password"
          control={form.control}
          inputType={FormFieldType.PASSWORD}
          label="Password"
        />
        <Button className="w-full">
          {isLoading ? (
            <span className="flex gap-3 items-center">
              {" "}
              <Loader className="animate-spin" />
              Loading...
            </span>
          ) : (
            "Login"
          )}
        </Button>
      </Form>
    </form>
  );
};
export default LoginForm;
