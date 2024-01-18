
import semver from "semver";
import achiver from "archiver";
import fs from "fs";
import path from "path"
import * as url from 'url';
import { Command } from "commander";
import ora from "ora-classic"
import * as glob from "glob";
import inquirer from "inquirer";
import { cwd } from "process";
const __dirname = url.fileURLToPath(new URL('../', import.meta.url));

const modScriptJson = [
	"styleFileList",
	"scriptFileList_earlyload",
	"scriptFileList_inject_early",
	"scriptFileList_preload",
	"scriptFileList",
	"tweeFileList",
	"imgFileList",
	"additionFile"
]

function buildZip() {
	const buildDir = path.join(__dirname, "build");
	if (!fs.existsSync(buildDir)) { fs.mkdirSync(buildDir) } else {
		fs.readdirSync(buildDir).forEach((file) => {
			fs.rmSync(path.join(buildDir, file), { recursive: true, force: true });
		});
	};
	fs.readdirSync(__dirname).forEach((file) => {
		const filepath = path.join(__dirname, file);
		const zip = achiver("zip", { zlib: { level: 9 } });
		const stat = fs.statSync(filepath);
		if (!stat.isDirectory()) return;
		const hasBoot = fs.readdirSync(file).includes("boot.json")
		if (!hasBoot) return;
		const boot = getBootJson(file);
		if ("modPacker" in boot) {
			const modPacker = boot.modPacker;

			console.log(modPacker?.modVersionJs?.file);

			if(modPacker?.modVersionJs?.file){
				let modVersionJs = fs.readFileSync(path.join(file, modPacker.modVersionJs.file), "utf8");
				const version = '"' + boot.version + '"'
				modVersionJs = modVersionJs.replace(new RegExp(modPacker.modVersionJs.regex, "gi"), "$1 " + version);

				fs.writeFileSync(path.join(file, modPacker.modVersionJs.file), modVersionJs);
			}
			
			if ("modScriptFolder" in modPacker) {
				const modScriptFolder = modPacker.modScriptFolder;
				for (const modScript of modScriptJson) {
					if (!(modScript in modScriptFolder)) continue;
					if (!modScriptFolder[modScript]) continue;
					const modScriptFolderPath = modScriptFolder[modScript]
					let filepathList: string[] = [];
					switch(typeof modScriptFolderPath){
						case "string":
							console.log(modScriptFolderPath);
							filepathList = glob.sync(modScriptFolderPath,{
								"cwd": filepath,
							});
							break;
						case "object":
							if(Array.isArray(modScriptFolderPath)){
								filepathList = glob.sync(modScriptFolderPath,{cwd: filepath});
								break;
							}
							const options = Object.assign({cwd: filepath}, modScriptFolderPath.options);
							filepathList = glob.sync(modScriptFolderPath.glob, options);
							break;
					}
				
					filepathList = filepathList.map((filepathItem)=>path.relative(filepath, filepathItem).replace(/\\/gim,"/").replace(/^\.\.\//,"").normalize()).sort();
					console.log(filepathList);	
					boot[modScript] = filepathList;
				}
			}
		}
		
		if (boot.build){
			boot.build = (parseInt(boot.build) + 1).toString();
		}
		
		// save boot.json
		fs.writeFileSync(path.join(file, "boot.json"), JSON.stringify(boot, null, 2));

		const output = fs.createWriteStream(path.join("build", `${file} ver${boot.version}${boot.build ? ' build_' + boot.build : ''}.zip`));
		zip.pipe(output);
		zip.directory(file, false);
		zip.finalize();
	});

}

function getBootJson(directory: string) {
	const dir = path.join(__dirname, directory.replace(/\\/g, "/")).replace(/["'"]/g, "");
	console.log(dir);
	if (!fs.existsSync(dir)) return null;
	const filepath = path.join(dir, "boot.json");
	if (!fs.existsSync(filepath)) return null;
	const boot = JSON.parse(fs.readFileSync(filepath, "utf8"));
	return boot;
}

function setBootVersionMajor(directory: string) {
	const boot = getBootJson(directory);
	if (!boot) return null;
	const ver = boot.version.split(".");
	if(ver.length > 3){
		ver.pop();
		boot.version = ver.join(".");
	}
	
	const result = semver.inc(boot.version, "major")
	if (result) {
		boot.version = result;
	}
	boot.build = '0';
	fs.writeFileSync(path.join(directory, "boot.json"), JSON.stringify(boot, null, 2));
	return boot;
}
function setBootVersionMinor(directory: string) {

	const boot = getBootJson(directory);
	if (!boot) return null;
	const ver = boot.version.split(".");
	if(ver.length > 3){
		ver.pop();
		boot.version = ver.join(".");
	}

	boot.version = semver.inc(boot.version, "minor");
	boot.build = '0';
	fs.writeFileSync(path.join(directory, "boot.json"), JSON.stringify(boot, null, 2));
	return boot;
}
function setBootVersionPatch(directory: string) {

	const boot = getBootJson(directory);
	if (!boot) return null;
	console.log(boot.version);
	const ver = boot.version.split(".");
	if(ver.length > 3){
		ver.pop();
		boot.version = ver.join(".");
	}
	boot.version = semver.inc(boot.version, "patch");
	boot.build = (parseInt(boot.build) + 1).toString();
	fs.writeFileSync(path.join(directory, "boot.json"), JSON.stringify(boot, null, 2));
	return boot;
}

function setBootVersionFix(directory: string) {
	const boot = getBootJson(directory);
	if (!boot) return null;
	const ver = boot.version.split(".");
	if(ver.length == 3){
		ver.push('1')
		boot.version = ver.join(".");
	}
	else{
		ver[3] = (parseInt(ver[3]) + 1).toString();
		boot.version = ver.join(".");
	}
	boot.build = (parseInt(boot.build) + 1).toString();

	fs.writeFileSync(path.join(directory, "boot.json"), JSON.stringify(boot, null, 2));
	return boot;
}

function getPackageConfig() {
	const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf8"));
	return packageJson;
}
const program = new Command();
const mods = fs.readdirSync(__dirname).filter((file) => {
	const filepath = path.join(__dirname, file);
	const stat = fs.statSync(filepath);
	if (!stat.isDirectory()) return false;
	const hasBoot = fs.readdirSync(file).includes("boot.json")
	if (!hasBoot) return false;
	return true;
});
program.name("iCandy and Robot Mod Manager").description("iCandy and Robot Mod Manager").version(getPackageConfig().version);
program.command("build").description("Builds the mod").action(buildZip);
program.command("major").description("Sets the version of the mod").action(_ => {
	inquirer.prompt([
		{
			type: "list",
			name: "getMod",
			message: "选择Mod需要更新版本?",
			choices: mods
		}
	]).then(({ getMod }) => {
		const boot = setBootVersionMajor(getMod);
		console.log(`更新版本${boot.version}`);
	});
})
program.command("minor").description("Sets the version of the mod").action(_ => {
	inquirer.prompt([
		{
			type: "list",
			name: "getMod",
			message: "选择Mod需要更新版本?",
			choices: mods
		}
	]).then(({ getMod }) => {
		const boot = setBootVersionMinor(getMod);
		console.log(`更新版本${boot.version}`);
	});
})
program.command("patch").description("Sets the version of the mod").action(_ => {
	inquirer.prompt([
		{
			type: "list",
			name: "getMod",
			message: "选择Mod需要更新版本?",
			choices: mods
		}
	]).then(({ getMod }) => {
		const boot = setBootVersionPatch(getMod);
		console.log(`更新版本${boot.version}`);
	});
})
program.command("fix").description("Sets the version of the mod").action(_ => {
	inquirer.prompt([
		{
			type: "list",
			name: "getMod",
			message: "选择Mod需要更新版本?",
			choices: mods
		}
	]).then(({ getMod }) => {
		const boot = setBootVersionFix(getMod);
		console.log(`更新版本${boot.version}`);
	});
})
// select folder mod list
program.command("list").description("Lists all mods").action(() => {
	const mods = fs.readdirSync(__dirname).filter((file) => {
		const filepath = path.join(__dirname, file);
		const stat = fs.statSync(filepath);
		if (!stat.isDirectory()) return false;
		const hasBoot = fs.readdirSync(file).includes("boot.json")
		if (!hasBoot) return false;
		return true;
	});
	console.log(mods);
}
);
program.command("version").description("Gets the version of the mod").action((directory): void => {
	inquirer.prompt([
		{
			type: "list",
			name: "getMod",
			message: "选择Mod需要更新版本?",
			choices: mods
		}
	]).then(({ getMod }) => {
		const boot = getBootJson(getMod);
		if (!boot) return;
		console.log(boot.version);
	});
});
program.command("version").description("Gets the version of the mod").action((): void => {
	const packageJson = getPackageConfig();
	console.log(packageJson.version);
});
program.command("update").description("Updates the mod manager").action(() => {

	inquirer.prompt([
		{
			type: "list",
			name: "getMod",
			message: "选择Mod需要更新版本?",
			choices: mods
		}
	]).then(({ getMod }) => {
		let boot = getBootJson(getMod);
		inquirer.prompt([
			{
				type: "list",
				name: "updateModVersion",
				message: `当前版本${boot.version}，更新版本（Major +1.0.0，Minor +0.1.0，Patch +0.0.1, Fix +0.0.0.1）?`,
				choices: ["major", "minor", "patch", "fix"]
			}]).then(({ updateModVersion }) => {

				console.log(`更新${getMod}版本${updateModVersion}`);
				switch (updateModVersion) {
					case "major":
						boot = setBootVersionMajor(getMod);
						break;
					case "minor":
						boot = setBootVersionMinor(getMod);
						break;
					case "patch":
						boot = setBootVersionPatch(getMod);
						break;
					case "fix":
						boot = setBootVersionFix(getMod);
						break;
				}
				console.log(`更新版本${boot.version}`);
				buildZip();

			});
	});
}
);
program.parse(process.argv);

