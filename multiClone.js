const { execSync } = require("node:child_process");
const fs = require("fs");
const path = require("path");
const studentData = require("./studentData.json");

try {
  fs.writeFile("./missing.txt", "", (err) => {
    console.error(err);
  });
  fs.mkdirSync("./assignments");
} catch (err) {
  console.error(err);
}

studentData.forEach((el) => {
  if (el.url !== null && el.url !== "" && el.url !== undefined) {
    console.log("creating folder for", el.target);
    try {
      fs.mkdirSync(`./assignments/${el.target}`); // create a new directory
      execSync(`git clone ${el.url}`, {
        stdio: ["inherit", "inherit", "inherit"], // we need this to kill the process when its done
        cwd: path.resolve(__dirname, `./assignments/${el.target}`), // path to where you want to save the file
      });
    } catch {
      (err) => {
        console.error(err);
      };
    }
  } else {
    fs.appendFile(
      "missing.txt",
      `Missing assignment: ${el.target} \n`,
      (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Missing assignment for", el.target);
        }
      }
    );
  }
});
