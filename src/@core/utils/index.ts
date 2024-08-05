import { CompositeFilterDescriptor } from "@progress/kendo-data-query"

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>> 
    & {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
        [K in Keys]-?:
            Required<Pick<T, K>>
            & Partial<Record<Exclude<Keys, K>, undefined>>
    }[Keys]

export const generateFilter = (data: any) : CompositeFilterDescriptor | undefined => {
    return {
        logic: 'and',
        filters: Object.entries(data).map((e) => ({
          field: e[0],
          value: e[1],
          operator: 'contains',
        })),
      }
}
export const generateFiltereq = (data: any) : CompositeFilterDescriptor | undefined => {
    return {
        logic: 'and',
        filters: Object.entries(data).map((e) => ({
          field: e[0],
          value: e[1],
          operator: 'eq',
        })),
      }
}