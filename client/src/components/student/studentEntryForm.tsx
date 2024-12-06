import CustomForm from "@/components/common/FormField";
import { studentSchema, StudentSchemaType } from "@/schema/student.schema";
import { FormFieldType } from "@/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  activeStatusOptions,
  depertmentOptions,
  sessionOptions,
  shiftOptions,
} from "@/components/constaint";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addNewStudent, updateStudent } from "@/store/student/student.slice";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import { Loader } from "lucide-react";

interface Props {
  student?: (StudentSchemaType & { id: string }) | null;
}

const NewStudentEntry: React.FC<Props> = ({ student }) => {
  const {isLoading} = useAppSelector(state => state.student);


  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [,setSearchParams] = useSearchParams();
  const form = useForm<StudentSchemaType>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: student?.name || undefined,
      technology: student?.technology || undefined,
      roll: student?.roll || undefined,
      registrationNo: student?.registrationNo || undefined,
      session: student?.session || undefined,
      shift: student?.shift || undefined,
      active: student && (student?.active !== true ? false : true) || true,
      blockReason: student?.blockReason || undefined,
    },
  });

  const onSubmit = (data: StudentSchemaType) => {
    if (!student)
      dispatch(addNewStudent(data)).then((res) => {
        if (res.payload.roll === data.roll) {
          toast({
            title: "Student Added",
            description: res.payload.name + " added successfully.",
          });
        }
        if (res.payload.message) {
          toast({
            title: "Error",
            variant: "destructive",
            description: res.payload.message.split(":")[1],
          });
        }
      });
    else
      dispatch(updateStudent({ id: student.id, data })).then((res) => {
        if (res.payload.roll === data.roll) {
          toast({
            title: "Student Updated",
            description: res.payload.name + " updated successfully.",
          });
          setSearchParams({});
        }
        if (res.payload.message) {
          toast({
            title: "Error",
            variant: "destructive",
            description: res.payload.message.split(":")[1],
          });
        }
      });
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-secondary p-6 rounded space-y-3 border"
      >
        <Form {...form}>
          <h1 className="text-xl font-semibold text-foreground">
            {!student
              ? "Fill already passed student information."
              : "Udate information"}
          </h1>
          <CustomForm<StudentSchemaType>
            name="name"
            control={form.control}
            inputType={FormFieldType.INPUT}
            label="Name"
            placeholder="name"
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
          <div className="flex gap-3">
            <div>
              <CustomForm<StudentSchemaType>
                name="active"
                control={form.control}
                inputType={FormFieldType.BOOLSELECT}
                options={activeStatusOptions}
                label="Active"
                placeholder="active or block"
              />
            </div>
            <div className="w-full">
              {!form.watch("active") && (
                <CustomForm<StudentSchemaType>
                  name="blockReason"
                  control={form.control}
                  inputType={FormFieldType.INPUT}
                  label="Block Reason"
                  placeholder="type the reson why block the stuent or who block the student"
                />
              )}
            </div>
          </div>

          <Button disabled={isLoading}>{!isLoading ? (student ? "Update" : "Add Student") : <Loader className=" animate-spin "/>}</Button>
        </Form>
      </form>
    </>
  );
};
export default NewStudentEntry;
