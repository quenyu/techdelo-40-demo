import { describe, expect, it } from "vitest";
import {
  equipment,
  filterEquipment,
  formatPrice,
  getEquipmentBySlug,
} from "../src/lib/equipment";

describe("equipment catalog", () => {
  it("contains a coherent 12-unit demo fleet", () => {
    expect(equipment).toHaveLength(12);
    expect(new Set(equipment.map((item) => item.slug)).size).toBe(12);
    expect(equipment.every((item) => item.shiftPrice === item.priceHour * 8)).toBe(true);
  });

  it("filters by customer task and operational constraints", () => {
    const result = filterEquipment(equipment, {
      task: "Работать в тесном месте",
      maxPrice: 2600,
      maxMinHours: 4,
    });

    expect(result.map((item) => item.slug).sort()).toEqual([
      "bobcat-s650",
      "kubota-u55",
    ]);
  });

  it("searches in equipment names, models, and descriptions", () => {
    expect(filterEquipment(equipment, { query: "гидромолот" })[0]?.slug).toBe("jcb-3cx");
    expect(filterEquipment(equipment, { query: "XCMG" })[0]?.slug).toBe("xcmg-32");
  });

  it("resolves detail pages and formats Russian prices", () => {
    expect(getEquipmentBySlug("cat-320")?.model).toBe("CAT 320");
    expect(formatPrice(25600)).toMatch(/25\s600/);
  });
});
