const byProductData = [
  "Head and Feet",
  "Neck",
  "Liver and Heart",
  "Gizzards",
  "Fats",
  "Intestine"
];

const tbody = document.getElementById("byProductBody");

byProductData.forEach((item, index) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${index + 1}</td>
    <td>${item}</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
  `;
  tbody.appendChild(tr);
});
