import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CheckCircle, Circle, Stack } from '@phosphor-icons/react';

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
        <DropdownMenu.Content side="left" sideOffset={8} className="dropdown-content">
          <DropdownMenu.Label className="dropdown-label">
            Map Layers
          </DropdownMenu.Label>

          <DropdownMenu.Separator className="dropdown-separator" />

          <DropdownMenu.CheckboxItem
            className="dropdown-item dropdown-checkbox-item"
            checked={checked}
            onCheckedChange={setChecked}
            onSelect={onSelect}>

            <DropdownMenu.ItemIndicator className="dropdown-indicator">
              <CheckCircle size={20} weight="fill" />
            </DropdownMenu.ItemIndicator>

            {!checked && (
              <span className="dropdown-indicator"><Circle size={20} weight="bold" /></span>
            )}

            Show Check
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.Item
            className="dropdown-item dropdown-checkbox-item">
            Bar
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="dropdown-item dropdown-checkbox-item">
            Baz
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )

}