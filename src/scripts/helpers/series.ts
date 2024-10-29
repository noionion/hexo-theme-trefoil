import { Post, SeriesDict } from '@/scripts/_utils/types';
import { trim, wrap } from '@/scripts/_utils';
import { LocalsType } from 'hexo/dist/types';

hexo.extend.helper.register('__series_toc', wrap((ctx: LocalsType, post: Post) => {
    const seriesDist: SeriesDict = hexo.locals.get('series_dist')
    const tocStr: string[] = []
    if ((typeof post.series_name) === 'string'
        && !isNaN(post.series_index!)
    ) {
        // index === 0: series home toc
        // index !== 0: series page toc, include self toc
        const series = seriesDist[post.series_name!]
        for (const it of Object.values(series.pages)) {
          if (post.series_index === it.series_index) {
            tocStr.push(
                /* eslint-disable */
                trim`
                    <div class="doc-toc-tree-block active">
                        <a class="doc-toc-tree-h1" href=${ctx.url_for(it.path!)}>
                            <span class="toc-text">${it.subtitle ?? it.title}</span>
                        </a>
                        ${ctx.toc(post.content!, {list_number: false, min_depth: 2})}
                    </div>
                `
                /* eslint-enable */
            )
          } else {
            tocStr.push(
                trim`
                    <div class="doc-toc-tree-block">
                        <a class="doc-toc-tree-h1" href=${ctx.url_for(it.path!)}>
                            <span class="toc-text">${it.subtitle ?? it.title}</span>
                        </a>
                    </div>
                `
            )
          }
        }
        tocStr.push('</div>')
    }

    return tocStr.join('')
}))

hexo.extend.helper.register('__series_get_home_url', (post: Post) => {
    const seriesDist: SeriesDict = hexo.locals.get('series_dist')
    if ((typeof post.series_name) === 'string' && !isNaN(post.series_index!)) {
        return seriesDist[post.series_name!].home.path!
    }
    return ''
})

hexo.extend.helper.register('__series_get_page_prev', (post: Post) => {
    const seriesDist: SeriesDict = hexo.locals.get('series_dist')
    if ((typeof post.series_name) === 'string' && !isNaN(post.series_index!) && post.series_index !== 0) {
        const seriesPages: Post[] = seriesDist[post.series_name!].pages
        for (const [ index, it ] of seriesPages.entries()) {
                if (it.series_index !== post.series_index) {
                    continue
                }
                return seriesPages[index - 1] as any || null
        }
    }
    return null
})

hexo.extend.helper.register('__series_get_page_next', (post: Post) => {
    const seriesDist: SeriesDict = hexo.locals.get('series_dist')
    if ((typeof post.series_name) === 'string' && !isNaN(post.series_index!) && post.series_index !== 0) {
        const seriesPages: Post[] = seriesDist[post.series_name!].pages
        for (const [ index, it ] of seriesPages.entries()) {
                if (it.series_index !== post.series_index) {
                    continue
                }
                return seriesPages[index + 1] as any || null
        }
    }
    return null
})
