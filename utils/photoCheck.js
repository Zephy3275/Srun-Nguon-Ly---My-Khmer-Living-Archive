// Checks the chosen photo before anything is uploaded.
// The type comes from the file's first bytes ("magic bytes"), never from the
// filename or the browser's file.type: those are chosen by whoever sent the
// file. These limits match the `photos` bucket (5 MB, jpeg/png/webp).

const MAX_BYTES = 5 * 1024 * 1024;
const MESSAGE = "Choose a JPG, PNG or WebP photo under 5 MB.";

const startsWith = (bytes, signature, offset = 0) =>
  signature.every((b, i) => bytes[offset + i] === b);

// Returns { mime, ext } for a real JPEG / PNG / WebP, otherwise null.
async function detectPhotoType(file) {
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) {
    return { mime: "image/jpeg", ext: "jpg" };
  }
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
    return { mime: "image/png", ext: "png" };
  }
  // WebP is "RIFF" + 4 size bytes + "WEBP".
  if (startsWith(bytes, [0x52, 0x49, 0x46, 0x46]) && startsWith(bytes, [0x57, 0x45, 0x42, 0x50], 8)) {
    return { mime: "image/webp", ext: "webp" };
  }
  return null;
}

// Returns { message } when the photo is not acceptable, or { type } when it is.
export async function checkPhoto(file) {
  if (!file) return { message: "Add a photo (JPG, PNG or WebP, under 5 MB)." };
  if (file.size === 0 || file.size > MAX_BYTES) return { message: MESSAGE };
  const type = await detectPhotoType(file);
  if (!type) return { message: MESSAGE };
  return { type };
}
