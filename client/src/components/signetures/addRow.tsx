import { useForm } from "react-hook-form";
import Div from "../common/customDiv";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createSignetureRowSchema,
  createSignetureRowSchemaType,
} from "@/schema/clearance.schema";
import { Form } from "../ui/form";
import CustomForm from "../common/FormField";
import { FormFieldType } from "@/constant";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/store/store";
import {
  createSignetureRow,
  updateSignetureRow,
} from "@/store/sign/signetureRow.slice";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import { signDepertmentOptions } from "./constaint";

interface Props {
  defaultData?: createSignetureRowSchemaType;
}

const AddRow: React.FC<Props> = ({ defaultData }) => {
  const [, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const form = useForm<createSignetureRowSchemaType>({
    resolver: zodResolver(createSignetureRowSchema),
    defaultValues: {
      labelId: defaultData?.labelId || undefined,
      serial: defaultData?.serial || undefined,
      depertment: defaultData?.depertment || undefined,
      depertmentId: defaultData?.depertmentId || [],
    },
  });

  const onSubmit = (data: createSignetureRowSchemaType) => {
    if (!defaultData) {
      dispatch(createSignetureRow(data)).then((res) => {
        if (res.payload.labelId === data.labelId) {
          toast({
            title: "Success",
            description: "Row added successfully.",
          });
        }
        if (res.payload.statusCode) {
          toast({
            title: "Error",
            description: res.payload.message,
            variant: "destructive",
          });
        }
      });
    } else {
      dispatch(updateSignetureRow({ id: defaultData.id || "", data })).then(
        (res) => {
          if (res.payload.labelId === data.labelId) {
            toast({
              title: "Success",
              description: "Row updated successfully.",
            });
            setSearchParams({});
          }
        }
      );
    }
  };

  return (
    <Div>
      <div className="w-full flex ">
        <form
          className="w-full space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Form {...form}>
            <h1 className="text-xl font-semibold text-foreground ">
              {defaultData ? "Update Row" : "Add new row in Clearance form"}
            </h1>
            <div className="flex justify-between items-center w-full gap-5 flex-wrap md:flex-nowrap">
              <div className="flex gap-3 w-full">
                <CustomForm<createSignetureRowSchemaType>
                  name="labelId"
                  control={form.control}
                  inputType={FormFieldType.NUMBER}
                  label="Serial"
                />
                <CustomForm<createSignetureRowSchemaType>
                  name="serial"
                  control={form.control}
                  inputType={FormFieldType.INPUT}
                  label="Label"
                />
                <CustomForm<createSignetureRowSchemaType>
                  name="depertment"
                  control={form.control}
                  inputType={FormFieldType.INPUT}
                  label="Depertment"
                />
                <CustomForm<createSignetureRowSchemaType>
                  name="depertmentId"
                  control={form.control}
                  inputType={FormFieldType.CHECKBOX_GROUP}
                  options={signDepertmentOptions}
                  label="Depertment"
                />
              </div>
              <Button>{defaultData ? "Upadate" : "Add"}</Button>
            </div>
          </Form>
        </form>
      </div>
    </Div>
  );
};
export default AddRow;
