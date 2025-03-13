#!/usr/bin/env node
//SHEBANG
import fs from 'fs';
import path from 'path';
import cliProgress from 'cli-progress';
import { fileURLToPath } from 'url';


var bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_grey);
bar1.start(100,0)
var projectName = process.argv[2] || 'express-api'
var projectPath = path.join(process.cwd(), projectName)
bar1.update(10)
if(!fs.existsSync(projectPath)){
    fs.mkdirSync(projectPath)
}
//converting metaurl to systempath
var __filename = fileURLToPath(import.meta.url) 
var __dirname = path.dirname(__filename)



//copying templates to new folder

var templateDir = path.join(__dirname, '../templates')
var templateFiles = await fs.promises.readdir(templateDir);
for(var file of templateFiles){
   var filePath = path.join(templateDir, file)

   var stats = await fs.promises.stat(filePath)

    if(stats.isFile()){
        let content = await fs.promises.readFile(filePath)

        await fs.promises.writeFile(path.join(projectPath, file),content)
    bar1.update(10)

    }else if(stats.isDirectory()){
        await copyDirectory(filePath, path.join(projectPath, file));
    }
    bar1.update(10)
}

bar1.update(100)
bar1.stop()
console.log("")
console.log("Project created in "+projectPath)

async function copyDirectory(src, dest) {
    await fs.promises.mkdir(dest, { recursive: true });

    // Get the list of files and directories in the source folder
    const items = await fs.promises.readdir(src);
  
    for (const item of items) {
      const srcItem = path.join(src, item);
      const destItem = path.join(dest, item);
  
      const stats = await fs.promises.stat(srcItem);
      
      if (stats.isDirectory()) {
        // Recursively copy subdirectories
        await copyDirectory(srcItem, destItem);
      } else if (stats.isFile()) {
        await fs.promises.copyFile(srcItem, destItem);
      }
    }
  
}