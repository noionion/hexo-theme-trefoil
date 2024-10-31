import { defineConfig } from 'rollup'
import fg from 'fast-glob'
import NodeResolve from '@rollup/plugin-node-resolve';
import TypeScript from '@rollup/plugin-typescript'
import Alias from '@rollup/plugin-alias'
import CommonJS from '@rollup/plugin-commonjs'
import Terser from '@rollup/plugin-terser'
import path from 'path'

const inputs = fg.sync(['src/scripts/*/*.ts', '!src/scripts/_*/*.ts', '!src/scripts/*/_*.ts'])

function parse(p: string) {
    const { dir, name } = path.parse(path.relative('src', p))
    return path.join(dir, name)
}

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    input: Object.fromEntries(inputs.map((p) => [parse(p), p])),
    output: {
        dir: 'build',
        format: 'cjs',
        preserveModules: true
    },
    plugins: [
        NodeResolve(),
        TypeScript({ tsconfig: './tsconfig.json' }),
        Alias({
            entries: [
                { find: '@', replacement: path.resolve(import.meta.dirname, 'src') },
            ]
        }),
        CommonJS(),
        Terser()
    ],
    external: [
        "cheerio",
        "hexo-front-matter",
        "hexo-fs",
        "hexo-util"
    ],
})
