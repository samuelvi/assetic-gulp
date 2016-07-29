// Avoid console.log to crash on some IE versions.
window.consoleLog = function (text, expanded)
{
    try {
        expanded = expanded || false;

        if ( !expanded ) {
            if ( window.console ) console.log( text );
        } else {
            if ( window.console ) for (a in text) console.log( a + ': ' + text[a] );
        }
    } catch ( err ) {}
};


window.getUrlParameter = function getUrlParameter(sParam)
{
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};