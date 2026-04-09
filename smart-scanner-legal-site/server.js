const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");

app.use(express.static(path.join(__dirname, "public")));

function sendView(res, fileName) {
  return res.sendFile(path.join(__dirname, "views", fileName));
}

app.get("/", (req, res) => {
  sendView(res, "home.html");
});

app.get("/privacy", (req, res) => {
  sendView(res, "privacy.html");
});

app.get("/terms", (req, res) => {
  sendView(res, "terms.html");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    ok: true,
    app: "Smart Scanner Legal Site",
    timestamp: new Date().toISOString()
  });
});

app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Page Not Found - Smart Scanner</title>
      <style>
        body {
          margin: 0;
          font-family: Inter, Arial, sans-serif;
          background: #0b1020;
          color: #e9eefc;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 24px;
        }
        .card {
          max-width: 640px;
          width: 100%;
          background: #121933;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 32px;
          text-align: center;
        }
        h1 {
          margin-top: 0;
          font-size: 2rem;
        }
        p {
          color: #b8c2dd;
          line-height: 1.7;
        }
        a {
          color: #8fb4ff;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>404 — Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <p><a href="/">Return to Smart Scanner</a></p>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Smart Scanner site running on http://localhost:${PORT}`);
});