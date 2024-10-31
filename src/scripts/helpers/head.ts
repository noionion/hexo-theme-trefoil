import { LocalsType } from 'hexo/dist/types';
import { prettyUrls } from 'hexo-util';
import { wrap } from '@/scripts/_utils';

hexo.extend.helper.register('inject_html', (injectArray: string[] | null) =>
    (injectArray ?? []).join('')
)

hexo.extend.helper.register('url_no_index', wrap((ctx: LocalsType, url: string) =>
    /* eslint-disable */
    prettyUrls(url || ctx.url, { trailing_html: true, trailing_index: false })
    /* eslint-enable */
))
