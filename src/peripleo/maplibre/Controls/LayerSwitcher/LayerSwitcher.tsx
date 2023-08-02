import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Check, Stack } from '@phosphor-icons/react';

interface LayerSwitcherProps {

}

export const LayerSwitcher = (props: LayerSwitcherProps) => {

  const [checked, setChecked] = useState(false);

  const onSelect = (evt: Event) => {
    // Prevents the dropdown from closing on click
    evt.stopPropagation();
    evt.preventDefault();
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button 
          className="p6o-control p6o-control-btn"
          aria-label="Select map layers">
          <Stack size={20} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="dropdown-content">
          <DropdownMenu.CheckboxItem
            className="dropdown-checkbox-item"
            checked={checked}
            onCheckedChange={setChecked}
            onSelect={onSelect}>

            <DropdownMenu.ItemIndicator>
              <Check />
            </DropdownMenu.ItemIndicator>

            Show Check
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.Item>
            Bar
          </DropdownMenu.Item>

          <DropdownMenu.Item>
            Baz
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )

}