// generateSearchData.cjs
const fs = require("fs");
const path = require("path");

const pagesDir = path.join(__dirname, "src/pages");
const outputFile = path.join(__dirname, "src/data/searchData.json");

function extractSearchData(filePath) {
    const content = fs.readFileSync(filePath, "utf8");

    // Cari komentar @searchdata
    const searchDataRegex = /\/\*\*[\s\S]*?@searchdata[\s\S]*?\*\//;
    const match = content.match(searchDataRegex);

    if (!match) {
        // Fallback ke format lama
        const componentName = path.basename(filePath, '.jsx');
        const routePath = filePath
            .replace(path.join(__dirname, "src/pages"), "")
            .replace(/\\/g, "/")
            .replace(/\.jsx$/, "")
            .replace("/index", "");

        return {
            title: formatTitle(componentName),
            path: routePath || "/",
            type: "page",
            description: "",
            keywords: []
        };
    }

    // Parse data dari komentar
    const dataText = match[0];
    const result = {
        title: "",
        description: "",
        keywords: [],
        type: "page",
        chapter: "",
        path: ""
    };

    // Extract fields
    const titleMatch = dataText.match(/title:\s*(.+)/i);
    const descMatch = dataText.match(/description:\s*(.+)/i);
    const keywordsMatch = dataText.match(/keywords:\s*\[([^\]]+)\]/i);
    const typeMatch = dataText.match(/type:\s*(.+)/i);
    const chapterMatch = dataText.match(/chapter:\s*(.+)/i);
    const pathMatch = dataText.match(/path:\s*(.+)/i);

    if (titleMatch) result.title = titleMatch[1].trim();
    if (descMatch) result.description = descMatch[1].trim();
    if (keywordsMatch) {
        result.keywords = keywordsMatch[1]
            .split(',')
            .map(k => k.trim())
            .filter(k => k);
    }
    if (typeMatch) result.type = typeMatch[1].trim();
    if (chapterMatch) result.chapter = chapterMatch[1].trim();
    if (pathMatch) result.path = pathMatch[1].trim();

    return result;
}

function formatTitle(name) {
    return name
        .replace(/([A-Z])/g, " $1")
        .replace(/Index/g, "")
        .replace(/Page/g, "")
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

function generateFromPages() {
    const results = [];

    // Scan semua file .jsx di folder pages dan subfolders
    function scanDirectory(dir, basePath = "") {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                // Rekursif untuk subfolder
                scanDirectory(fullPath, `${basePath}/${file}`);
            } else if (file.endsWith('.jsx')) {
                // Extract data dari file
                const data = extractSearchData(fullPath);

                // Jika path tidak di-set di komentar, generate dari folder structure
                if (!data.path && basePath) {
                    const fileName = file.replace('.jsx', '').replace('Index', '');
                    data.path = `${basePath}${fileName ? `/${fileName}` : ''}`.toLowerCase();
                }

                // Set default title jika tidak ada
                if (!data.title) {
                    const componentName = file.replace('.jsx', '');
                    data.title = formatTitle(componentName);
                    if (basePath.includes('bab')) {
                        data.title = `Bab ${basePath.match(/bab(\d+)/)?.[1] || ''} - ${data.title}`;
                    }
                }

                results.push(data);
            }
        });
    }

    scanDirectory(pagesDir);

    // Tambahkan juga dari App.jsx untuk routes yang tidak ada di pages folder
    const appFile = path.join(__dirname, "src/App.jsx");
    if (fs.existsSync(appFile)) {
        const content = fs.readFileSync(appFile, "utf8");
        const routeRegex = /<Route\s+path="([^"]+)"\s+element={<([^}]+)>}/g;
        let match;

        while ((match = routeRegex.exec(content)) !== null) {
            const url = match[1];
            const component = match[2];

            if (url === "*" || url === "/comingsoon") continue;

            // Cek apakah route sudah ada di results
            const exists = results.find(r => r.path === url);
            if (!exists) {
                results.push({
                    title: formatTitle(component),
                    path: url,
                    type: "page",
                    description: "",
                    keywords: []
                });
            }
        }
    }

    // Sort results: bab dulu, kemudian alphabetically
    results.sort((a, b) => {
        const aIsBab = a.path.includes('/bab');
        const bIsBab = b.path.includes('/bab');

        if (aIsBab && !bIsBab) return -1;
        if (!aIsBab && bIsBab) return 1;

        return a.title.localeCompare(b.title);
    });

    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
    console.log(`✅ Generated ${results.length} search items in searchData.json`);
}

generateFromPages();