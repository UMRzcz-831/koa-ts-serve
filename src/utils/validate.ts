import Schema, { Rules, Values, ValidateError } from 'async-validator'
import { Context } from 'koa'

async function validate<T extends Values>(
  ctx: Context,
  rules: Rules,
): Promise<{ data: T; error: any | null }> {
  const validator = new Schema(rules)
  let data: any = {}

  switch (ctx.method) {
    case 'GET':
      break
    case 'POST':
      data = getFormData(ctx)
      break
    case 'PUT':
      data = getFormData(ctx)
      break
    case 'DELETE':
      break
  }

  return validator
    .validate(data)
    .then(() => {
      return {
        data: data as T,
        error: null,
      }
    })
    .catch((error) => {
      let err = error.errors as ValidateError[]
      return {
        data: {} as T,
        error: err[0].message,
      }
    })
}

function getFormData(ctx: Context) {
  return ctx.request.body
}

export default validate
