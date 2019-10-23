import fs from "fs";

let filename = 'config.json';
let config = JSON.parse(fs.readFileSync(filename, 'utf-8'));

export default config;
