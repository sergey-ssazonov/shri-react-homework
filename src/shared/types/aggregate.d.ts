export type TAggregateData = {
  total_spend_galactic: number;
  rows_affected: number;
  average_spend_galactic: number;
  big_spent_at?: number;
  less_spent_at?: number;
  big_spent_value?: number;
  less_spent_value?: number;
  big_spent_civ?: string;
  less_spent_civ?: string;
};

export type TAggregateHistoryRecord = {
  id: string;
  fileName: string;
  date: string;
  status: 'success' | 'error';
  result?: TAggregateData;
  errorMessage?: string;
};
