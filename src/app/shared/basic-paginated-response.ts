export interface BasicPaginatedResponse<TEntry> {
  readonly data: TEntry[];
  readonly pagination: PaginationInfo;
}

interface PaginationInfo {
  /**
   * The amount of items retrieved in the response's data collection.
   *
   * @remarks
   * This is the same value as the response data collection's length value.
   */
  readonly length: number;

  /**
   * The total amount (count) of items after filtering.
   */
  readonly count: number;
}
