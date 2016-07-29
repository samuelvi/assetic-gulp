require('./string_prototypes.js');

module.exports =
{
    watch: function( taskDomains, browserSyncTarget )
    {

        // Include The BrowserSync Configuration
        gulp              = require('gulp');
        browserSyncConfig = require( '../lib/browsersync.js');
        fs                = require('fs');
        path              = require('path');

        browserSync.init( browserSyncConfig.getConfig( [], browserSyncTarget ) );

        // For each Task, Get All Its Files and watch for changes.
        // When some change happened, run the associatted "task" and launch a browserSync reload command
        for (var taskDomain in taskDomains) {

            files2consider = taskDomains [ taskDomain ];

            // Send a watcher for all files to consider
            for (var idx in files2consider) {

                var file = (files2consider[idx]);
                gulp.watch(file, [ taskDomain ]).on('change', browserSync.reload);

                // console.log("***** " + file + " ******");

                // Watch All Changes for css files included in the sass file and browserSync "taskDomain" if some file changed
                if ( file.endsWith('sass') || file.endsWith('scss') ) {

                    var basename = path.basename(require('fs').realpathSync(file));
                    var basepath = file.split(basename)[0];

                    // Launch a Listener For Each "path" look inside the "@included" files in the main sass file
                    fs.readFileSync(file).toString().split(/\r?\n/).forEach(function (line) {

                        if ( line.startsWith('@import')  ) {
                            line = line.replaceAll('@import', '').replaceAll('\'', '').replaceAll('"', '').replaceAll(';', '').trim();

                            if ( fs.existsSync( basepath + '/' + line ) ) {
                                additionalFile2Consider = (basepath + '/' + line).replaceAll('//', '/');
                                gulp.watch( additionalFile2Consider, [taskDomain] ).on('change', function( event ) {
                                    // console.log(event);
                                    browserSync.reload();
                                });
                            }
                        }
                    });

                }

            }
        }
    }
};