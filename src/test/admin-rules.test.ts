import { describe, it, expect } from "vitest";
import {
  filterRequests,
  initialRequests,
  validateItem,
  validateCompany,
  initialCompany,
} from "@/lib/admin/data";
describe("Admin demo rules", () => {
  it("finds Nigerian names without case sensitivity", () =>
    expect(filterRequests(initialRequests, "All", "adaeze")[0]?.name).toBe("Adaeze Okafor"));
  it("finds formatted Nigerian phone numbers", () =>
    expect(filterRequests(initialRequests, "All", "08031234567")[0]?.id).toBe("MV-1024"));
  it("keeps New, Contacted and Closed requests separate", () => {
    expect(filterRequests(initialRequests, "New", "")).toHaveLength(5);
    expect(filterRequests(initialRequests, "Contacted", "")).toHaveLength(3);
    expect(filterRequests(initialRequests, "Closed", "")).toHaveLength(2);
  });
  it("removes archived requests from active lists", () =>
    expect(
      filterRequests(
        [
          {
            ...initialRequests[0],
            id: "archived",
            name: "Adaeze",
            phone: "08031234567",
            email: "",
            business: "hire",
            time: "Today",
            message: "Bus",
            status: "New",
            archived: true,
            notes: [],
          },
        ],
        "All",
        "",
      ),
    ).toHaveLength(0));
  it("requires an item name before saving", () =>
    expect(validateItem({ name: " ", description: "" }).name).toBe("Enter an item name."));
  it("requires at least ten phone digits", () =>
    expect(validateCompany({ ...initialCompany, phone: "0803" }).phone).toBe(
      "Enter a phone number with at least 10 digits.",
    ));
  it("allows an omitted official email", () =>
    expect(validateCompany(initialCompany).email).toBe(""));
});
