"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://aptishienle-backend-rvw7.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
            Origin: "https://www.aptishienle.com",
            Referer: "https://www.aptishienle.com/",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            name: username,
            browser: "Browser",
            os: "Windows",
            ip: "FUsra2rWKEofkZeIC4yWytE58sMIihvo9",
            deviceType: "desktop",
            screenResolution: "2048x1152",
            status: "1",
          }),
        }
      );
      const data = await res.json();
      console.log("Response:", data);
      alert("Register done! Check console for response.");
    } catch (err) {
      console.error("Error:", err);
      alert("Error occurred!");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "8px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 20,
        border: "1px solid #eee",
        borderRadius: 8,
      }}
    >
      <h2 style={{ textAlign: "center" }}>Register</h2>
      <input
        style={inputStyle}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={inputStyle}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={inputStyle}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={buttonStyle} disabled={loading} onClick={handleRegister}>
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
}
