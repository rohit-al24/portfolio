// Removes the near-white studio background from me.png and writes a
// transparent PNG to public/portrait.png. Pure Node (no dependencies).
import { readFileSync, writeFileSync } from "node:fs";
import { deflateSync, inflateSync } from "node:zlib";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const input = join(__dirname, "..", "public", "assets", "galaxy", "me.png");
const output = join(__dirname, "..", "public", "portrait.png");

// ---------- CRC32 (PNG) ----------
const crcTable = new Int32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  crcTable[n] = c;
}
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

// ---------- Parse ----------
const buf = readFileSync(input);
const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!buf.subarray(0, 8).equals(sig)) throw new Error("Not a PNG file");

let pos = 8;
let width = 0;
let height = 0;
let bitDepth = 0;
let colorType = 0;
let interlace = 0;
const idat = [];
const ancillary = [];

while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString("ascii", pos + 4, pos + 8);
  const data = Buffer.from(buf.subarray(pos + 8, pos + 8 + len));
  if (type === "IHDR") {
    width = data.readUInt32BE(0);
    height = data.readUInt32BE(4);
    bitDepth = data[8];
    colorType = data[9];
    interlace = data[12];
  } else if (type === "IDAT") {
    idat.push(data);
  } else if (type !== "IEND") {
    ancillary.push({ type, data });
  }
  pos += 12 + len;
}

if (interlace !== 0) throw new Error("Interlaced PNG not supported");
if (bitDepth !== 8) throw new Error("Only 8-bit depth supported");
if (colorType !== 6) throw new Error(`Expected RGBA (6), got ${colorType}`);

// ---------- Decode scanlines ----------
const raw = inflateSync(Buffer.concat(idat));
const channels = 4;
const stride = width * channels;
const pixels = Buffer.alloc(height * stride);

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
}

for (let y = 0; y < height; y++) {
  const filter = raw[y * (stride + 1)];
  const rowIn = y * (stride + 1) + 1;
  const rowOut = y * stride;
  for (let x = 0; x < stride; x++) {
    const left = x >= channels ? pixels[rowOut + x - channels] : 0;
    const up = y > 0 ? pixels[rowOut - stride + x] : 0;
    const upLeft = y > 0 && x >= channels ? pixels[rowOut - stride + x - channels] : 0;
    let v;
    switch (filter) {
      case 0: v = raw[rowIn + x]; break;
      case 1: v = raw[rowIn + x] + left; break;
      case 2: v = raw[rowIn + x] + up; break;
      case 3: v = raw[rowIn + x] + ((left + up) >> 1); break;
      case 4: v = raw[rowIn + x] + paeth(left, up, upLeft); break;
      default: throw new Error(`Unknown filter ${filter}`);
    }
    pixels[rowOut + x] = v & 0xff;
  }
}

// ---------- Remove white background ----------
const HARD = 245;
const SOFT = 215;
let removed = 0;

for (let i = 0; i < pixels.length; i += channels) {
  const r = pixels[i];
  const g = pixels[i + 1];
  const b = pixels[i + 2];
  const mn = Math.min(r, g, b);
  let alpha = 255;
  if (mn >= HARD) alpha = 0;
  else if (mn >= SOFT) alpha = Math.round(((HARD - mn) / (HARD - SOFT)) * 255);

  if (alpha === 0) removed++;

  // Slight de-spill on semi-transparent edges (keeps hair/edges clean).
  if (alpha < 255 && alpha > 0) {
    const f = alpha / 255;
    pixels[i] = Math.min(255, Math.round((r - 255) / f + 255));
    pixels[i + 1] = Math.min(255, Math.round((g - 255) / f + 255));
    pixels[i + 2] = Math.min(255, Math.round((b - 255) / f + 255));
  }
  pixels[i + 3] = alpha;
}

// ---------- Re-encode (filter 0) ----------
const encoded = Buffer.alloc(height * (stride + 1));
for (let y = 0; y < height; y++) {
  encoded[y * (stride + 1)] = 0;
  pixels.copy(encoded, y * (stride + 1) + 1, y * stride, y * stride + stride);
}
const compressed = deflateSync(encoded, { level: 9 });

// ---------- Write PNG ----------
function chunk(type, data) {
  const t = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(width, 0);
ihdr.writeUInt32BE(height, 4);
ihdr[8] = bitDepth;
ihdr[9] = colorType;
ihdr[10] = 0;
ihdr[11] = 0;
ihdr[12] = interlace;

const out = Buffer.concat([
  sig,
  chunk("IHDR", ihdr),
  ...ancillary.map((a) => chunk(a.type, a.data)),
  chunk("IDAT", compressed),
  chunk("IEND", Buffer.alloc(0)),
]);

writeFileSync(output, out);
const pct = ((removed / (width * height)) * 100).toFixed(1);
console.log(`Done. ${width}x${height}, removed background on ${removed} px (${pct}% fully transparent).`);
console.log(`Wrote ${output}`);
