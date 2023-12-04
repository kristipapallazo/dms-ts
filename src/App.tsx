import React from 'react';
import './App.css';

function App() {
  const fetchData = async () => {
    const STATIC_URL = "http://localhost:8101/dms-app/all-scripts";
    try {
      const app = "test"; // Replace with your app name

      const url = `${STATIC_URL}/${app}`
      const devel = true
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers if needed
        },
        body: JSON.stringify({ devel }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      // Handle the response data here
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors here
    }
  };
  return (
    <div className="app">
      <button onClick={fetchData}>request</button>
    </div>
  );
}

export default App;
