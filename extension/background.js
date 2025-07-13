setInterval(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0 && tabs[0].url && tabs[0].url.startsWith('http')) {
      const url = new URL(tabs[0].url);
      const hostname = url.hostname;

      // Load Existing Data from Storage
      chrome.storage.local.get("trackingData", (result) => {
        const trackingData = result.trackingData || {};
        trackingData[hostname] = trackingData[hostname] || 0;
        trackingData[hostname] += 1;

        // Save updated data
        chrome.storage.local.set({ trackingData });

        // Check for notification (30 min limit)
        const totalSeconds = Object.values(trackingData)
          .filter((val, key) => key !== 'notified')
          .reduce((a, b) => a + b, 0);

        if (totalSeconds >= 1800 && !trackingData.notified) {
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon48.png",
            title: "Productivity Alert!",
            message: "You’ve spent more than 30 minutes browsing!"
          });
          trackingData.notified = true;
          chrome.storage.local.set({ trackingData });
        }
      });
    }
  });
}, 1000);





