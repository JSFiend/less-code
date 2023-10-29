
import { uiAction} from './ui-action';

export interface Action {
  [key: string]: any,
}


export const opAction = [
  ...uiAction,
]