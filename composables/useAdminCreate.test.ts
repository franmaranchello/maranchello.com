import { describe, expect, it } from "vitest";
import { sortFilesByName } from "./useAdminCreate";

const file = (name: string) => new File([""], name);

describe("sortFilesByName", () => {
  it("sorts uploaded image files by filename with numeric ordering", () => {
    expect(
      sortFilesByName([file("image-10.jpg"), file("image-2.jpg"), file("image-1.jpg")]).map(
        (item) => item.name
      )
    ).toEqual(["image-1.jpg", "image-2.jpg", "image-10.jpg"]);
  });
});
