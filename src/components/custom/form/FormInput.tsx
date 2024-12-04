import type { Icon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input, type InputProps } from "@/components/ui/input";

type FormInputProps = InputProps & {
  name: string;
  label: string;
  desc?: string;
  icon?: typeof Icon;
};

export function FormInput({
  label,
  icon: Icon,
  name,
  desc,
  ...props
}: FormInputProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input {...props} {...field} />
            </FormControl>
            {Icon && (
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <Icon size={16} strokeWidth={2} aria-hidden="true" />
              </div>
            )}
          </div>
          <FormDescription>{desc}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
