import app from './app.js';
const port=Number(process.env.PORT||4319);
if(!Number.isInteger(port)||port<1024||port>65535)throw Error('Invalid local port');
const server=app.listen(port,'127.0.0.1',()=>console.log(`QE Dogfood listening on http://127.0.0.1:${port}`));
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>server.close(()=>process.exit(0)));
