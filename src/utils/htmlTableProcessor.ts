// Loads an HTML file from the specified file upload.
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

  export const extractTableFromHtml = (htmlDoc: Document): HTMLTableElement | null => {
    const targetH2Text = "Multiplayer Match Data (reverse chronological)";
    const parser = new DOMParser();
  
    // Convert htmlDoc to string and parse it again as a new Document
    const htmlDocString = new XMLSerializer().serializeToString(htmlDoc);
    const htmlDocRoot = parser.parseFromString(htmlDocString, "text/html");
    console.log("Parsed HTML Document:", htmlDocRoot);
  
    // Find the <h2> element with the specific text
    const targetH2 = Array.from(htmlDocRoot.querySelectorAll("h2")).find(
      (h2) => h2.textContent?.trim() === targetH2Text
    );
  
    if (!targetH2) {
      console.warn(`<h2> with text '${targetH2Text}' not found.`);
      return null;
    }
  
    console.log("Target H2 Element:", targetH2);
  
    // Find the next sibling element
    const nextSibling = targetH2.nextElementSibling;
    if (!nextSibling || nextSibling.tagName.toLowerCase() !== "table") {
      console.warn(`No table found immediately after <h2> with text '${targetH2Text}'.`);
      return null;
    }
  
    console.log("Next Sibling (Table):", nextSibling);
  
    // Return the table element
    return nextSibling as HTMLTableElement;
  };
  
/* export const extractTableFromHtml = (htmlDoc: Document) => {
  const targetH2Text = "Multiplayer Match Data (reverse chronological)";
  const parser = new DOMParser();
  // convert html doc to string
  const htmlDocString = new XMLSerializer().serializeToString(htmlDoc);
  const htmlDocRoot = parser.parseFromString(htmlDocString, "text/html");
  console.log(htmlDocRoot);
  // From htmlDocRoot, extract the table following the <h2> with the specified text.
  const targetH2 = htmlDocRoot.querySelector(`h2:contains('${targetH2Text}')`);
  console.log(targetH2);
  if (!targetH2) {
    console.warn(`<h2> with text '${targetH2Text}' not found.`);
    return null;
  };
  const nextSibling = targetH2.nextElementSibling;
  if (!nextSibling) {
    console.warn(`No table found immediately after <h2> with text '${targetH2Text}'.`);
    return null;
  };
  console.log(nextSibling);
  const table = nextSibling.querySelector('table');
  console.log(table);
  return table;
}  */
/* import fs from "fs";
import path from "path";
import cheerio from "cheerio";
import Papa from "papaparse";

// Loads an HTML file from the specified file upload.
const loadHtmlFromFile = async (file: File): Promise<cheerio.CheerioAPI> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const htmlContent = reader.result as string;
      resolve(cheerio.load(htmlContent));
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};

// Extracts the table following the <h2> with the specified text.
const extractTableFromHtml = ($: cheerio.CheerioAPI, targetH2Text: string): string[][] | null => {
  const targetH2 = $(`h2:contains('${targetH2Text}')`);
  if (!targetH2.length) {
    console.warn(`<h2> with text '${targetH2Text}' not found.`);
    return null;
  }

  const nextSibling = targetH2.next();
  if (nextSibling.is("table")) {
    const rows = nextSibling.find("tr");
    const tableData: string[][] = rows.map((_, row) => {
      const cells = cheerio(row).find("th, td");
      return cells.map((_, cell) => cheerio(cell).text().trim()).get();
    }).get();

    return tableData;
  } else {
    console.warn(`No table found immediately after <h2> with text '${targetH2Text}'.`);
    return null;
  }
};

// Converts the table data to a CSV string.
const convertTableToCsv = (tableData: string[][]): string => {
  if (!tableData || tableData.length === 0) {
    console.warn("No table data to export.");
    return "";
  }

  const csv = Papa.unparse({
    fields: tableData[0],
    data: tableData.slice(1),
  });

  return csv;
};

// Example function to handle file uploads and process the data.
const processUploadedFile = async (file: File, targetH2Text: string): Promise<string | null> => {
  try {
    // Load the HTML content from the uploaded file.
    const $ = await loadHtmlFromFile(file);

    // Extract the table data.
    const tableData = extractTableFromHtml($, targetH2Text);
    if (!tableData) return null;

    // Convert the table to CSV.
    const csvContent = convertTableToCsv(tableData);

    // Optionally, download the CSV file.
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "multiplayer_match_data.csv";
    link.click();
    URL.revokeObjectURL(url);

    return csvContent;
  } catch (error) {
    console.error("Error processing uploaded file:", error);
    return null;
  }
};

export default processUploadedFile;
 */