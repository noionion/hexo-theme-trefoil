import { parseTagsArgs } from '@/scripts/_utils/tags';

hexo.extend.tag.register('highlighter', (args) => {
    const params = parseTagsArgs(args, ['color', 'url'], 'text')

    if (params.url) {
        return `<a href='${params.url}' class='tag-highlighter ${params.color}'>${params.text}</a>`
    }

    return `<span class='tag-highlighter ${params.color}'>${params.text}</span>`
})
