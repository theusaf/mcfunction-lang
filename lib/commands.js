// https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder
const list = [];
require("fs").readdirSync(__dirname + "/commands/").forEach(function(file) {
  if (file.match(/\.js$/) && file !== "index.js") {
    const command = require("./commands/" + file);
    list.push(command);
  }
});

module.exports = list;
