const http = require("http");
const server = http.createServer();

const users = [];
const posts = [];

const httpRequestListener = function (request, response) {
  const { url, method } = request;

  if (method === "POST") {
    if (url === "/users/signup") {
      let body = "";

      request.on("data", (data) => {
        body += data;
      });

      request.on("end", () => {
        const user = JSON.parse(body);

        users.push({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        });
        response.writeHead(200, { "content-Type": "application/json" });
        console.log(users);
        response.end(JSON.stringify({ message: "userCreated" }));
      });
    } else if (url === "/users/postup") {
      let body = "";

      request.on("data", (data) => {
        //요청에 데이터가 있으면~   에러가 있으면 'error'입니다 ㅎㅎ
        body += data;
      });

      request.on("end", () => {
        //요청에 데이터가 모두 받아졌으면~
        const post = JSON.parse(body);

        posts.push({
          userId: post.id,
          userName: post.name,
          postingId: post.postingId,
          postingTitle: post.postingTitle,
          postingContent: post.postingContent,
        });
        response.end(JSON.stringify({ message: 'postCreated' }));
      });
    }
  } 
};

server.on("request", httpRequestListener);

const IP = "127.0.0.1";
const PORT = 8000;

server.listen(PORT, IP, function () {
  console.log(`Listening to request on ip ${IP} & port ${PORT}`);
});
