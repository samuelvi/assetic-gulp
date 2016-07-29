module.exports =
{
    addTask: function(task, section, subsection, src_paths, destinationPath)
    {
        var result_file = section + '_' + subsection + '.js';

        gulp.task(task, function() {
            gulp.src(src_paths )
                .on('error', function(err) { console.log(err); })
                .pipe(concat(result_file))
                .pipe(gulp.dest(destinationPath))
                .pipe(rename({suffix: '.min'}))
                .pipe(uglify({mangle: false}))
                .pipe(gulp.dest(destinationPath));
        });
    }
};