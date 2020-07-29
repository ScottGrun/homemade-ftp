const net = require("net");
const fs = require("fs");

const server = net.createServer();

server.listen(3000, () => {
  console.log("Server listening on port 3000!");
});


server.on("connection", (client) => {
  console.log("New client connected!");
  client.write("Connection Established");

  client.on("data", (data) => {
    console.log(`Message From Client: ${data}`);
    let fileName = data;

    fs.access(`./data/${fileName}`, fs.F_OK, (err) => {
      if (err) {
        console.error(err)
        console.log('Sorry file not found')
        return;
      }
      console.log('File found transmitting now');
      fs.readFile(`./data/${fileName}`, 'utf8', function(err, data) {
        if (err) throw err;
        client.write(data);
      });
      //file exists
    })

  });
});


server.on("data", (data) => {
  console.log("Message from client: ", data);
});
