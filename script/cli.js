
import semver from "semver";
import achiver from "archiver";
import fs from "fs";
import path from "path"
import * as url from 'url';
import {Command} from "commander";
import ora from "ora-classic"
import inquirer from "inquirer";
const __dirname = url.fileURLToPath(new URL('../', import.meta.url));


function buildZip(){
  const buildDir = path.join(__dirname, "build");
  if(!fs.existsSync(buildDir)){ fs.mkdirSync(buildDir)} else{
    fs.readdirSync(buildDir).forEach((file) => {
      fs.rmSync(path.join(buildDir, file), { recursive: true, force: true });
    });
  };
  fs.readdirSync(__dirname).forEach((file) => { 
    const filepath = path.join(__dirname, file);
    const zip=achiver("zip", { zlib: { level: 9 } });
    const stat=fs.statSync(filepath);
    if(!stat.isDirectory()) return;
    const hasBoot=fs.readdirSync(file).includes("boot.json")
    if(!hasBoot) return;
    const boot = JSON.parse(fs.readFileSync(path.join(file, "boot.json"), "utf8"));
    if(boot.modVersionJs){
      let modVersionJs = fs.readFileSync(path.join(file, boot.modVersionJs.file), "utf8");
      const version ='"'+boot.version+'"'
      modVersionJs = modVersionJs.replace(new RegExp(boot.modVersionJs.regex,"gi"),"$1 "+version);

      console.log(modVersionJs);
      fs.writeFileSync(path.join(file, boot.modVersionJs.file), modVersionJs);
    }
    const output = fs.createWriteStream(path.join("build", `${file}.zip`));
    zip.pipe(output);
    zip.directory(file, false);
    zip.finalize();
  });
  
}

function getBootJson(directory){
  const dir =path.join(__dirname,directory.replace(/\\/g, "/") ).replace(/["'"]/g, "");
  console.log(dir);
  if( !fs.existsSync(dir) ) return null;
  const filepath = path.join(dir, "boot.json");
  if( !fs.existsSync(filepath) ) return null;
  const boot = JSON.parse(fs.readFileSync(filepath, "utf8"));
  return boot;
}

function setBootVersionMajor(directory){
  const boot = getBootJson(directory);
  if(!boot) return null;
  const result = semver.inc(boot.version, "major")
  if(result) {
    boot.version =result;
  }
  fs.writeFileSync(path.join(directory, "boot.json"), JSON.stringify(boot,null,2));
  return boot;
}
function setBootVersionMinor(directory){
  
  const boot = getBootJson(directory);
  if(!boot) return null;
  boot.version = semver.inc(boot.version, "minor");
  fs.writeFileSync(path.join(directory, "boot.json"), JSON.stringify(boot, null, 2));
  return boot;
}
function setBootVersionPatch(directory){
  
  const boot = getBootJson(directory);
  if(!boot) return null;
  boot.version = semver.inc(boot.version, "patch");
  fs.writeFileSync(path.join(directory, "boot.json"), JSON.stringify(boot, null, 2));
  return boot;
}
function getPackageConfig(){
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf8"));
  return packageJson;
}
const program = new Command();

program.name("iCandy and Robot Mod Manager").description("iCandy and Robot Mod Manager").version(getPackageConfig().version);
program.command("build").description("Builds the mod").action(buildZip);
program.command("major <directory>").description("Sets the version of the mod").action(setBootVersionMajor);
program.command("minor <directory>").description("Sets the version of the mod").action(setBootVersionMinor);
program.command("patch <directory>").description("Sets the version of the mod").action(setBootVersionPatch);
// select folder mod list
program.command("list").description("Lists all mods").action(()=>{
  const mods = fs.readdirSync(__dirname).filter((file) => {
    const filepath = path.join(__dirname, file);
    const stat=fs.statSync(filepath);
    if(!stat.isDirectory()) return false;
    const hasBoot=fs.readdirSync(file).includes("boot.json")
    if(!hasBoot) return false;
    return true;
  });
  console.log(mods);
}
);
program.command("version <directory>").description("Gets the version of the mod").action((directory)=>{
  const boot = getBootJson(directory);
  if(!boot) return null;
  console.log(boot.version);
});
program.command("version").description("Gets the version of the mod").action(()=>{
  const packageJson = getPackageConfig();
  console.log(packageJson.version);
});
program.command("update").description("Updates the mod manager").action(()=>{
  const mods = fs.readdirSync(__dirname).filter((file) => {
    const filepath = path.join(__dirname, file);
    const stat=fs.statSync(filepath);
    if(!stat.isDirectory()) return false;
    const hasBoot=fs.readdirSync(file).includes("boot.json")
    if(!hasBoot) return false;
    return true;
  });
  inquirer.prompt([
    {
      type:"list",
      name:"getMod", 
      message:"选择Mod需要更新版本?",
      choices:mods
    }
  ]).then(({getMod})=>{
    let boot = getBootJson(getMod);
    inquirer.prompt([
      {
        type:"list",
        name:"updateModVersion", 
        message:`当前版本${boot.version}，更新版本（Major +1.0.0，Minor +0.1.0，Patch +0.0.1）?`,
        choices:["major", "minor", "patch"]
      }]).then(({updateModVersion})=>{
     
        console.log(`更新${getMod}版本${updateModVersion}`);
      switch(updateModVersion){
        case "major":
          boot =setBootVersionMajor(getMod);
          break;
        case "minor":
          boot = setBootVersionMinor(getMod);
          break;
        case "patch":
          boot = setBootVersionPatch(getMod);
          break;
      }
      console.log(`更新版本${boot.version}`);
      buildZip();
      
    });
  });
}
);
program.parse(process.argv);

