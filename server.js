var http = require('http');
var fs   = require('fs');


function RudeServer( configuration )
{
    this.port = configuration.port;
    this.log  = configuration.log;
}


RudeServer.prototype.getContentType = function ( fileExtension )
{
    validExtensions = {'css': 'text/css'};
    return validExtensions[fileExtension] || 'text/html';
};


// TODO. Improve "routing" - Better Use "express"
RudeServer.prototype.getValidPaths = function()
{
    validPaths = {
        '/':                                    'web/index.html',
        '/products':                            'web/frontend/products/index.html',
        '/frontend/products':                   'web/frontend/products/index.html',
        '/backend/products':                    'web/backend/products/index.html',
        '/backend/products/edit':               'web/backend/products/edit.html',

        '/css/frontend_homepage.css':           'web/css/frontend_homepage.css',
        '/css/frontend_homepage.min.css':       'web/css/frontend_homepage.min.css',

        '/css/backend_products-list.css':       'web/css/backend_products-list.css',
        '/css/backend_products-list.min.css':   'web/css/backend_products-list.min.css',

        '/css/backend_products-edit.css':       'web/css/backend_products-edit.css',
        '/css/backend_products-edit.min.css':   'web/css/backend_products-edit.min.css',

        '/css/frontend_products-list.css':      'web/css/frontend_products-list.css',
        '/css/frontend_products-list.min.css':  'web/css/frontend_products-list.min.css'
    };
    return validPaths;
};


RudeServer.prototype.getFileExtension = function( file )
{
    ext = require('path').extname(file);
    ext = ext.substr(1, ext.length-1);
    return ext;
};


RudeServer.prototype.putLog = function ( params )
{
    var keys=Object.keys(params);
    for ( var i=0;i<keys.length;i++ ) {
        console.log ( keys[i] + ' => ' + params[ keys[i] ] );
    }
    console.log("\n");
};


RudeServer.prototype.start = function()
{
    var me = this;
    http.createServer( function( req, res ) {


        try {

            if (req.url === '/favicon.ico') {
                res.writeHead(200, {'Content-Type': 'image/x-icon'} );
                res.end();
                return;
            }

            file = me.getValidPaths()[req.url];
            ext = me.getFileExtension( req.url );
            contentType = me.getContentType( ext );


            if (me.log) me.putLog( {'req.url': req.url, 'file extension:': ext, 'file 2 read:': file, 'contentType found:': contentType} );


            fs.exists(file, function(exists) {
                if(exists) {
                    fs.readFile(file,function (err, data){
                        res.writeHead(200, {'Content-Type': contentType,'Content-Length':data.length});
                        res.write(data);
                        res.end();
                    });
                } else {
                    res.write('File not found: ' + file);
                    res.end();
                }
            });

        } catch ( err ) {
            console.log(err);
            res.write('Error: ' + err);
            res.end();
        }

    }).listen( this.port );
};


port = 8080;
console.log('Copy and paste the url http://localhost:' + port);
rudeServer = new RudeServer( {'port': port, 'log': true} );
rudeServer.start();