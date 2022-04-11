import { Model } from 'sequelize-typescript'
export function paginate<T extends Model[]>(
  data: T,
  pageNo: number = 1,
  total: number = 0,
  pageSize: number = 10,
) {
  return {
    data,
    pageNo,
    pageSize,
    pages: Math.ceil(total / pageSize),
    total,
  }
}
