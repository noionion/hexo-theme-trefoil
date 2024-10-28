/* eslint-disable @typescript-eslint/naming-convention */
import { PostSchema } from 'hexo/dist/types';

export interface Post extends PostSchema{
    subtitle?: string
    series_index?: number
    series_name?: string
}

export type SeriesDict = Record<string, {
    home: Post,
    pages: Post[]
}>
