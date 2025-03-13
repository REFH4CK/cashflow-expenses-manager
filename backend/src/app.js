import server from './config/server.js';

((server) => {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running in PORT ${PORT}`);
  });
})(server);