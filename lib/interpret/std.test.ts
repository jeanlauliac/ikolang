import { describe, it, expect } from "vitest";
import { splitListMappings } from "./std";

describe("list mappings", () => {
    it("split after the range", () => {
        const ranges = [{ startIndex: 0, endIndex: 10, originalIndex: 0 }];
        const newRanges = splitListMappings(ranges, 15, 6);

        expect(newRanges).toEqual([
            { startIndex: 0, endIndex: 10, originalIndex: 0 },
        ]);
    });

    it("split after the range, adjacent", () => {
        const ranges = [{ startIndex: 0, endIndex: 10, originalIndex: 0 }];
        const newRanges = splitListMappings(ranges, 10, 6);

        expect(newRanges).toEqual([
            { startIndex: 0, endIndex: 10, originalIndex: 0 },
        ]);
    });

    it("split in middle of a range", () => {
        const ranges = [{ startIndex: 0, endIndex: 10, originalIndex: 0 }];
        const newRanges = splitListMappings(ranges, 5, 2);

        expect(newRanges).toEqual([
            { startIndex: 0, endIndex: 5, originalIndex: 0 },
            { startIndex: 5, endIndex: 8, originalIndex: 7 },
        ]);
    });

    it("split at the end of a range", () => {
        const ranges = [{ startIndex: 0, endIndex: 10, originalIndex: 0 }];
        const newRanges = splitListMappings(ranges, 7, 10);

        expect(newRanges).toEqual([
            { startIndex: 0, endIndex: 7, originalIndex: 0 },
        ]);
    });

    it("split after the end of a range", () => {
        const ranges = [{ startIndex: 0, endIndex: 10, originalIndex: 0 }];
        const newRanges = splitListMappings(ranges, 10, 5);

        expect(newRanges).toEqual([
            { startIndex: 0, endIndex: 10, originalIndex: 0 },
        ]);
    });

    it("split an entire range", () => {
        const ranges = [{ startIndex: 0, endIndex: 10, originalIndex: 0 }];
        const newRanges = splitListMappings(ranges, 0, 10);

        expect(newRanges).toEqual([]);
    });

    it("split the beginning of the range, exactly", () => {
        const ranges = [{ startIndex: 5, endIndex: 10, originalIndex: 5 }];
        const newRanges = splitListMappings(ranges, 5, 2);

        expect(newRanges).toEqual([
            { startIndex: 5, endIndex: 8, originalIndex: 7 },
        ]);
    });

    it("split the beginning of the range", () => {
        const ranges = [{ startIndex: 5, endIndex: 10, originalIndex: 5 }];
        const newRanges = splitListMappings(ranges, 2, 6);

        expect(newRanges).toEqual([
            { startIndex: 2, endIndex: 4, originalIndex: 8 },
        ]);
    });

    it("split before the range, adjacent", () => {
        const ranges = [{ startIndex: 5, endIndex: 10, originalIndex: 5 }];
        const newRanges = splitListMappings(ranges, 2, 3);

        expect(newRanges).toEqual([
            { startIndex: 2, endIndex: 7, originalIndex: 5 },
        ]);
    });

    it("split before the range", () => {
        const ranges = [{ startIndex: 5, endIndex: 10, originalIndex: 5 }];
        const newRanges = splitListMappings(ranges, 0, 3);

        expect(newRanges).toEqual([
            { startIndex: 2, endIndex: 7, originalIndex: 5 },
        ]);
    });
});
