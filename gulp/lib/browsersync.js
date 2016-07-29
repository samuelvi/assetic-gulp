module.exports =
{
    getConfig: function ( files2consider, target)
    {
        return {
            files: files2consider,
            proxy: {
                target: target,
                reqHeaders: function (config) {
                    return {
                        // "host": "localhost:8080",
                        "accept-encoding": "identity",
                        "agent": false,
                        "browsersync": "browsersync"
                    }
                }
            },
            startPath: "/",
            reloadDelay: 100,
            notify: false
        };
    }
};