// sum.test.ts
import { expect, describe, it, vi, beforeEach, afterEach } from "vitest";
import { parseHtmlFile } from "../../src/utils/htmlTableProcessor";

describe("parseHtmlFile", () => {
  let mockFileReaderInstances: { readAsText: vi.Mock; onload: ((event: any) => void) | null; onerror: ((event: any) => void) | null }[] = [];

  beforeEach(() => {
    // Mock the FileReader
    global.FileReader = vi.fn().mockImplementation(() => {
      const instance = {
        readAsText: vi.fn(),
        onload: null,
        onerror: null,
      };
      mockFileReaderInstances.push(instance);
      return instance;
    }) as unknown as typeof FileReader;
  });

  afterEach(() => {
    vi.resetAllMocks();
    mockFileReaderInstances = [];
  });

  it("should parse the HTML file and extract its content", async () => {
    const sampleHtmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <title>Sample HTML</title>
      </head>
      <body>
        <h1>Hello, Vitest!</h1>
      </body>
      </html>
    `;

    const file = new File([sampleHtmlContent], "sample.html", { type: "text/html" });

    // Simulate FileReader behavior
    const mockFileReader = mockFileReaderInstances[0];
    mockFileReader.readAsText.mockImplementation(() => {
      if (mockFileReader.onload) {
        mockFileReader.onload({ target: { result: sampleHtmlContent } });
      }
    });

    const result = await parseHtmlFile(file);

    expect(result.querySelector("title")?.textContent).toBe("Sample HTML");
    expect(result.querySelector("h1")?.textContent).toBe("Hello, Vitest!");
  });

  it("should reject if the file cannot be read", async () => {
    const file = new File([""], "empty.html", { type: "text/html" });

    // Simulate FileReader behavior for error
    const mockFileReader = mockFileReaderInstances[0];
    mockFileReader.readAsText.mockImplementation(() => {
      if (mockFileReader.onerror) {
        mockFileReader.onerror(new ProgressEvent("error"));
      }
    });

    await expect(parseHtmlFile(file)).rejects.toThrow("Error reading file");
  });
});
