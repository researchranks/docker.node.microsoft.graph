$('#button').click(function() {
    $.ajax({
        type: 'POST',
        url: 'http://192.168.99.100/server'
    });
});