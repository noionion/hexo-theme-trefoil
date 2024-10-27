/* eslint-disable @typescript-eslint/naming-convention */

export interface Post {
    title: string
    subtitle?: string
    source: string

    series_index?: number
    series_name?: string

    [prop: string]: any
}

export type SeriesDict = Record<string, {
    home: Post,
    pages: Post[]
}>
