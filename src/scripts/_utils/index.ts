import type {LocalsType} from 'hexo/dist/types'

export function trim(strings: TemplateStringsArray, ...args: any[]): string {
    const array: string[] = [strings[0]]
    for (let i = 0; i < args.length; i++) {
        array.push(args[i], strings[i + 1])
    }
    return array.flatMap(it => it.split('\n'))
        .map(it => it.trim())
        .join('')
}

export function wrap<A extends any[], R>(func: (ctx: LocalsType, ...args: A) => R) {
    return function(this: LocalsType, ...args: A) {
        // eslint-disable-next-line no-invalid-this
        return func(this, ...args)
    }
}
