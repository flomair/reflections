$(document).ready(function() {
    var socket = io.connect("http://192.168.0.200:1223");
    socket.emit("join", "fmair");
    $("#chat").hide();
    $("#name").focus();
    $("form").submit(function(event) {
        event.preventDefault();
    });
    $("#join").click(function() {
        var name = $("#name").val();
        if (name != "") {
            socket.emit("join", name);
            $("#login").detach();
            $("#chat").show();
            $("#msg").focus();
            ready = true;
        }
    });
    $("#name").keypress(function(e) {
        if (e.which == 13) {
            var name = $("#name").val();
            if (name != "") {
                socket.emit("join", name);
                ready = true;
                $("#login").detach();
                $("#chat").show();
                $("#msg").focus();
            }
        }
    });
    socket.on("update", function(msg) {
         $("#msgs").append(" " + msg + " ");
    }) 
    socket.on("update-people", function(people) {
            $.each(people, function(clientid, name) {
                $('#people').append(" " + name + " ");
            });
    });
    socket.on("chat", function(who, msg) {
   
            $("#msgs").append(" " + who + " says: " + msg + " ");
        
    });
    socket.on("disconnect", function() {
        $("#msgs").append(" The server is not available ");
        $("#msg").attr("disabled", "disabled");
        $("#send").attr("disabled", "disabled");
    });
    $("#send").click(function() {
        var msg = $("#msg").val();
        socket.emit("send", msg);
        $("#msg").val("");
    });
    $("#msg").keypress(function(e) {
        if (e.which == 13) {
            var msg = $("#msg").val();
            socket.emit("send", msg);
            $("#msg").val("");
        }
    });
});