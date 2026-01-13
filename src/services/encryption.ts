/**
 * Simple encryption service for URL data.
 * Uses XOR cipher with a salt - not cryptographically secure,
 * but prevents casual URL inspection from revealing roles.
 */

const CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

/**
 * Generates a random salt for encryption
 */
export function generateSalt(length: number = 8): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += CHARSET.charAt(Math.floor(Math.random() * CHARSET.length));
  }
  return result;
}

/**
 * Simple XOR encryption using a key derived from salt
 */
function xorEncrypt(text: string, salt: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const keyCode = salt.charCodeAt(i % salt.length);
    result += String.fromCharCode(charCode ^ keyCode);
  }
  return result;
}

/**
 * Encode string to base64url (URL-safe base64)
 */
function toBase64Url(str: string): string {
  // Convert to UTF-8 bytes then base64
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  const base64 = btoa(binary);
  // Make URL-safe
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Decode from base64url
 */
function fromBase64Url(str: string): string {
  // Restore standard base64
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  // Add padding if needed
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

/**
 * Encrypt and encode data for URL
 * Returns: salt.encryptedData
 */
export function encryptForUrl<T>(data: T): string {
  const json = JSON.stringify(data);
  const salt = generateSalt();
  const encrypted = xorEncrypt(json, salt);
  const encoded = toBase64Url(encrypted);
  return `${salt}.${encoded}`;
}

/**
 * Decode and decrypt data from URL
 */
export function decryptFromUrl<T>(encoded: string): T | null {
  try {
    const dotIndex = encoded.indexOf('.');
    if (dotIndex === -1) return null;

    const salt = encoded.substring(0, dotIndex);
    const encryptedBase64 = encoded.substring(dotIndex + 1);
    const encrypted = fromBase64Url(encryptedBase64);
    const json = xorEncrypt(encrypted, salt); // XOR is symmetric
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}
