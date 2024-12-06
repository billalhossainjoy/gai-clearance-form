import CustomForm from "@/components/common/FormField";
import { newAdminSchema, NewAdminSchemaType } from "@/schema/auth.schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormFieldType } from "@/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { adminTypeOptions } from "@/components/constaint";
import AllAccountAdmins from "@/components/Account/accountUsers";
import { registerAdmin } from "@/store/admin/admin.slice";
import { useAppDispatch } from "@/store/store";
import { useToast } from "@/hooks/use-toast";

const AccountPage: React.FC = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const form = useForm<NewAdminSchemaType>({
    resolver: zodResolver(newAdminSchema),
  });

  const onSubmit = (data: NewAdminSchemaType) => {
    dispatch(registerAdmin(data)).then((res) => {
      if (res.payload.name === data.name) {
        toast({
          title: "Success",
          description:
            res.payload.name +
            "added successfully as " +
            (res.payload.role === "ADMIN" ? " an admin" : " a staff"),
        });
      }
      if (res.payload.statusCode >= 400) {
        toast({
          title: "Error",
          variant: "destructive",
          description: res.payload.message.split(':')[1],
        });
      }
    });
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-5">
        <h1 className="text-3xl font-bold text-foreground mb-4">Add new admin</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-secondary p-6 rounded space-y-3 border"
        >
          <Form {...form}>
            <h1 className="text-xl font-semibold text-foreground">
              Add Admin or Staff to access this admin panel.
            </h1>

            <CustomForm<NewAdminSchemaType>
              name="name"
              control={form.control}
              inputType={FormFieldType.INPUT}
              label="Name"
              placeholder="name"
            />

            <CustomForm<NewAdminSchemaType>
              name="email"
              control={form.control}
              inputType={FormFieldType.INPUT}
              placeholder="example@gai.com"
              label="Email"
            />

            <CustomForm<NewAdminSchemaType>
              name="role"
              control={form.control}
              inputType={FormFieldType.SELECT}
              options={adminTypeOptions}
              label="Admin type"
              placeholder="admin or staff"
            />

            <Button>Add Admin</Button>
          </Form>
        </form>
        <div className="mt-3">
          <h1 className="text-3xl font-bold text-foreground mb-4">Admins</h1>
          <div className="bg-secondary p-6 rounded space-y-3 border">
            <h1 className="text-xl font-semibold text-foreground">
              Admin lists.
            </h1>
            <AllAccountAdmins />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccountPage;
