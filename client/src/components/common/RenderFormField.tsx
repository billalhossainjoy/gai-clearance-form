import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { FormFieldProps } from "./FormField";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { FormFieldType } from "@/constant";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";

interface RenderFeildProps<T extends FieldValues> {
  props: FormFieldProps<T>;
  field: ControllerRenderProps<T, Path<T>>;
}

const RenderFormField = <T extends FieldValues>({
  props,
  field,
}: RenderFeildProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    inputType,
    placeholder,
    icon,
    label,
    options,
    renderSkeleton,
    disabled,
  } = props;

  switch (inputType) {
    case FormFieldType.INPUT:
      return (
        <div className="form-field">
          <div className="text-primary">{icon}</div>
          <FormControl>
            <Input
              type="text"
              {...field}
              placeholder={placeholder}
              disabled={disabled}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.NUMBER:
      return (
        <div className="form-field">
          <div className="text-primary">{icon}</div>
          <FormControl>
            <Input
              type="number"
              value={
                String(field.value)[0] == "0"
                  ? String(field.value).slice(0, 1)
                  : String(field.value)
              }
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
              onChange={(e) => field.onChange(Number(e.target.value))}
              placeholder={placeholder}
              disabled={disabled}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.EMAIL:
      return (
        <div className="form-field">
          <div className="text-primary">{icon}</div>

          <FormControl>
            <Input
              type="email"
              {...field}
              placeholder={placeholder}
              disabled={disabled}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PASSWORD:
      return (
        <div className="password-input">
          {icon && <div className="">{icon}</div>}
          <FormControl>
            <Input
              type={showPassword ? "text" : "password"}
              {...field}
              placeholder="********"
              disabled={disabled}
            />
          </FormControl>
          {showPassword ? (
            <EyeOff onClick={() => setShowPassword(!showPassword)} />
          ) : (
            <EyeIcon onClick={() => setShowPassword(!showPassword)} />
          )}
        </div>
      );
    case FormFieldType.CHECKBOX:
      return (
        <div className=" flex gap-2 items-center">
          <FormControl>
            <Checkbox
              className="rounded"
              checked={field.value}
              onCheckedChange={field.onChange}
              id={field.name}
            />
          </FormControl>
          {label && <Label htmlFor={field.name}>{label}</Label>}
        </div>
      );
    case FormFieldType.CHECKBOX_GROUP:
      return (
        <div className=" flex gap-2 items-center">
          <div className="flex gap-3">
            {options?.map((option) => (
              <div
                key={option.id}
                className="flex flex-col gap-1 items-center justify-center"
              >
                <Checkbox
                  checked={field.value?.includes(option.id)}
                  onCheckedChange={(checked) => {
                    return checked
                      ? field.onChange([...field.value, option.id])
                      : field.onChange(
                          field.value?.filter((value: string) => {
                            return value !== option.id;
                          })
                        );
                  }}
                />
                <Label className="text-[10px]">{option.id}</Label>
              </div>
            ))}
          </div>
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <div className="form-field">
          <FormControl>
            <Textarea
              {...field}
              placeholder={placeholder}
              disabled={disabled}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <div className="form-field">
          <div className="text-primary">{icon}</div>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={disabled}
            >
              <SelectTrigger className="">
                <SelectValue
                  placeholder={placeholder}
                  className="placeholder:text-gray-50"
                />
              </SelectTrigger>
              <SelectContent className="rounded-lg top-2 border border-gray-400">
                {options?.map((option) => (
                  <FormControl key={option.id}>
                    <SelectItem value={option.id}>{option.label}</SelectItem>
                  </FormControl>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton && renderSkeleton(field);
    case FormFieldType.UPLOAD:
      return;
    case FormFieldType.BOOLSELECT:
      return (
        <FormControl>
          <Select
            value={JSON.stringify(field.value)}
            onValueChange={(e) => field.onChange(JSON.parse(e))}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
      );
  }
};

export default RenderFormField;
