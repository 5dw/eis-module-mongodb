module.exports = {
    onAppReady: (app, m) => {
        app.use((req, res, next) => {
            /**
             * 
             * @param {String} n The name of the model
             * @param {String} o Method
             * @param {Number|Function} i Skip how many ops
             * @param {Function} cb Callback
             * @returns 
             */
            res.updateCURD = async function (n, o, i, cb) {
                if(!n || !o || !res.locals.CURD || res.locals.CURD.length <= 0) return;

                let idx = -1;
                let cbk = cb;

                if(typeof i === 'function') {
                    idx = 0;
                    cbk = i;
                } else if (typeof i === 'number') {
                    idx = i;
                    cbk = cb;
                }
                
                if(idx < 0 || typeof cbk !== 'function') return;

                let curd;
                for(let j=0; j < res.locals.CURD.length; ++j) {
                    const m = res.locals.CURD[j];
                    if(m.method === o && m.model === n) {
                        if(idx <= 0) {
                            curd = m;
                            break;
                        } else {
                            idx--;
                            continue;
                        }
                    }
                }

                if(curd && cbk) {
                    await cbk(curd);
                }
            };

            return next();
        });
        
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