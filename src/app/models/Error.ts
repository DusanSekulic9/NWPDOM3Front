import {Machine} from "./Machine";

export interface Error{
  message: string,
  date: string,
  operation: string,
  machine: Machine
}
