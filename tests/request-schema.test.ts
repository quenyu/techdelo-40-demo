import { describe, expect, it } from "vitest";
import { requestSchema } from "../src/lib/request-schema";

const validRequest = {
  task: "Копать траншею или котлован",
  address: "Калуга, Правобережье",
  date: "2026-09-12",
  details: "Проезд шириной 2,5 метра",
  name: "Алексей",
  phone: "+7 900 000-00-00",
  consent: true,
};

describe("request flow validation", () => {
  it("accepts a complete equipment request", () => {
    expect(requestSchema.safeParse(validRequest).success).toBe(true);
  });

  it("rejects missing consent and an incomplete phone", () => {
    const result = requestSchema.safeParse({
      ...validRequest,
      phone: "123",
      consent: false,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.phone).toBeDefined();
      expect(result.error.flatten().fieldErrors.consent).toBeDefined();
    }
  });
});
