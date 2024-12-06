import CustomForm from "@/components/common/FormField";
import { authorPassword, AuthorPasswordType } from "@/schema/setting.scehma";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormFieldType } from "@/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/store/store";
import { changeAdminPassword } from "@/store/admin/admin.slice";
import { useToast } from "@/hooks/use-toast";

const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const form = useForm<AuthorPasswordType>({
    resolver: zodResolver(authorPassword),
  });

  const onSubmit = (data: AuthorPasswordType) => {
    dispatch(changeAdminPassword(data)).then((res) => {
      if (res.payload.message) {
        toast({
          title: "Update",
          description: res.payload.message,
        });
      }
    });
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-5">
        <h1 className="text-3xl font-bold text-foreground mb-4">Settings</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-secondary p-6 rounded space-y-3 border"
        >
          <Form {...form}>
            <h1 className="text-xl font-semibold text-foreground">
              Change user password.
            </h1>
            <CustomForm<AuthorPasswordType>
              name="password"
              control={form.control}
              inputType={FormFieldType.PASSWORD}
              label="Password"
              placeholder="********"
            />
            <CustomForm<AuthorPasswordType>
              name="confirmPassword"
              control={form.control}
              inputType={FormFieldType.PASSWORD}
              label="Confirm password"
              placeholder="********"
            />

            <Button>Change Password</Button>
          </Form>
        </form>
      </div>
    </div>
  );
};
export default SettingsPage;
