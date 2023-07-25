import { Desktop } from './Desktop';
import { Mobile } from './Mobile';

export interface DeviceType {

  size: Size

  isTouchDevice: boolean

}

export enum Size {

  MOBILE = 'MOBILE',

  DESKTOP = 'DESKTOP'

}

export const Device = { Desktop, Mobile }