/*
 * Modified from hexo-theme-stellar
 */

export function parseTagsArgs(
    args: string[],
    keys: string[],
    content?: string
): Record<string, string> {
    const others: string[] = []
    const dict: Record<string, string> = {};

    args.forEach((arg) => {
        const elem: string = arg.trim();
        if (elem.includes('://') && elem.split(':').length === 2) {
          // 纯 url
          others.push(elem)
        } else {
            const kv: string[] = elem.split(':')
            if (kv.length > 1) {
                if (keys.includes(kv[0])) {
                    dict[kv.shift()!] = kv.join(':');
                } else {
                    others.push(kv.join(':'));
                }
            } else if (kv.length === 1) {
                others.push(kv[0]);
            }
        }
    });

    // 解析不带 key 的参数
    if (content && others.length > 0) {
        dict[content] = others.join(' ')
    }

    return dict;
}
