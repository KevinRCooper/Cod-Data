// Loads an HTML file from the specified file upload.
import JSZip from "jszip";

export const parseHtmlFile = (file: File): Promise<Document> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target?.result) {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(event.target.result as string, "text/html");
        resolve(htmlDoc);
      } else {
        reject(new Error("Could not read file"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    reader.readAsText(file);
  });
};

export const parseZipFile = (file: File): Promise<Document> => {
  return new Promise((resolve, reject) => {
    const zip = new JSZip();
    zip.loadAsync(file).then((zipFile) => {
      const htmlFiles = Object.values(zipFile.files).filter((zipEntry) =>
          zipEntry.name.endsWith(".html")
      );

      if (htmlFiles.length === 0) {
        reject(new Error("No HTML files found in ZIP archive"));
        return;
      }

      htmlFiles[0].async("string").then((htmlContent) => {
        const parser = new DOMParser();
        resolve(parser.parseFromString(htmlContent, "text/html"));
      }).catch(() => {
        reject(new Error("Error reading HTML file from ZIP archive"));
      });
    }).catch(() => {
      reject(new Error("Error reading ZIP file"));
    });
  });
};

export const extractTableFromHtml = (htmlDoc: Document): HTMLTableElement | null => {
  const targetH2Text = "Multiplayer Match Data (reverse chronological)";
  const parser = new DOMParser();

  // Convert htmlDoc to string and parse it again as a new Document
  const htmlDocString = new XMLSerializer().serializeToString(htmlDoc);
  const htmlDocRoot = parser.parseFromString(htmlDocString, "text/html");

  // Find the <h2> element with the specific text
  const targetH2 = Array.from(htmlDocRoot.querySelectorAll("h2")).find(
    (h2) => h2.textContent?.trim() === targetH2Text
  );

  if (!targetH2) {
    console.warn(`<h2> with text '${targetH2Text}' not found.`);
    return null;
  }

  // Find the next sibling element
  const nextSibling = targetH2.nextElementSibling;
  if (!nextSibling || nextSibling.tagName.toLowerCase() !== "table") {
    console.warn(`No table found immediately after <h2> with text '${targetH2Text}'.`);
    return null;
  }

  // Return the table element
  return nextSibling as HTMLTableElement;
};
