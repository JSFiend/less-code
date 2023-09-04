import axios from 'axios';
import { ApiMethod } from '~types/index';

const axiosInstance = axios.create();



interface DebugRequest {
  url: string,
  method: ApiMethod,
  prePlugin?: string,
  postPlugin?: string,
}

export function debugRequest(option: DebugRequest) {

}

