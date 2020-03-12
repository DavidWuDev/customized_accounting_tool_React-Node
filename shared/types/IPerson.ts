import { IData } from './IData';

export interface IPerson extends IData {
  firstName: string;
  lastName: string;
  fullName?: string;
  pan: string;
  monthlyIncome?: number;
}
