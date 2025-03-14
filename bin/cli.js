#!/usr/bin/env node
//SHEBANG
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import cliProgress from 'cli-progress';
import { fileURLToPath } from 'url';
import { exec } from 'child_process'
import { ChildProcess } from 'child_process';


var execPromise = promisify(exec)
var bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.legacy);
bar1.start(100,0)
var projectName = process.argv[2] || 'express-api'
var projectPath = path.join(process.cwd(), projectName)
bar1.update(10)
if(!fs.existsSync(projectPath)){
    fs.mkdirSync(projectPath)
}
const progressInterval = setInterval(()=>{
    const progress = bar1.value + 20
    if(progress <=80){
        bar1.update(progress)
    }
},3000)


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
console.log("Installing npm modules...")

// Try to install node_modules 
try{
    var bar2 = new cliProgress.SingleBar({},cliProgress.Presets.shades_grey)
    bar2.start(100, 0)
    await execPromise('npm init -y', {cwd:projectPath}); //initalizing npm
    let node_modulesInstall = await execPromise('npm install express prisma', {cwd:projectPath})

    const progressInterval = setInterval(()=>{
        const progress = bar2.value + 20
        if(progress <=80){
            bar2.update(progress)
        }
    },1000)

    const {stdout, stderr} = await node_modulesInstall;
    clearInterval(progressInterval)
    bar2.update(100)
    bar2.stop  
    
    console.log(`stdout: ${stdout}`);
    // console.error(`stderr: ${stderr}`);
    process.exit(0)
}catch{
    bar2.stop()
    console.error('node_modules installed failed')
    process.exit(1)
}


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