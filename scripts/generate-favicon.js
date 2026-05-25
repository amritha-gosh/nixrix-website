const sharp = require('sharp')
const fs = require('fs')

async function generate() {
  // Zoomed in - just the N symbol, tightly cropped and filling the square
  const squareFavSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="16" fill="#f90808"/>
    <g transform="translate(-38, 2) scale(0.78)">
      <path fill="white" d="M101.65,27c.71,0,1.28-.1,1.84-.1,6.88,0,13.76,0,20.65,0,1,0,1.35.26,1.34,1.32-.06,7,0,13.9-.06,20.85v1c1-.94,1.78-1.69,2.56-2.46Q138.14,37.5,148.3,27.44a2,2,0,0,1,1.3-.54c7.1,0,14.19,0,21.29-.06.71,0,1.24,0,1.24,1-.06,7.24-.06,14.48-.09,21.72a5.75,5.75,0,0,1-.08.64H148.84V73.05h-23.5V50.24c-1.51,1.44-2.83,2.68-4.13,3.95q-9.46,9.16-18.94,18.31a2.38,2.38,0,0,1-1.5.6c-7.21,0-14.41,0-21.62.07-1,0-1.28-.25-1.28-1.26,0-6.73,0-13.47,0-20.21V50.17h23.75Z"/>
    </g>
  </svg>`

  fs.writeFileSync('public/favicon.svg', squareFavSvg)

  const buf = Buffer.from(squareFavSvg)
  const bg = { r: 249, g: 8, b: 8, alpha: 1 }

  await sharp(buf).resize(512, 512, { fit: 'contain', background: bg }).png().toFile('public/icon-512.png')
  await sharp(buf).resize(192, 192, { fit: 'contain', background: bg }).png().toFile('public/icon-192.png')
  await sharp(buf).resize(180, 180, { fit: 'contain', background: bg }).png().toFile('public/apple-touch-icon.png')
  await sharp(buf).resize(32, 32, { fit: 'contain', background: bg }).png().toFile('public/favicon-32.png')
  await sharp(buf).resize(16, 16, { fit: 'contain', background: bg }).png().toFile('public/favicon-16.png')

  console.log('Done')
}
generate().catch(console.error)
