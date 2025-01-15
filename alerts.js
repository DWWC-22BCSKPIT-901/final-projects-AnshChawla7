// Function to fetch and display GDACS alerts
async function fetchGDACSAlerts() {
  const proxyUrl = "https://api.allorigins.win/get?url="; // Use proxy to avoid CORS
  const gdacsUrl = encodeURIComponent("https://www.gdacs.org/xml/rss.xml");

  try {
    // Fetch the RSS feed
    const response = await fetch(`${proxyUrl}${gdacsUrl}`);
    const result = await response.json();

    // Parse the XML content
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(result.contents, "text/xml");

    // Extract relevant data
    const items = xmlDoc.querySelectorAll("item");
    const alerts = Array.from(items).map((item) => ({
      title: item.querySelector("title")?.textContent,
      description: item.querySelector("description")?.textContent,
      link: item.querySelector("link")?.textContent,
      pubDate: item.querySelector("pubDate")?.textContent,
    }));

    // Render the alerts on the page
    const alertsContainer = document.getElementById("alerts-container");
    alertsContainer.innerHTML = ""; // Clear previous alerts

    alerts.forEach((alert) => {
      const alertCard = `
        <div class="alert-card">
          <h3>${alert.title}</h3>
          <p>${alert.description}</p>
          <a href="${alert.link}" target="_blank">Read more</a>
          <p class="pub-date">${new Date(alert.pubDate).toLocaleString()}</p>
        </div>
      `;
      alertsContainer.innerHTML += alertCard;
    });
  } catch (error) {
    console.error("Error fetching GDACS alerts:", error);
    const alertsContainer = document.getElementById("alerts-container");
    alertsContainer.innerHTML = `<p class="error">Failed to load alerts. Please try again later.</p>`;
  }
}

// Call the function on page load
fetchGDACSAlerts();
