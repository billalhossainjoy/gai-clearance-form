import { studentSchema, StudentSchemaType } from "@/schema/student.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../../ui/form";
import CustomForm from "../../common/FormField";
import { FormFieldType } from "@/constant";
import { Button } from "../../ui/button";
import { useEffect } from "react";
import {
  depertmentOptions,
  sessionOptions,
  shiftOptions,
} from "../../constaint";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchStudentInfo, getFormInfo } from "@/store/client/client.slice";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ClearanceFormPDF from "../../clearanceForm/form.dynamic";

const ClearanceForm: React.FC = () => {
  const { toast } = useToast();
  const { student, isLoading } = useAppSelector((state) => state.client);
  const { generating, generated } = useAppSelector((state) => state.client);
  const dispatch = useAppDispatch();

  const form = useForm<StudentSchemaType>({
    resolver: zodResolver(studentSchema),
  });

  const roll = form.watch("roll");
  useEffect(() => {
    if (roll >= 100000) {
      dispatch(fetchStudentInfo(String(roll))).then((res) => {
        if (res.payload.statusCode === 404) {
          toast({
            title: "Not Found",
            description: res.payload.message as string,
            variant: "destructive",
          });
        } else if (res.payload.statusCode === 403) {
          toast({
            title: "Blocked",
            description: res.payload.message as string,
            variant: "destructive",
          });
        } else if (res.payload.statusCode === 406) {
          toast({
            title: "Not Accepted",
            description: res.payload.message as string,
            variant: "destructive",
          });
        }
      });
    }
  }, [roll, dispatch, toast]);

  useEffect(() => {
    if (student) {
      toast({
        title: "Congratulations.",
        description: "You are passed, please download you form.",
      });
      form.setValue("registrationNo", student.registrationNo);
      form.setValue("name", student.name);
      form.setValue("technology", student.technology);
      form.setValue("session", student.session);
      form.setValue("shift", student.shift);
    } else {
      form.setValue("registrationNo", 0);
      form.setValue("name", "");
      form.setValue("technology", "");
      form.setValue("session", "");
      form.setValue("shift", "FIRST");
    }
  }, [form, student, toast]);

  useEffect(() => {
    if (student) {
      dispatch(getFormInfo({ shift: student.shift, tech: student.technology }));
    }
  }, [student, dispatch]);

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" p-6 rounded space-y-3 border overflow-auto"
      >
        <Form {...form}>
          <h1 className="text-xl font-semibold text-foreground">
            Passed student clearance from download.
          </h1>
          <CustomForm<StudentSchemaType>
            name="roll"
            control={form.control}
            inputType={FormFieldType.NUMBER}
            label="Board Roll"
            placeholder="roll number"
          />
          {isLoading && (
            <span className=" mt-3">
              <Loader className="w-5 h-5 animate-spin" />
            </span>
          )}
          <CustomForm<StudentSchemaType>
            name="registrationNo"
            control={form.control}
            inputType={FormFieldType.NUMBER}
            label="Registration Number"
            placeholder="registration number"
            disabled
          />
          <CustomForm<StudentSchemaType>
            name="name"
            control={form.control}
            inputType={FormFieldType.INPUT}
            label="Name"
            placeholder="name"
            disabled
          />
          <CustomForm<StudentSchemaType>
            name="technology"
            control={form.control}
            inputType={FormFieldType.SELECT}
            options={depertmentOptions}
            placeholder="Select Technology"
            label="Tecnology"
            disabled
          />
          <CustomForm<StudentSchemaType>
            name="session"
            control={form.control}
            inputType={FormFieldType.SELECT}
            options={sessionOptions}
            label="Session"
            placeholder="select session"
            disabled
          />
          <CustomForm<StudentSchemaType>
            name="shift"
            control={form.control}
            inputType={FormFieldType.SELECT}
            options={shiftOptions}
            label="Shift"
            placeholder="select shift"
            disabled
          />
          {(!student ||
            generating ||
            student?.roll !== form.getValues("roll")) && (
            <Button disabled>Download</Button>
          )}
          {!student ||
          !generated ||
          generating ||
          student.roll !== form.getValues("roll") ? null : (
            <div>
              <Button>
                <PDFDownloadLink
                  document={
                    <ClearanceFormPDF info={student} data={generated} />
                  }
                >
                  Download
                </PDFDownloadLink>
              </Button>
            </div>
          )}
        </Form>
      </form>
    </>
  );
};
export default ClearanceForm;
