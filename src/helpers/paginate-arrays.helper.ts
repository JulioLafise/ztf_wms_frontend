

export const paginateArray = <T,>(array: T[], pageSize: number, pageNumber: number) => array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);