const addRecordBtn = document.getElementById('addRecordBtn');
const summaryBody = document.getElementById('summaryBody');


let totalQuantity = 0;
let totalWeight = 0;
let totalRatio = 0;
// Function to fetch and render production records
const fetchAndRenderRecords = async () => {
  try {
    const getResponse = await fetch('https://zaf-farm.onrender.com/production/records');
    const data = await getResponse.json();

    if (!getResponse.ok) {
      throw new Error(data.message || "Failed to fetch records");
    }

    summaryBody.innerHTML = ""; // clear existing rows

    

    data.forEach((record, index) => {
      const ratioValue = parseFloat(record.ratio); // assuming backend returns ratio as a number or "xx%"
      const numericRatio = isNaN(ratioValue) ? parseFloat(record.ratio.replace('%', '')) : ratioValue;

      totalQuantity += Number(record.quantity);
      totalWeight += Number(record.weight);
      totalRatio += numericRatio;

      const ratioFormatted = record.ratio.toString().includes('%') ? record.ratio : numericRatio.toFixed(2) + '%';

      const row = `
        <tr>
          <td>${index + 1}</td>
          <td>${record.category}</td>
          <td>${record.quantity}</td>
          <td>${record.weight}</td>
          <td>${ratioFormatted}</td>
        </tr>
      `;
      summaryBody.insertAdjacentHTML('beforeend', row);
    });

    // Update total fields
    document.getElementById("totalQuantity").textContent = totalQuantity;
    document.getElementById("totalWeight").textContent = totalWeight;
    const avgRatio = data.length ? (totalRatio / data.length).toFixed(2) : 0;
    document.getElementById("totalRatio").textContent = `${avgRatio}%`;

  } catch (error) {
    console.error("Error:", error.message);
    alert("Something went wrong while fetching records.");
  }
};


// Call on page load
window.addEventListener('DOMContentLoaded', fetchAndRenderRecords);

// Add new record
addRecordBtn.addEventListener('click', async () => {
  const category = document.getElementById('category').value;
  const quantity = parseFloat(document.getElementById('quantity').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const dressedWeight = parseFloat(document.getElementById('dressedWeightt').value);

  if (!category || isNaN(quantity) || isNaN(weight) || isNaN(dressedWeight)) {
    alert("Please fill all fields with valid numbers.");
    return;
  }

  try {
    // Send data to backend
    const postResponse = await fetch('https://zaf-farm.onrender.com/production/record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category, quantity, weight, dressedWeight }),
    });

    if (!postResponse.ok) {
      const error = await postResponse.json();
      throw new Error(error.message || "Failed to save record");
    }

    // Fetch and re-render updated data
    await fetchAndRenderRecords();

    // Clear input fields
    document.getElementById('category').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('dressedWeightt').value = '';

  } catch (error) {
    console.error("Error:", error.message);
    alert("Something went wrong. Please try again.");
  }
});


const liveInput = document.getElementById("liveWeight");
const dressedInput = document.getElementById("dressedWeight");
const retWt = document.getElementById("retWt");
const avgLiveWeight = document.getElementById("avgLiveWeight");

function calculate() {
  const live = parseFloat(liveInput.value) || 0;
  const dressed = parseFloat(dressedInput.value) || 0;

  // Return Weight %
  const ret = live ? (dressed / live).toFixed(2) : 0;
  retWt.textContent = `${ret}%`;

  
  const avg = totalQuantity ? (live / totalQuantity).toFixed(2) : 0;
  avgLiveWeight.textContent = avg;
}

liveInput.addEventListener("input", calculate);
dressedInput.addEventListener("input", calculate);
