const fs = require("fs");
const path = require("path");

const appFile = path.join(__dirname, "src/App.jsx");
const outputFile = path.join(__dirname, "src/data/searchData.json");

// Format nama title dari nama komponen
function formatTitle(name) {
    return name
        .replace(/([A-Z])/g, " $1")
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

function generateFromRoutes() {
    const content = fs.readFileSync(appFile, "utf8");

    // Ambil semua Route
    const routeRegex = /<Route\s+path="([^"]+)"\s+element={<([^}]+)>}/g;

    const results = [];
    let match;

    while ((match = routeRegex.exec(content)) !== null) {
        const url = match[1];
        const component = match[2];

        if (url === "*" || url === "/comingsoon") continue; // skip catch-all

        results.push({
            title: formatTitle(component),
            path: url
        });
    }

    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
    console.log("🔥 searchData.json synced with App.jsx!");
}

generateFromRoutes();
