fetch("https://aptishienle-backend-rvw7.onrender.com/api/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "aptisrealtests@gmail.com",
    password: "123456",
    browser: "Browser",
    os: "Windows",
    ip: "af1f4ef345643b9ceb937fff5b1f13ae",
    deviceType: "desktop",
    screenResolution: "2048x1152",
    status: "1",
  }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("✅ Success:", data);
  })
  .catch((error) => {
    console.error("❌ Error:", error);
  });
