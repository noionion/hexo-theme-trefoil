// 生成series-dist，结构如下：
/*
var series_dist = {
    series_name1: {
        home: series_homepage,
        pages: [
            series_page1,
            series_page2,
            // ...
        ]
    },
    series_name2: {
        // ...
    }
}
*/

import type Hexo from "hexo";

interface PostData {
    series_index?: number,
    series_name?: string,
    [prop: string]: any
}

interface SeriesDist {
    [key: string]: {
        home: PostData,
        pages: Array<PostData>
    }
}

function SeriesDistGen(hexo: Hexo): void {
    const series_dist: SeriesDist = {}
    const posts = hexo.locals.get('posts')
    posts.each((it: PostData) => {
        if (it.series_index === 0){
            if (it.series_name! in series_dist) {
                hexo.log.error('There have the conflicting series homepage')
                hexo.log.error(`> [series_name: ${it.series_name}]`)
                hexo.log.error(`  - [title: ${it.title} ${it.subtitle ?? ''}][source: ${it.source}]`)
                hexo.log.error(`  - [title: ${series_dist[it.series_name!].home.title} ${series_dist[it.series_name!].home.subtitle ?? ''}][source: ${series_dist[it.series_name!].home.source}]`)
                hexo.log.error("You must modify the 'front-matter' of the corresponding file and perform the 'hexo clean' operation one time. ")
                process.exit(-1)
            }
            series_dist[it.series_name!] = {
                home: it,
                pages: []
            }
        }
    })
    posts.each((it: PostData) => {
        if (it.series_index !== 0
            && !isNaN(it.series_index!)
            && it.series_name! in series_dist
        ) {
            series_dist[it.series_name!].pages.push(it)
        }
    })
    for (const item of Object.values(series_dist)) {
        item.pages.sort((a, b) => {
            const cmp = a.series_index! - b.series_index!
            if (cmp === 0) {
                hexo.log.error('There have the same series_index: ')
                hexo.log.error(`> [series_name: ${a.series_name}][series_index: ${a.series_index}]`)
                hexo.log.error(`  - [title: ${a.title} ${a.subtitle}][source: ${a.source}]`)
                hexo.log.error(`  - [title: ${b.title} ${b.subtitle}][source: ${b.source}]`)
                hexo.log.error("You must modify the 'front-matter' of the corresponding file and perform the 'hexo clean' operation one time. ")
                process.exit(-1)
            }
            return cmp
        })
    }
    hexo.locals.set('series_dist', () => series_dist)
}

hexo.on('generateBefore', () => {
    SeriesDistGen(hexo)
})