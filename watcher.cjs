const chokidar = require("chokidar");
const {
    exec
} = require("child_process");

console.log("👀 Watching src/pages for changes...");

chokidar.watch("./src/pages").on("all", () => {
    console.log("🔄 Detected change. Regenerating search data...");
    exec("node generateSearchData.cjs", (err, stdout) => {
        if (err) return console.error(err);
        console.log(stdout);
    });
});
