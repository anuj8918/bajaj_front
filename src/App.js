import React, { useState } from "react";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");

  const BASE_BACKEND_URL = "https://back-production-e40e.up.railway.app/bfhl";

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data) throw new Error("Invalid JSON format");
      setError("");

      const res = await fetch(BASE_BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedInput),
      });

      const result = await res.json();
      setResponse(result);
    } catch (err) {
      setError(err.message || "Invalid JSON input");
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const selectedData = {};
    if (selectedOptions.includes("Alphabets"))
      selectedData.alphabets = response.alphabets;
    if (selectedOptions.includes("Numbers"))
      selectedData.numbers = response.numbers;
    if (selectedOptions.includes("Highest Lowercase Alphabet"))
      selectedData.highestLowercaseAlphabet =
        response.highest_lowercase_alphabet;

    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(selectedData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div>
      <h1>JSON Processor</h1>
      <textarea
        rows="5"
        cols="50"
        placeholder='Enter JSON (e.g., {"data": ["A", "1", "c"]})'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {response && (
        <div>
          <h2>Filter Options</h2>
          <select
            multiple
            value={selectedOptions}
            onChange={(e) =>
              setSelectedOptions(Array.from(e.target.selectedOptions, (option) => option.value))
            }
          >
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest Lowercase Alphabet">
              Highest Lowercase Alphabet
            </option>
          </select>
          {renderResponse()}
        </div>
      )}
    </div>
  );
};

export default App;
