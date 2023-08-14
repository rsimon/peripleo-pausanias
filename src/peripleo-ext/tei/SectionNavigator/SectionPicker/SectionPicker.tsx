import * as Popover from '@radix-ui/react-popover';
import { ListBullets } from '@phosphor-icons/react';
import { Section } from '../Section';

import './SectionPicker.css';

interface SectionPickerProps {

  sections: Section[];

  cursor: number;

}

export const SectionPicker = (props: SectionPickerProps) => {

  const { cursor, sections } = props;

  const getSectionNumber = () => {
    const currentSection = cursor > -1 ? sections[cursor] : undefined;
    if (!currentSection)
      return '';

    const { element } = currentSection;

    const chapter = element.parentElement.getAttribute('n');
    const section = element.getAttribute('n');

    return `${chapter}.${section}`;
  }

  return (
    <div className="p6o-teiview-nav-picker">
      <Popover.Root>
        <Popover.Trigger asChild>
          <button>
            Section {getSectionNumber()} <ListBullets   size={16} />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content className="popover-content" align="start" sideOffset={10}>
            <form>
              <fieldset>
                <label className="Label" htmlFor="width">
                  Jump to Section
                </label>

                <input id="to-section" />
              </fieldset>
            </form>

            <Popover.Arrow className="popover-arrow" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )

}