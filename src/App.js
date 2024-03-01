import React, { useState, useEffect } from 'react';

const App = () => {
  const [year, setYear] = useState('');
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');

  useEffect(() => {
    if (year) { 
      const fetchMakes = async () => {
        try {
          const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json&api_key=YOUR_API_KEY&vehicleType=car&modelyear=${year}`);
          const data = await response.json();
          setMakes(data.Results);
        } catch (error) {
          console.error(error);
        }
      };

      fetchMakes();
    }
  }, [year]);

  useEffect(() => {
    if (selectedMake && makes.some((make) => make.Make_Name === selectedMake)) {
      const fetchModels = async () => {
        try {
          const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake?format=json&api_key=YOUR_API_KEY&make=${selectedMake}&modelyear=${year}`);
          const data = await response.json();
          setModels(data.Results);
        } catch (error) {
          console.error(error);
        }
      };

      fetchModels();
    }
  }, [selectedMake, year, makes]);

  return (
    <div>
      <label htmlFor="year">Year</label>
      <select name="year" value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">Select year</option>
        {Array.from({ length: 2023 - 1995 + 1 }, (_, i) => 1995 + i).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <label htmlFor="make">Make</label>
      <select name="make" value={selectedMake} onChange={(e) => setSelectedMake(e.target.value)} disabled={!year}>
        <option value="">Select make</option>
        {makes.map((make) => (
          <option key={make.Make_Name} value={make.Make_Name}>
            {make.Make_Name}
          </option>
        ))}
      </select>

      <label htmlFor="model">Model</label>
      <select name="model" value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} disabled={!selectedMake}>
        <option value="">Select model</option>
        {models && models.map((model) => (
          <option key={model.Model_Name} value={model.Model_Name}>
            {model.Model_Name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default App;