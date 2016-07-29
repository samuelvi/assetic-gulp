// ******************************************************************************************************************************
//
// CSS/JS Compiler.
//
// 1) Can compile all css/js files at once by executing "gulp" with no parameters. Watch functionality is not enabled in this case.
// 2) Can compile a css, a js or both for a Section/Subsection by passing the --type=css or --type=js or --type=css,js
//
//      Execution Example (SHORT WAY):   gulp  -s backend -b requests -w
//      Execution Example (RUN ALL)  :   gulp  --watch
//
//      Execution Example:   gulp  --section=frontend --subsection=homepage --type=css --watch=1
//      Execution Example:   gulp  --section=backend --subsection=products-list --type=js --watch=1
//      Both, js & css for a section/subsection => gulp  --section=frontend --subsection=homepage --type=css,js  --watch=1
//
// ******************************************************************************************************************************


// -------------------
// CONFIGURATION.Begin
// -------------------
configPath = __dirname + '/../config/';
assetsPath = __dirname + '/../assets/';

configTypePaths  = {
    'css' : configPath + 'css/',
    'js'  : configPath + 'js/'
};

assetTypePaths  = {
    'css' : assetsPath + 'css/',
    'js'  : assetsPath + 'js/'
};

basePathVars = {
    'css':
        {
            'common':   assetTypePaths['css'] + 'common/',
            'frontend': assetTypePaths['css'] + 'frontend/',
            'backend':  assetTypePaths['css'] + 'backend/'
        },
    'js':
        {
            'common':   assetTypePaths['js'] + 'common/',
            'frontend': assetTypePaths['js'] + 'frontend/',
            'backend':  assetTypePaths['js'] + 'backend/'
        }
};

generatedAssetFilePaths = {
    'css' : __dirname + '/../web/css/',
    'js' : __dirname + '/../web/js/'
};

browserSyncTarget = 'localhost:8080';
// -------------------
// CONFIGURATION.End
// -------------------


// PLUG-INS REQUIRED
require('events').EventEmitter.prototype._maxListeners = 1000;

gulp         = require('gulp');
sass         = require('gulp-sass');
concat       = require('gulp-concat');
rename       = require('gulp-rename');
notify       = require('gulp-notify');
autoprefixer = require('gulp-autoprefixer');
uglify       = require('gulp-uglify');
browserSync  = require('browser-sync');
inlineCSS    = require('gulp-inline-css');
imagemin     = require('gulp-imagemin');
replace      = require('gulp-replace');
cssnano      = require('gulp-cssnano');
requireDir   = require('require-dir');
inject       = require('gulp-inject');
cleanCSS     = require('gulp-clean-css');


// Custom Libraries/Functionallities
walkSync    = require('./lib/walksync.js');
taskAdder   = require('./lib/task_adder.js');
taskWatcher = require('./lib/task_watcher.js');
options     = require('./lib/commandline.js');


function AsseticGulpBooster( params )
{
    this.sectionName                = null;
    this.subsectionName             = null;
    this.typeFiles                  = null;
    this.watchChanges               = false;
    this.taskDomains                = {};
    this.taskNames                  = [];
    this.process                    = params.process;
    this.options                    = params.options;
    this.browserSyncTarget          = params.browserSyncTarget;
    this.generatedAssetFilePaths    = params.generatedAssetFilePaths;
    this.basePathVars               = params.basePathVars;
    this.configTypePaths            = params.configTypePaths;
}


AsseticGulpBooster.prototype.parseCommandLineArguments = function ()
{
    this.sectionName      = ( this.options.se != undefined )?this.options.se:this.options.section;
    this.subsectionName   = ( this.options.su != undefined)?this.options.su:this.options.subsection;
    this.typeFiles        = ( ( this.options.type == undefined )?'css,js':this.options.type ).split(',');
    this.watchChanges     = ( this.options.watch == 1 || this.options.watch === null );
};


AsseticGulpBooster.prototype.pushSectionAndSubsection = function( sectionName, subsectionName, taskType, typeName )
{
    taskName        = sectionName + '_' + subsectionName + '_' + typeName;
    destinationPath = this.generatedAssetFilePaths[typeName];
    pathVariables   = this.basePathVars[typeName];
    baseConfigPath  = this.configTypePaths[typeName];

    taskAdder.addTask ( taskType, taskName, sectionName, subsectionName, typeName, destinationPath, pathVariables, baseConfigPath );
    this.taskNames.push( taskName );

    if ( this.watchChanges ) {
         files2Consider = taskAdder.getFiles2Consider ( sectionName, subsectionName, pathVariables, baseConfigPath );
         this.taskDomains[ taskName ] = files2Consider;
     }
};


AsseticGulpBooster.prototype.watch = function()
{
    if ( this.watchChanges ) {
        taskWatcher.watch( this.taskDomains, this.browserSyncTarget );
    }
};


AsseticGulpBooster.prototype.start = function()
{
    // Automatically Launch Default - All gulp commands
    if ( this.process.argv.length == 2 || ( this.process.argv.length == 3 && this.options.watch !== undefined ) ) {

        // Evety Types Key contains a list of Files with tasks to launch
        this.typeFiles = {'css': walkSync ( configTypePaths['css'] ), 'js': walkSync ( configTypePaths['js'] ) };

        for ( typeName in this.typeFiles) { // iterate for both type files (css and js)

            taskType = require( './tasks/' + typeName + '.js');
            paths = this.typeFiles[ typeName ];

            for (i = 0; i < paths.length; i ++) { // For each "file" to parse, run the task (Css or Js task)

                path      = paths[ i ];
                fileParts = path.split('/');
                sectionName    = fileParts[fileParts.length -2 ];
                subsectionName = (fileParts[fileParts.length -1 ]).replaceAll('.js', '');

                this.pushSectionAndSubsection( sectionName, subsectionName, taskType, typeName);
            }
        }
    } else {

        for ( i=0; i < this.typeFiles.length; i++ ) {

            typeName = this.typeFiles[ i ];
            taskType = require( './tasks/' + typeName + '.js');


            this.pushSectionAndSubsection( this.sectionName, this.subsectionName, taskType, typeName);
        }
    }
};


AsseticGulpBooster.prototype.run = function ()
{
    this.parseCommandLineArguments();
    this.start();
    gulp.task('default', this.taskNames );
    this.watch();
};



var params = {
    'process':                  process,
    'options':                  options.getOptions(),
    'browserSyncTarget':        browserSyncTarget,
    'generatedAssetFilePaths':  generatedAssetFilePaths,
    'basePathVars':             basePathVars,
    'configTypePaths':          configTypePaths
};

var asseticGulpBooster = new AsseticGulpBooster( params );
asseticGulpBooster.run();