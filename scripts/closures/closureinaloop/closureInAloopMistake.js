define(function () {
    function showHelp(help) {
        document.getElementById('help').innerHTML = help;
    }
    
    function setuphelp() {
        debugger;
        var helpText = [
            { 'id': 'email', 'help': 'Your e-mail address' },
            { 'id': 'name', 'help': 'Your full name' },
            { 'id': 'age', 'help': 'Your age (you must be over 16)' }
        ];
        for (var i = 0; i < helpText.length; i++) {
            // The key thing here var is variable that will be risen. And scope of this variable the whole function and not only the loop
            var item = helpText[i];
            document.getElementById(item.id).onfocus = showHelp(item);
        }
    }

    setuphelp();
});