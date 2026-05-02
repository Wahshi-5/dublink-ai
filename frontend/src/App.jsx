import React, { useState } from "react";
import { Upload, Download, User, CreditCard } from "lucide-react";

export default function App() {
  const [page, setPage] = useState("login");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [fileName, setFileName] = useState("");
  const [language, setLanguage] = useState("");
  const [status, setStatus] = useState("Ready to dub your video");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setStatus("Video selected successfully");
    }
  };

  const handleDub = () => {
    if (!fileName || !language) {
      setStatus("Please select video and language first");
      return;
    }
    setStatus("DubLink AI is processing your video...");
  };

  const bgStyle = {
    minHeight: "100vh",
    fontFamily: "Arial",
    backgroundImage: "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  const cardStyle = {
    background: "rgba(0,0,0,0.75)",
    padding: "30px",
    borderRadius: "20px",
    color: "white",
    width: "420px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
  };

  if (page === "login") {
    return (
      <div style={bgStyle}>
        <div style={cardStyle}>
          <h1><User size={24} /> DubLink AI</h1>
          <p>Login to continue</p>

          <input placeholder="Email" style={{ width: "100%", padding: "10px", margin: "10px 0" }} />
          <input type="password" placeholder="Password" style={{ width: "100%", padding: "10px", margin: "10px 0" }} />

          <button style={{ width: "100%", padding: "10px" }} onClick={() => setPage("subscription")}>Login</button>
        </div>
      </div>
    );
  }

  if (page === "subscription") {
    return (
      <div style={bgStyle}>
        <div style={cardStyle}>
          <h1><CreditCard size={24} /> Plans</h1>

          <div>
            <h3>Basic - 56,000 FBu</h3>
            <button onClick={() => { setSelectedPlan("Basic"); setPage("payment"); }}>Choose</button>
          </div>

          <div style={{ marginTop: "15px" }}>
            <h3>Pro - 140,000 FBu</h3>
            <button onClick={() => { setSelectedPlan("Pro"); setPage("payment"); }}>Choose</button>
          </div>
        </div>
      </div>
    );
  }

  if (page === "payment") {
    return (
      <div style={bgStyle}>
        <div style={cardStyle}>
          <h1>💳 Payment</h1>
          <p>{selectedPlan}</p>

          <p>Lumicash: 79 XX XX XX</p>

          <input placeholder="Transaction ID" style={{ width: "100%", padding: "10px", margin: "10px 0" }} />
          <input placeholder="Full Name" style={{ width: "100%", padding: "10px", margin: "10px 0" }} />

          <button style={{ width: "100%", padding: "10px" }} onClick={() => setPage("dashboard")}>
            Confirm Payment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={bgStyle}>
      <div style={cardStyle}>
        <h1>🎬 DubLink AI</h1>

        <input type="file" onChange={handleFileChange} />
        <p>{fileName}</p>

        <select onChange={(e) => setLanguage(e.target.value)} style={{ width: "100%", padding: "10px" }}>
          <option value="">Choose language</option>
          <option>Kinyarwanda</option>
          <option>Kiswahili</option>
          <option>English</option>
        </select>

        <button style={{ width: "100%", marginTop: "10px" }} onClick={handleDub}>
          <Upload size={16} /> Dub Video
        </button>

        <p>{status}</p>

        <button style={{ width: "100%" }}>
          <Download size={16} /> Download
        </button>
      </div>
    </div>
  );
}
