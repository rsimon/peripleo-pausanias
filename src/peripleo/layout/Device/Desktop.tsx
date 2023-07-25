import { Size } from './Device';
import { useDeviceState } from './DeviceStateProvider';

export const Desktop = (props: { children: React.ReactElement }) => {

  const device = useDeviceState();

  return device.size === Size.DESKTOP ? props.children : null;

}