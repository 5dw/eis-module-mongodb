module.exports = {
    onAppReady: (app, m) => {
        // connecting to db
        const db = require('./mongoose')(app, m);

        app.db = db;
    },
    onLoadRouters: (app) => {
        app.use((req, res, next) => {
            res.Model = (n) => {
                return app.models && app.models[n]
            }
            return next();
        })
    }
}