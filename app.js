(function($){
    var base = "https://api.github.com",
        template = "<li class='span3'><a class='thumbnail repo' target='_blank'><div class='caption'></div></a></li>",
        repoContainer = $("ul.thumbnails");
    $.getJSON(base + "/users/adrianlee44/repos?callback=?",
        function(data){
            var repos = data.data,
                latestUpdate = new Date();

            repos.sort(function (a, b) {
                if (a.pushed_at < b.pushed_at) return 1;
                if (b.pushed_at < a.pushed_at) return -1;
                return 0;
              });

            $("#numOfRepos").text(repos.length - 1);

            $.each(repos, function(i, e){
                // Hide repo for github page
                if (e.name === "adrianlee44.github.com")
                    return;
                listRepo(e);
            });
        });

    $.getJSON(base + "/users/adrianlee44?callback=?",
        function(data){
            var user = data.data,
                holder = $("#userInfo");
            holder.children().each(function(index, element){
                var $ele = $(element),
                    rel = $ele.attr("rel");
                if ($ele.prop("tagName") === "IMG"){
                    $ele.attr("src", user[rel]);
                } else {
                    $ele.text(user[rel]);
                }
            });
        });

    function listRepo(repo){
        var newItem = $(template).appendTo(repoContainer),
            wrapper = $(".repo", newItem),
            cap = $(".caption", newItem);
        wrapper.attr("href", repo.html_url);
        cap.append($("<h3>").text(repo.name));
        cap.append($("<h5>").text(repo.language || ""));
        cap.append($("<br />"));
        //var last_pushed = new Date(repo.pushed_at);
        //cap.append($("<p>").text("Last Updated: " + outputDate(last_pushed)));
        //cap.append($("<br />"));
        cap.append($("<p>").text(repo.description));
    }

    function outputDate(date){
        var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    }

})(jQuery);
