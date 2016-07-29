module.exports =
{
    getFiles2Consider: function ( sectionName, subsectionName, pathVariables, configBasePath )
    {
        configurationFile = configBasePath + sectionName + '/' + subsectionName + '.js';
        config = require( configurationFile );
        return config.getFiles( pathVariables ); // Array Of files;
    },

    addTask: function( taskType, taskName, sectionName, subsectionName, typeName, destinationPath, pathVariables, configBasePath )
    {
        files2Consider = this.getFiles2Consider( sectionName, subsectionName, pathVariables, configBasePath );
        taskType.addTask( taskName, sectionName, subsectionName, files2Consider, destinationPath );
    }
};