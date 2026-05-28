import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const PHOTOS_DIR = 'public/photos'
const MAX_SIZE = 1440

async function compress() {
  const files = (await fs.readdir(PHOTOS_DIR))
    .filter(f => /\.(?:jpe?g|png)$/i.test(f))
    .map(f => path.join(PHOTOS_DIR, f))

  console.log(`Found ${files.length} images\n`)

  for (const file of files) {
    const inBuffer = await fs.readFile(file)
    const image = sharp(inBuffer)
    const meta = await image.metadata()
    const { format, width, height } = meta

    if (!format || !width || !height) {
      console.log(`[SKIP] ${file} — could not read metadata`)
      continue
    }

    // Rotate to bake EXIF orientation, then strip all metadata
    let processed = image.rotate()

    if (width > MAX_SIZE || height > MAX_SIZE) {
      processed = processed.resize(MAX_SIZE)
    }

    processed = processed[format as 'jpeg' | 'png']({
      quality: format === 'png' ? 100 : 80,
    })

    const outBuffer = await processed.toBuffer()
    const pct = ((outBuffer.byteLength - inBuffer.byteLength) / inBuffer.byteLength * 100).toFixed(1)

    if (outBuffer.byteLength < inBuffer.byteLength * 0.9) {
      await fs.writeFile(file, outBuffer)
      console.log(`[COMP] ${fmt(inBuffer.byteLength)} → ${fmt(outBuffer.byteLength)}  (${pct}%)  ${path.basename(file)}`)
    }
    else {
      console.log(`[KEEP] ${fmt(inBuffer.byteLength)} → ${fmt(outBuffer.byteLength)}   (${pct}%)  ${path.basename(file)}`)
    }
  }

  console.log('\nDone.')
}

function fmt(bytes: number) {
  const units = ['B', 'kB', 'MB']
  const i = Math.min(2, Math.floor(Math.log(bytes) / Math.log(1024)))
  return `${(bytes / 1024 ** i).toFixed(1)} ${units[i]}`.padStart(8)
}

compress()
