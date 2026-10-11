import { z } from "zod";

export function readStored<T>(key: string, schema: z.ZodType<T>, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const result = schema.safeParse(JSON.parse(raw));
    return result.success ? result.data : fallback;
  } catch {
    return fallback;
  }
}

export function writeStored(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or blocked (private mode); state still works for this session.
  }
}

export const storedCartSchema = z.array(
  z.object({
    productId: z.number().int().positive(),
    size: z.string().min(1),
    color: z.string().min(1),
    quantity: z.number().int().min(1).max(99),
  }),
);

export const storedIdsSchema = z.array(z.number().int().positive());
