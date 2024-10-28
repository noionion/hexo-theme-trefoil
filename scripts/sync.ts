import fs from 'fs/promises'
import path from 'path'

import { PackageJson } from 'type-fest'

// Copy files
;(async () => {
    await fs.cp('src', 'build', {
        recursive: true,
        filter(src: string){
            return path.parse(src).ext !== '.ts'
        }
    })
})()

// Transform package.json
;(async () => {
    const packageJson: PackageJson = JSON.parse(await fs.readFile('package.json', 'ascii'))

    packageJson.type = 'commonjs'

    delete packageJson.scripts
    delete packageJson.devDependencies

    await fs.writeFile('build/package.json', JSON.stringify(packageJson, null, 2), 'ascii')
})()
