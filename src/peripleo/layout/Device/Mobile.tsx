import { Size } from './Device';
import { useDeviceState } from './DeviceStateProvider';

export const Mobile = (props: { children: React.ReactElement }) => {

  const device = useDeviceState();

  return device.size === Size.MOBILE ? props.children : null;

}