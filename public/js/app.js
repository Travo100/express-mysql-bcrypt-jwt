$( document ).ready(function() {
    
    var token = localStorage.getItem("token");

    $("#sign-up-form").submit(function(e){
        e.preventDefault();
        // serialize all of our form fields
        var formDataSerialized = $(this).serialize();

        // post that data to our user/new route
        $.post("/api/user/new", formDataSerialized).then(function(data){
            console.log(data);
            window.location.href = '/login';
        }).catch(function(err){
            console.log(err);
        });
    });

    $("#login-form").submit(function(e){
        e.preventDefault();
        // serialize all of our form fields
        var formDataSerialized = $(this).serialize();

        // post that data to our user/new route
        $.post("/api/user/login", formDataSerialized).then(function(data){
            console.log(data);
            localStorage.setItem("token", data.token);
            
            window.location.href = '/users';
        }).catch(function(err){
            console.log(err);
        });
    });

    // do we have a token and are we on the /users route
    // if so make the request with the token to the 
    // api/users route
    if(token && window.location.pathname === "/users"){
        // post that data to our user/new route
        $.ajax({
            headers: {"Authorization": "Bearer " + token},
            method: "GET",
            url: "/api/users"
        }).done(function(data){
            for(var i = 0; i < data.length; i++){
                var tableData = "<tr>";
                tableData += "<td>"+data[i].id+"</td>";
                tableData += "<td>"+data[i].email+"</td>";
                tableData += "<td>"+data[i].bio+"</td>";
                tableData += "</tr>";
                $("table tbody").append(tableData);
            }
        });
    }
});