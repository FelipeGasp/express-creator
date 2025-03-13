#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

var projectName = process.argv[2] || 'express-api'
var projectPath = path.join(process.cwd(), projectName)

if(!fs.existsSync(projectPath)){
    fs.mkdirSync(projectPath)
}

//copying templates to new folder

var templateDir = path.join(import.meta.url, '../templates')
var templateFiles = await fs.promises.readdir(templateDir);

for(var file of templateFiles){
    let content = await fs.promises.readFile(path.join(templateDir, file))
    await fs.promises.writeFile(path.join(projectPath, file), content)
}

console.log("Project created in "+projectPath)