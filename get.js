import fs from "fs";


const BASE_URL = "https://aptishienle-backend-rvw7.onrender.com/api/users/";
const AUTH_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc1NiwiZW1haWwiOiJtaW5oYW5oNjlAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU5MjM1NDg5LCJleHAiOjE3NTkyMzkwODl9.dy95fciN0i5kgfu0C_io5xve3HvdlLl-N2BeGuIdjuw"; // <-- your token
const OUTPUT_FILE = "user.json";

(async () => {
  const results = [];

  for (let i = 1; i <= 1756; i++) {
    try {
      const res = await fetch(`${BASE_URL}${i}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Origin: "https://www.aptishienle.com",
          Referer: "https://www.aptishienle.com/",
          Authorization: AUTH_TOKEN,
        },
      });

      if (!res.ok) {
        console.error(`❌ User ${i} failed: ${res.status}`);
        continue;
      }

      const data = await res.json();
      results.push(data);
      console.log(`✅ Fetched user ${i}`);
    } catch (err) {
      console.error(`⚠️ Error on user ${i}:`, err.message);
    }
  }

  // Save all users to a single JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
  console.log(`\n🎉 Saved ${results.length} users to ${OUTPUT_FILE}`);
})();