    $("#createUser").on("click", function() {
        localStorage.setItem("username", $("#userName").val());
    });
    $("#profile").attr("href", "/users/" + localStorage.getItem("username"));
    $("#dashboard").attr("href", "/users/" + localStorage.getItem("username") + "/dashboard");
    $("#client").attr("value", localStorage.getItem("username"));