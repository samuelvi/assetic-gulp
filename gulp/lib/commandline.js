module.exports =
{
    getOptions: function()
    {
        // Get Command Line Params
        commandLineArgs = require('command-line-args');
        cli = commandLineArgs([
            { name: 'section', alias: 's', type: String },
            { name: 'subsection', alias: 'b', type: String},
            { name: 'type', alias: 't', type: String },
            { name: 'watch', alias: 'w', type: Number, defaultOption: 1 },
            { name: 'all',   alias: 'a', type: String }

        ]);
        return cli.parse();
    }
};