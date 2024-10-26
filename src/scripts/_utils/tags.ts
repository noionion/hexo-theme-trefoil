/*
 * modify from hexo-theme-stellar
 */

export function TagsArgsParse(
    args: string[],
    keys: string[],
    content?: string
): Record<string, string> {
    const OtherArgs: string[] = []
    const dict: Record<string, string> = {};
    args.forEach((arg) => {
        const elem: string = arg.trim();
        if (elem.includes('://') && elem.split(':').length == 2) {
          // 纯 url
          OtherArgs.push(elem)
        } else {
            const kv: string[] = elem.split(':')
            if (kv.length > 1) {
                if (keys.includes(kv[0]) == true) {
                    dict[kv.shift()!] = kv.join(':');
                } else {
                    OtherArgs.push(kv.join(':'));
                }
            } else if (kv.length == 1) {
                OtherArgs.push(kv[0]);
            }
        }
    });
    // 解析不带 key 的参数
    if (content && OtherArgs.length > 0) {
        dict[content] = OtherArgs.join(' ')
    }
    return dict;
}
