    $("#createUser").on("click", function() {
        LocalStorage.setItem("username", $("#userName").val());
    });
    /*
    $("#profile").attr("href", "/users/" + localStorage.getItem("username"));
    $("#dashboard").attr("href", "/users/" + localStorage.getItem("username") + "/dashboard");
    */