import { studentSchema, StudentSchemaType } from "@/schema/student.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../../ui/form";
import CustomForm from "../../common/FormField";
import { FormFieldType } from "@/constant";
import { Button } from "../../ui/button";
import {
  depertmentOptions,
  sessionOptions,
  shiftOptions,
} from "../../constaint";
import { useAppDispatch } from "@/store/store";
import { useToast } from "@/hooks/use-toast";
import { applyStudent } from "@/store/client/client.slice";

const ApplicationForm: React.FC = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const form = useForm<StudentSchemaType>({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = (data: StudentSchemaType) => {
    dispatch(applyStudent(data)).then((res) => {
      if (res.payload.name === data.name) {
        toast({
          title: "Success",
          description: res.payload.name + " has been applied successfully.",
        });
      } else if (res.payload.statusCode === 409) {
         toast({
           title: "Error",
           description: res.payload.message,
         });
      } else {
        toast({
          title: "Error",
          description: "Failed to apply student.",
        });
      }
    });
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" p-6 rounded space-y-3 border"
      >
        <Form {...form}>
          <h1 className="text-xl font-semibold text-foreground">
            If you are passed then fill up the form.
          </h1>
          <CustomForm<StudentSchemaType>
            name="name"
            control={form.control}
            inputType={FormFieldType.INPUT}
            label="Name"
            placeholder="name"
          />
          <CustomForm<StudentSchemaType>
            name="roll"
            control={form.control}
            inputType={FormFieldType.NUMBER}
            label="Board Roll"
            placeholder="roll number"
          />

          <CustomForm<StudentSchemaType>
            name="registrationNo"
            control={form.control}
            inputType={FormFieldType.NUMBER}
            label="Registration Number"
            placeholder="registration number"
          />

          <CustomForm<StudentSchemaType>
            name="technology"
            control={form.control}
            inputType={FormFieldType.SELECT}
            options={depertmentOptions}
            placeholder="Select Technology"
            label="Tecnology"
          />
          <CustomForm<StudentSchemaType>
            name="session"
            control={form.control}
            inputType={FormFieldType.SELECT}
            options={sessionOptions}
            label="Session"
            placeholder="select session"
          />
          <CustomForm<StudentSchemaType>
            name="shift"
            control={form.control}
            inputType={FormFieldType.SELECT}
            options={shiftOptions}
            label="Shift"
            placeholder="select shift"
          />
          <Button>Apply</Button>
        </Form>
      </form>
    </>
  );
};
export default ApplicationForm;
