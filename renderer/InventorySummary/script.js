document.addEventListener("DOMContentLoaded", () => {
  const data = {
    product: [
      ["FROZEN CHICKEN", "KG", 0, 0, 0, 0, 0, 0, 0],
      ["WHOLE CHICKEN", "KG", 0, 0, 0, 0, 0, 0, 0],
      ["REJECTED CUT 4", "KG", 0, 0, 0, 0, 0, 0, 0],
      ["CUT 10" , "KG", 0, 0, 0, 0, 0, 0, 0],
      ["CUT 8", "KG", 0, 0, 0, 0, 0, 0, 0],
      ["CUT 9", "CR", "KG", 0, 0, 0, 0, 0, 0, 0],
    ],
    processed: [
      ["Breast Strips", "KG", 0, 0, 0, 0, 0, 0, 0],
      ["Breast Filet", "KG", 0, 0, 0, 0, 0, 0, 0],
      ["Bum Bum", "KG", 0, 11.89, 0, 21, 0, 0, -9.2],
      ["Special Filet", "KG", 0, 0, 0, 0, 0, 0, 0],
      ["Back Bone", "KG", 0, 1205.2, 0, 0, 0, 0, 0],
    ],
    parts: [
      ["FAT", "KG", 0, 106.83, 0, 0, 0, 0, 106.83],
      ["GIZZARD", "KG", 108.63, 281.00, 0, 0, 0, 0, 49.00],
      ["HEAD & FEET", "KG", 0, 1024.66, 0, 0, 0, 0, 1024.66],
      ["HEART", "KG", 70.18, 0, 0, 0, 0, 0, 70.18],
      ["LIVER", "KG", 0, 332.95, 0, 0, 0, 0, 332.95],
    ],
    details: [
      ["1.00KG - 1.05KG", "KG", 0, 0, 0, 0, 0, 0, 0],
      ["1.05KG - 1.10KG", "KG", 0, 0, 0, 0, 0, 0, 0],
      ["1.20KG - 1.25KG", "KG", 0, 0, 0, 0, 0, 0, 0],
      ["1.30KG - 1.35KG", "KG", 0, 0, 0, 0, 0, 0, 0],
      ["1.40KG - 1.45KG", "KG", 0, 0, 0, 0, 0, 0, 0],
    ],
  };

  const headers = [
    "PRODUCT", "UNIT", "OPENING (KG)", "INFLOW", "RETURN KG", "ADJUSTMENT", "SALES/TRANSFER KG", "SPOILT KG", "CLOSING KG"
  ];

  const createTable = (id, rows) => {
    const table = document.getElementById(id);
    let thead = "<thead><tr>" + headers.map(h => `<th>${h}</th>`).join("") + "</tr></thead>";
    let tbody = "<tbody>" +
      rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("") +
      "</tbody>";
    table.innerHTML = thead + tbody;
  };

  createTable("product-table", data.product);
  createTable("processed-table", data.processed);
  createTable("parts-table", data.parts);
  createTable("details-table", data.details);
});
