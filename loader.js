const fs = require("fs");
const path = require("path");

const plugins = [];

const pluginDir = path.join(__dirname, "plugins");

for (const file of fs.readdirSync(pluginDir)) {
    if (!file.endsWith(".js")) continue;

    try {
        const plugin = require(path.join(pluginDir, file));
        plugins.push(plugin);
    } catch (e) {
        console.error(`Failed to load plugin ${file}`, e);
    }
}

console.log(`✅ Loaded ${plugins.length} plugins`);

module.exports = plugins;