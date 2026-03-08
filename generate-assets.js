#!/usr/bin/env node
/**
 * generate-assets.js
 * Run ONCE before starting the app: node generate-assets.js
 * Creates valid PNG files for iOS, Android, and Web.
 */

const fs   = require('fs');
const zlib = require('zlib');
const path = require('path');

function crc32(buf) {
  const table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    table[i] = c;
  }
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function buildChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf  = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length);
  const crcBuf  = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function createPNG(width, height, r, g, b) {
  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width,  0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8]  = 8; // bit depth
  ihdr[9]  = 2; // color type: RGB
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  // Raw scanlines: filter_byte + RGB * width
  const scanline = Buffer.alloc(1 + width * 3);
  scanline[0] = 0; // filter: None
  for (let x = 0; x < width; x++) {
    scanline[1 + x * 3]     = r;
    scanline[2 + x * 3]     = g;
    scanline[3 + x * 3]     = b;
  }
  const rows = [];
  for (let y = 0; y < height; y++) rows.push(scanline);
  const rawData    = Buffer.concat(rows);
  const compressed = zlib.deflateSync(rawData, { level: 9 });

  const PNG_SIG = Buffer.from('89504e470d0a1a0a', 'hex');
  return Buffer.concat([
    PNG_SIG,
    buildChunk('IHDR', ihdr),
    buildChunk('IDAT', compressed),
    buildChunk('IEND', Buffer.alloc(0)),
  ]);
}

// Dark brand color: #0D0F14
const R = 0x0D, G = 0x0F, B = 0x14;

const assets = [
  { file: 'icon.png',          w: 1024, h: 1024 }, // iOS + Android launcher
  { file: 'adaptive-icon.png', w: 1024, h: 1024 }, // Android adaptive foreground
  { file: 'splash.png',        w: 1284, h: 2778 }, // iPhone 14 Pro Max resolution
  { file: 'favicon.png',       w: 196,  h: 196  }, // Web
];

const dir = path.join(__dirname, 'assets');
fs.mkdirSync(dir, { recursive: true });

assets.forEach(({ file, w, h }) => {
  const png = createPNG(w, h, R, G, B);
  fs.writeFileSync(path.join(dir, file), png);
  console.log(`✅  assets/${file}  (${w}×${h})`);
});

console.log('\n🎉  All assets ready. Now run: npx expo start --clear\n');
