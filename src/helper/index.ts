export type PaginationStatus = 'next' | 'disabled' | 'reset' | 'refresh';

export type ServiceGetParams = {
  params?: any;
  paginate?: PaginationStatus;
  [key: string]: any;
};

export const PaginateTypeForReset = ['disabled', 'reset', 'refresh'];

export const setPaginationParams = (
  params: any,
  state: any,
  paginate?: PaginationStatus,
) => {
  if (paginate === 'reset' || paginate === 'refresh') {
    params.skip = Number(0)
  } else if (paginate === 'next' && state?.skip < state?.total) {
    params.skip = Number(state.skip) + Number(state.limit)
  }
  return params;
};

export const setPaginationData = (
  currentData: any,
  nextData: any,
  paginate?: PaginationStatus,
) => {
  if (PaginateTypeForReset.includes(paginate || '')) {
    currentData = nextData;
  } else if (paginate === 'next') {
    currentData = [...currentData, ...nextData];
    
  }
  return currentData;
};

export const setErrorMessage = (action: any) => {
  if (typeof action === 'string') return action;
  let error = action?.paylaod || action;
  let message =
    error?.response?.data?.data?.message ??
    error?.response?.data?.meta?.message ??
    error?.response?.data?.message ??
    error?.response?.message ??
    error?.message ??
    'Server Sedang Mengalami Gangguan';

  return message;
};