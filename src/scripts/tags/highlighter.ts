import {TagsArgsParse} from "@/scripts/_utils/tags";

hexo.extend.tag.register('highlighter', function(args) {
    let params = TagsArgsParse(args, ['color', 'url'], 'text')

    if (params.url) return `<a href='${params.url}' class='tag-highlighter ${params.color}'>${params.text}</a>`
    else return `<span class='tag-highlighter ${params.color}'>${params.text}</span>`
})