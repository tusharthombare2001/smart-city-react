import React, { useState } from "react";
import axios from "axios";
import "./Hospital.css";

// Symptom Selector Component
const SymptomSelector = ({ symptoms, onChange }) => (
  <select id="symptoms" value={symptoms} onChange={onChange} required>
    <option value="">Select a symptom</option>
    {SYMPTOM_OPTIONS.map((symptom, index) => (
      <option key={index} value={symptom}>
        {symptom}
      </option>
    ))}
  </select>
);

// Disease Details Component
const DiseaseDetails = ({ disease }) => (
  <div className="disease-details">
    <h3>Disease Details</h3>
    <p>
      <strong>Name:</strong> {disease.diseaseName}
    </p>
    <p>
      <strong>Symptoms:</strong> {disease.symptoms}
    </p>
    <p>
      <strong>Treatment:</strong> {disease.treatment}
    </p>
  </div>
);

// Predefined Symptoms
const SYMPTOM_OPTIONS = [
  "cough",
  "fever",
  "headache",
  "sore throat",
  "fatigue",
  "rash",
  "nausea",
  "chest pain",
  "stomach pain",
  "joint pain",
  "swollen legs",
  "nausea,dizziness",
  "skin rash",
  "severe headache",
  "abdominal bloating",
  "shortness of breath",
  "back pain",
  "frequent urination",
  "diarrhea",
  "sore muscles",
  "sweating,chills",
  "night sweats",
  "nausea,loss of appetite",
  "red eyes",
  "dizziness,vomiting",
  "swollen glands",
  "itchy skin",
  "blurry vision",
  "frequent headaches",
  "nausea,headaches",
  "sensitivity to light",
  "irregular heartbeat",
  "nausea,abdominal pain",
  "pale skin",
  "cough,wheezing",
  "leg cramps",
  "weight loss",
  "fever,body aches",
];

const Hospital = () => {
  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse(null);
    setLoading(true);

    try {
      const res = await axios.get(`http://localhost:8080/api/disease/${symptoms}`);
      if (res.data) {
        setResponse(res.data);
      } else {
        setError("No disease information found for the selected symptoms.");
      }
    } catch (err) {
      setError("Failed to fetch disease information. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSymptoms("");
    setResponse(null);
    setError("");
  };

  return (
    <div className="chatbot-container">
      <h2>Chatbot</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="symptoms">Select Symptoms:</label>
        <SymptomSelector
          symptoms={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Loading..." : "Get Disease"}
        </button>
        <button type="button" className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </form>

      {/* Render Disease Details */}
      {response && <DiseaseDetails disease={response} />}

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Hospital;
