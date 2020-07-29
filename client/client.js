const net = require("net");
const fs = require("fs");
const fileName = process.argv.slice(2)[0];
const userInput = process.argv.slice(2)[0];
//Connect to server
const conn = net.createConnection({
  host: "localhost",
  port: 3000,
});
conn.setEncoding("utf8");

conn.on("connect", () => {
  conn.write(fileName);
});

conn.on("data", (data) => {
  console.log(`Server Message: ${data}`);

  fs.writeFile(`./data/${fileName}`, data, (error, data) => {
    if (error) throw err;
    console.log('Written')
  });
});
