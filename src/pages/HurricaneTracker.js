import React, { useEffect, useState } from 'react';

const USER_AGENT = "(yourapp.com, contact@yourapp.com)";

async function fetchWithRetry(url, options, retries = 3) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        return await response.json();
    } catch (error) {
        if (retries > 0) {
            console.log("Retrying...", retries);
            return await fetchWithRetry(url, options, retries - 1);
        } else {
            console.error("Failed to fetch after retries", error);
            return null;
        }
    }
}

const HurricaneTracker = ({ lat, lon, area }) => {
    const [forecast, setForecast] = useState(null);
    const [alerts, setAlerts] = useState(null);

    useEffect(() => {
        const options = {
            headers: {
                "User-Agent": USER_AGENT
            }
        };

        // Fetch forecast data
        async function getForecastData() {
            const pointsUrl = `https://api.weather.gov/points/${lat},${lon}`;
            const pointsData = await fetchWithRetry(pointsUrl, options);
            if (pointsData) {
                const forecastUrl = pointsData.properties.forecast;
                const forecastData = await fetchWithRetry(forecastUrl, options);
                setForecast(forecastData);
            }
        }

        // Fetch weather alerts
        async function getWeatherAlerts() {
            const alertsUrl = `https://api.weather.gov/alerts/active?area=${area}`;
            const alertsData = await fetchWithRetry(alertsUrl, options);
            setAlerts(alertsData);
        }

        getForecastData();
        getWeatherAlerts();
    }, [lat, lon, area]);

    return (
        <div className="hurricane-tracker">
            <h1>Hurricane Tracker</h1>

            {/* Forecast Section */}
            <div className="forecast">
                <h2>Forecast</h2>
                {forecast ? (
                    forecast.properties.periods.map((period, index) => (
                        <div key={index} className="forecast-period">
                            <h3>{period.name}</h3>
                            <p>Temperature: {period.temperature}°{period.temperatureUnit}</p>
                            <p>Wind: {period.windSpeed} {period.windDirection}</p>
                            <p>Details: {period.detailedForecast}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading forecast data...</p>
                )}
            </div>

            {/* Alerts Section */}
            <div className="alerts">
                <h2>Alerts</h2>
                {alerts ? (
                    alerts.features.length > 0 ? (
                        alerts.features.map((alert, index) => (
                            <div key={index} className="alert">
                                <h3>{alert.properties.event}</h3>
                                <p>Severity: {alert.properties.severity}</p>
                                <p>Effective: {new Date(alert.properties.effective).toLocaleString()}</p>
                                <p>Expires: {new Date(alert.properties.expires).toLocaleString()}</p>
                                <p>{alert.properties.description}</p>
                                <p>Instructions: {alert.properties.instruction || "N/A"}</p>
                            </div>
                        ))
                    ) : (
                        <p>No active alerts.</p>
                    )
                ) : (
                    <p>Loading alerts data...</p>
                )}
            </div>
        </div>
    );
};

export default HurricaneTracker;

