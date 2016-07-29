module.exports =
{
    addTask: function(task, section, subsection, src_paths, destinationPath)
    {
        var result_file = section + '_' + subsection + '.css';

       
        gulp.task(task, function() {
            gulp.src(src_paths)
                .pipe(sass().on( 'error', function (err) { console.log( err.message ); } ))
                .pipe(autoprefixer({ browsers: ['last 2 version', 'ie 9'], remove: false } ))
                .pipe(concat(result_file))
                .pipe(gulp.dest(destinationPath))
                .pipe(rename({suffix: '.min'}))
                .pipe(cleanCSS())
                .pipe(gulp.dest(destinationPath));
        });
    }
};