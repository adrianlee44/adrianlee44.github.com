(function($){
    var base = "https://api.github.com";
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
                if (e.name == "adrianlee44.github.com")
                    return;
                listRepo(e);
            });
        });

    $.getJSON(base + "/users/adrianlee44?callback=?",
        function(data){
            var user = data.data,
                holder = $("#userInfo");
            console.log(user);
            holder.append($("<img />").prop("src", user.avatar_url).addClass("pull-right"));
            holder.append($("<h2>").text(user.name));
            holder.append($("<h5>").text(user.email));
            holder.append($("<h5>").text(user.blog));
            holder.append($("<h5>").text(user.location));
        });

    function listRepo(repo){
        var holder = $("ul.thumbnails"),
            newItem = $("<div>").addClass("thumbnail repo").appendTo($("<li>").addClass("span3").appendTo(holder)),
            cap = $("<div>").addClass("caption").appendTo(newItem);
        newItem.click(function(e){
            window.location.href=repo.html_url;
        });
        cap.append($("<h3>").text(repo.name));
        cap.append($("<h5>").text(repo.language));
        cap.append($("<br />"));
        cap.append($("<p>").text(repo.description));
        cap.append($("<br />"));
        //var last_pushed = new Date(repo.pushed_at);
        //cap.append($("<p>").text("Last pushed: " + outputDate(last_pushed)));
    }

    function outputDate(date){
        var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    }

})(jQuery);
