import { reduceCalculation } from "./App";

describe("check value calculation", () => {
  it("25*16/10+8/2+7*4*3/5*6", () => {
    expect(reduceCalculation("25*16/10+8/2+7*4*3/5*6")).toBe("144.8");
  });

  it("50*20/30*10-30-40", () => {
    expect(reduceCalculation("50*20/30*10-30-40")).toBe("263.33333333333337");
  });

  it("0/10+890/0*2+50/25", () => {
    expect(reduceCalculation("0/10+890/0*2+50/25")).toBe("Infinity");
  });

  it("43+40/1+80/10/20/30+50/20", () => {
    expect(reduceCalculation("43+40/1+80/10/20/30+50/20")).toBe("85.51333333333334");
  });
});
