// generateSearchData.cjs
const fs = require("fs");
const path = require("path");

const pagesDir = path.join(__dirname, "src/pages");
const publicOutputFile = path.join(__dirname, "public/data/searchData.json");
const srcOutputFile = path.join(__dirname, "src/data/searchData.json");

// Format nama title dari nama komponen
function formatTitle(name) {
    return name
        .replace(/([A-Z])/g, " $1")
        .replace(/Index/g, "")
        .replace(/Page/g, "")
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Extract data dari komentar @searchdata
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

// Fungsi scan directory recursive
function scanDirectory(dir, basePath = "", results) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Rekursif untuk subfolder
            scanDirectory(fullPath, `${basePath}/${file}`, results);
        } else if (file.endsWith('.jsx')) {
            // Extract data dari file
            const data = extractSearchData(fullPath);

            // Jika path tidak di-set di komentar, generate dari folder structure
            if (!data.path && basePath) {
                const fileName = file.replace('.jsx', '').replace('Index', '');
                data.path = `${basePath}${fileName ? `/${fileName}` : ''}`.toLowerCase();

                // Clean up path
                if (data.path.endsWith('/index')) {
                    data.path = data.path.replace('/index', '');
                }
                if (data.path.startsWith('//')) {
                    data.path = data.path.substring(1);
                }
            }

            // Set default title jika tidak ada
            if (!data.title) {
                const componentName = file.replace('.jsx', '');
                data.title = formatTitle(componentName);
                if (basePath.includes('bab')) {
                    const babMatch = basePath.match(/bab(\d+)/i);
                    if (babMatch) {
                        data.title = `Bab ${babMatch[1]} - ${data.title}`;
                    }
                }
            }

            results.push(data);
        }
    });
}

// Fungsi utama generate data
function generateFromPages() {
    const results = [];

    // Scan semua file .jsx di folder pages dan subfolders
    scanDirectory(pagesDir, "", results);

    // Tambahkan juga dari App.jsx untuk routes yang tidak ada di pages folder
    const appFile = path.join(__dirname, "src/App.jsx");
    if (fs.existsSync(appFile)) {
        const content = fs.readFileSync(appFile, "utf8");

        // Regex untuk match routes
        const routeRegex = /<Route\s+path="([^"]+)"\s+element={<([^}]+)>}/g;
        let match;

        while ((match = routeRegex.exec(content)) !== null) {
            const url = match[1];
            const component = match[2];

            // Skip catch-all routes
            if (url === "*" || url === "/comingsoon" || url.includes(":")) continue;

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
        const aIsBab = a.path.includes('/bab') || a.type === 'chapter';
        const bIsBab = b.path.includes('/bab') || b.type === 'chapter';

        if (aIsBab && !bIsBab) return -1;
        if (!aIsBab && bIsBab) return 1;

        // Prioritize home page
        if (a.path === '/') return -1;
        if (b.path === '/') return 1;

        return a.title.localeCompare(b.title);
    });

    // Buat folder public/data jika belum ada
    const publicDataDir = path.dirname(publicOutputFile);
    if (!fs.existsSync(publicDataDir)) {
        fs.mkdirSync(publicDataDir, {
            recursive: true
        });
    }

    // Buat folder src/data jika belum ada
    const srcDataDir = path.dirname(srcOutputFile);
    if (!fs.existsSync(srcDataDir)) {
        fs.mkdirSync(srcDataDir, {
            recursive: true
        });
    }

    // Write to both locations
    fs.writeFileSync(publicOutputFile, JSON.stringify(results, null, 2));
    fs.writeFileSync(srcOutputFile, JSON.stringify(results, null, 2));

    console.log(`✅ Generated ${results.length} search items`);
    console.log(`📁 Public folder: ${publicOutputFile}`);
    console.log(`📁 Source folder: ${srcOutputFile}`);
    console.log(`📊 Sample data:`);
    results.slice(0, 3).forEach(item => {
        console.log(`   • ${item.title} (${item.path})`);
    });
}

// Jalankan generator
try {
    generateFromPages();
    console.log('🎉 Search data generated successfully!');
} catch (error) {
    console.error('❌ Error generating search data:', error);
    process.exit(1);
}