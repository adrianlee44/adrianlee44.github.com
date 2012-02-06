(function($){
    var base = "https://api.github.com";
    $.getJSON(base + "/users/adrianlee44/repos?callback=?",
    function(data){
        console.log(data);
    });
})(jQuery);
