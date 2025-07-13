function displayDateAndTotalTime(data) {
  const dateElement = document.getElementById("currentDate");
  const totalTimeElement = document.getElementById("totalTime");
  const siteListElement = document.getElementById("siteList");

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  dateElement.textContent = formattedDate;

  const totalSeconds = Object.values(data).reduce((a, b) => a + b, 0);
  const totalMinutes = (totalSeconds / 60).toFixed(2);
  totalTimeElement.textContent = `${totalMinutes} min`;

  // Show Site-wise Time Spent (Except notified flag)
  siteListElement.innerHTML = '';
  Object.entries(data).forEach(([site, seconds]) => {
    if (site !== 'notified') {
      const minutes = (seconds / 60).toFixed(2);
      const item = document.createElement('li');
      item.textContent = `${site} : ${minutes} min`;
      siteListElement.appendChild(item);
    }
  });
}

chrome.storage.local.get("trackingData", (data) => {
  const tracking = data.trackingData || {};
  if (Object.keys(tracking).length > 0) {
    displayDateAndTotalTime(tracking);
  } else {
    document.getElementById("totalTime").textContent = "No Data";
  }
});

document.getElementById("resetData").addEventListener("click", () => {
  chrome.storage.local.remove("trackingData", () => {
    location.reload();
  });
});

const toggle = document.getElementById("darkModeToggle");
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", toggle.checked);
});








