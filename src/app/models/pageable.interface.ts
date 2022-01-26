export interface Pageable {
  pageNumber: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
}
