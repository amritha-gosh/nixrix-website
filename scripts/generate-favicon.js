const sharp = require('sharp')
const fs = require('fs')

async function generate() {
  const svgBuffer = fs.readFileSync('public/nixrix-icon.svg')
  
  // Add red background and scale up the icon content
  const svgContent = svgBuffer.toString()
  
  // Create a wrapped SVG with red background and padding to make icon bigger
  const wrappedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="20" fill="#f90808"/>
    <g transform="translate(10,10) scale(0.8)">
      ${svgContent.replace(/<svg[^>]*>/, '').replace('</svg>', '')}
    </g>
  </svg>`
  
  const wrappedBuffer = Buffer.from(wrappedSvg)
  
  await sharp(wrappedBuffer).resize(192, 192).png().toFile('public/icon-192.png')
  await sharp(wrappedBuffer).resize(512, 512).png().toFile('public/icon-512.png')
  await sharp(wrappedBuffer).resize(180, 180).png().toFile('public/apple-touch-icon.png')
  await sharp(wrappedBuffer).resize(32, 32).png().toFile('public/favicon-32.png')
  await sharp(wrappedBuffer).resize(16, 16).png().toFile('public/favicon-16.png')
  
  // Write wrapped SVG as favicon.svg too
  fs.writeFileSync('public/favicon.svg', wrappedSvg)
  
  console.log('All favicon files generated successfully')
}

generate().catch(console.error)
