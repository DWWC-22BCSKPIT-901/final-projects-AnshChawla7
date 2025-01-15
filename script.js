const API_KEY = 'your_openweathermap_api_key'; // Replace with your API key
const API_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=30.7333&lon=76.7794&exclude=current,minutely,hourly,daily&appid=${API_KEY}`;

async function fetchAlerts() {
  const alertsContainer = document.getElementById('alerts');
  alertsContainer.innerHTML = '<p>Loading disaster alerts...</p>';
  
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.alerts && data.alerts.length > 0) {
      const alertsHTML = data.alerts.map(alert => `
        <div class="alert">
          <h3>${alert.event}</h3>
          <p>${alert.description}</p>
          <p><strong>Effective:</strong> ${new Date(alert.start * 1000).toLocaleString()}</p>
          <p><strong>Expires:</strong> ${new Date(alert.end * 1000).toLocaleString()}</p>
        </div>
      `).join('');
      alertsContainer.innerHTML = alertsHTML;
    } else {
      alertsContainer.innerHTML = '<p>No active alerts at the moment.</p>';
    }
  } catch (error) {
    console.error('Error fetching alerts:', error);
    alertsContainer.innerHTML = '<p>Failed to load alerts. Please try again later.</p>';
  }
}

// Fetch alerts on page load
fetchAlerts();
