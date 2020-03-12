export interface IFilter {
  search?: string;
  bankAccount?: string;
  category?: string;
  minAmount?: number | string;
  maxAmount?: number | string;
  startDate?: Date;
  endDate?: Date;
}
