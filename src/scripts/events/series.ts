import { Post, SeriesDict } from '@/scripts/_utils/types';
import type Hexo from 'hexo';

function genSeriesDict(hexo: Hexo): void {
    const seriesDict: SeriesDict = {}
    const posts = hexo.locals.get('posts')

    posts.each((it: Post) => {
        if (it.series_index === 0){
            if ((it.series_name!) in seriesDict) {
                hexo.log.error('There have the conflicting series homepage')
                hexo.log.error(`> [series_name: ${it.series_name!}]`)
                hexo.log.error(`  - [title: ${it.title} ${it.subtitle ?? ''}][source: ${it.source}]`)
                hexo.log.error(`  - [title: ${seriesDict[it.series_name!].home.title} ${seriesDict[it.series_name!].home.subtitle ?? ''}][source: ${seriesDict[it.series_name!].home.source}]`)
                hexo.log.error('You must modify the \'front-matter\' of the corresponding file and perform the \'hexo clean\' operation one time. ')
                process.exit(-1)
            }
            seriesDict[it.series_name!] = {
                home: it,
                pages: []
            }
        }
    })

    posts.each((it: Post) => {
        if (it.series_index !== 0
            && !isNaN(it.series_index!)
            && (it.series_name!) in seriesDict
        ) {
            seriesDict[it.series_name!].pages.push(it)
        }
    })

    for (const item of Object.values(seriesDict)) {
        item.pages.sort((a, b) => {
            const cmp = a.series_index! - b.series_index!
            if (cmp === 0) {
                hexo.log.error('There have the same series_index: ')
                hexo.log.error(`> [series_name: ${a.series_name!}][series_index: ${a.series_index}]`)
                hexo.log.error(`  - [title: ${a.title} ${a.subtitle}][source: ${a.source}]`)
                hexo.log.error(`  - [title: ${b.title} ${b.subtitle}][source: ${b.source}]`)
                hexo.log.error('You must modify the \'front-matter\' of the corresponding file and perform the \'hexo clean\' operation one time. ')
                process.exit(-1)
            }
            return cmp
        })
    }

    hexo.locals.set('series_dist', () => seriesDict)
}

hexo.on('generateBefore', () => {
    genSeriesDict(hexo)
})
