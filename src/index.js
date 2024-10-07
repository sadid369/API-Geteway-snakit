const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
// const { Auth } = require('./utils/common');
const { rateLimit } = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const apiProxy = createProxyMiddleware({
    target: 'http://127.0.0.1:5004/api/v1/info',
    changeOrigin: true,
});
const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 15 minutes
    limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)

});


const app = express();
app.use('/flightService', apiProxy);
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);

});
