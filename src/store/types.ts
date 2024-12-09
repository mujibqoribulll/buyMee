export type loadingType = 'idle' | 'pending' | 'succeeded' | 'failed';
export type paginationType = {
  page: number;
  limit: number;
  next_page: number;
  prev_page: number;
  has_next_page: boolean;
  has_prev_page: boolean;
  total: number;
};
export default interface InitialState {
  loading: loadingType;
  data?: any;
  message?: any;
  pagination?: paginationType;
  [key: string]: any;
}
