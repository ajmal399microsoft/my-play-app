const jsonServer=require("json-server");
const server=jsonServer.create();
const router=jsonServer.router("./public/db.json");
const middleware=jsonServer.defaults({
    static:"./build",
});

const port=process.env.PORT||5000;
server.use(middleware);
server.use(
    jsonServer.rewriter({
        "/api/*":"/$1",
    })
);

server.use(router);
server.listen(port,()=>{
    console.log(`json server is running on port${port}`)
});