import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormItemProps {
  label: string;
  placeholder: string;
  type: string;
  name: string;
  defaultValue?: string;
}

export default function FormItem(props: FormItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{props.label}</Label>
      <Input
        defaultValue={props.defaultValue}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
      />
    </div>
  );
}
