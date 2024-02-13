import * as RadixSelect from "@radix-ui/react-select";
import "./Select.css";
import { CheckIcon } from "@radix-ui/react-icons";

export const Select = ({
  button,
  items,
  value,
  onValueChange,
}: {
  onValueChange: (value: string) => void;
  value: string;
  button: React.ReactNode;
  items: { text: React.ReactNode; value: string }[];
}) => {
  return (
    <RadixSelect.Root value={value} onValueChange={onValueChange}>
      <RadixSelect.Trigger asChild>{button}</RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="SelectContent" position="popper">
          <RadixSelect.Viewport>
            {items.map(({ text, value }) => {
              return (
                <RadixSelect.Item
                  value={value}
                  key={value}
                  className="SelectItem"
                >
                  <RadixSelect.ItemIndicator className="SelectItemIndicator">
                    <CheckIcon />
                  </RadixSelect.ItemIndicator>
                  <RadixSelect.ItemText>{text}</RadixSelect.ItemText>
                </RadixSelect.Item>
              );
            })}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};
