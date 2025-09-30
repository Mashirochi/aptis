fetch("https://aptishienle-backend-rvw7.onrender.com/api/auth/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
    Origin: "https://www.aptishienle.com",
    Referer: "https://www.aptishienle.com/",
  },
  body: JSON.stringify({
    email: "aptislearner@gmail.com",
    password: "123456",
    name: "Mai Chiến Thắng",
    browser: "Browser",
    os: "Windows",
    ip: "af1f4ef345643b9ceb937fff5b1f13ae",
    deviceType: "desktop",
    screenResolution: "2048x1152",
    status: "1",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log("Response:", data))
  .catch((err) => console.error("Error:", err));
