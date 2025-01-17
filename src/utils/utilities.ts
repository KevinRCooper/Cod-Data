import { parseHtmlFile, parseZipFile } from "./htmlTableProcessor";

export const isNumeric = (value: unknown): boolean => {
    return typeof value === "string" && /^-?\d+(\.\d+)?$/.test(value.trim());
};

export const calculateColumnWidth = (
    header: string,
    firstRowValue: unknown
): number => {
    const padding = 20;
    const baseWidth = 10;
    const headerLength = header.length;
    const valueLength = firstRowValue ? firstRowValue.toString().length : 0;
    const maxLength = Math.max(headerLength, valueLength);
    return maxLength * baseWidth + padding;
};

export const formatCellValue = (value: unknown, column: string, columnOverrides: Array<string>) => {
    if (columnOverrides.includes(column)) {
        return typeof value === "undefined" ? "" : value;
    }

    if (typeof value === "number") {
        return new Intl.NumberFormat("en-US").format(value);
    }

    return (value as string) || "";
};

export const parseFile = async (file: File): Promise<Document> => {
    if (file.name.toLowerCase().endsWith(".zip")) {
        return await parseZipFile(file);
    };

    return await parseHtmlFile(file);
};