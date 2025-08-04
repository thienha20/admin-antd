import dayjs from "dayjs";

export function paramCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// ----------------------------------------------------------------------

export function snakeCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');
}

// ----------------------------------------------------------------------

export function sentenceCase(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function toQuery(obj: Record<string, any>): string {
  return Object.entries(obj)
    .flatMap(([key, value]) => {
      // Bỏ qua undefined và null
      if (value === undefined || value === null) return [];

      // Set → Array
      if (value instanceof Set) {
        value = Array.from(value);
      }

      // Array → joined string
      if (Array.isArray(value)) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value.join(','))}`;
      }

      // Date → format
      if (value instanceof Date) {
        const formatted = dayjs(value).format("YYYY-MM-DD HH:mm:ss");
        return `${encodeURIComponent(key)}=${encodeURIComponent(formatted)}`;
      }

      // BigInt → string
      if (typeof value === "bigint") {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`;
      }

      // Object → JSON (không phải Date/Array/Set)
      if (typeof value === "object") {
        return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;
      }

      // boolean / string / number
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");
}