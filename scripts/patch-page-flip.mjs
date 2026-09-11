// PageFlip 2.0.7 cleanup fix. Do not silently apply this to another release/build.
// Upstream Render.start never stops RAF; UI.destroy omits resize cleanup when
// useMouseEvents is false. Keep the patch local until upstream fixes both defects.
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const fingerprints = {
  'page-flip.browser.js': {
    original: 'bbaca0bbef57a22bb66a3fc69d67baf9a17fb9a9c89ec9ed35e2b91abe4bd1e7',
    patched: '4026c170150ccbb0f84469d5985b84dec70879ba7be7bd14ad9645a80831dab3',
  },
  'page-flip.module.js': {
    original: 'b718faafca6856bff51629baedeff601e2cc59482e951105bdbd6e46978cca38',
    patched: 'fd43d1db3f32a007d806b6ef0a140a77dfb163fb50f85e11e19a914d622a0c02',
  },
}
const replacements = [
  [
    'start(){this.update();const t=e=>{this.render(e),requestAnimationFrame(t)};requestAnimationFrame(t)}',
    'start(){this.update();this.destroyed=false;const t=e=>{if(this.destroyed)return;this.render(e);if(!this.destroyed)this.animationFrame=requestAnimationFrame(t)};this.animationFrame=requestAnimationFrame(t)}destroy(){this.destroyed=true;cancelAnimationFrame(this.animationFrame);this.animation=null}',
  ],
  [
    'destroy(){this.ui.destroy(),this.block.remove()}',
    'destroy(){this.render&&this.render.destroy(),this.ui&&this.ui.destroy(),this.block.remove()}',
  ],
  [
    'destroy(){this.app.getSettings().useMouseEvents&&this.removeHandlers(),this.distElement.remove(),this.wrapper.remove()}',
    'destroy(){this.removeHandlers(),this.distElement.remove(),this.wrapper.remove()}',
  ],
]
const hash = (text) => createHash('sha256').update(text).digest('hex')

export function patchPageFlip(directory) {
  const { version } = JSON.parse(readFileSync(join(directory, 'package.json'), 'utf8'))
  if (version !== '2.0.7')
    throw new Error(`PageFlip lifecycle patch requires 2.0.7, found ${version}`)
  // Validate every bundle before writing any file. Repeated postinstall runs are safe.
  const writes = []
  for (const [name, fingerprintsForBundle] of Object.entries(fingerprints)) {
    const path = join(directory, 'dist/js', name)
    let source = readFileSync(path, 'utf8')
    const currentHash = hash(source)
    if (currentHash === fingerprintsForBundle.patched) continue
    if (currentHash !== fingerprintsForBundle.original)
      throw new Error(`Unrecognized PageFlip bundle: ${name}`)
    for (const [before, after] of replacements) {
      if (source.split(before).length !== 2)
        throw new Error(`PageFlip patch location mismatch: ${name}`)
      source = source.replace(before, after)
    }
    if (hash(source) !== fingerprintsForBundle.patched)
      throw new Error(`PageFlip patch checksum mismatch: ${name}`)
    writes.push([path, source])
  }
  for (const [path, source] of writes) writeFileSync(path, source)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  patchPageFlip(resolve(dirname(fileURLToPath(import.meta.url)), '../node_modules/page-flip'))
}
