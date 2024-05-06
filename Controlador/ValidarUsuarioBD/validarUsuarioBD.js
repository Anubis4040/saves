function validarUsuarioBD(user) {

    console.log("valUserRBD");

    datos = {
        USUARIO: user.val()
    }

    var id = user.attr("id");

    console.log(datos);
    x = $.ajax({
            url: "Controlador/ValidarUsuarioBD/validarUsuarioBD.php",
            type: "POST",
            async: true,
            data: datos
        })
        .done(function (dat, est, obj) {

            console.log(dat);
            console.log("Estado de peticion= " + est);
            console.log("DONE");
            console.log("---------------------------------------------------------");
            status = est;

            if (dat['rowAf'] == 0) {
                noUser(id);
            } else {
                siUser(id, user);
            }

        })
        .fail(function (obj, est) {
            console.log("FAIL");
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });
}

function noUser(id) {
    if (id == "nombreUsuario") {
        $("#" + id + " ~ label").attr("data-success", "Correcto");
        $("#" + id + "").removeClass("invalid").addClass("valid");
        $("#" + id + " ~ .infoBb").hide(600);
    } else if (id == "actualizarUsuarioUsuario") {
        $("#" + id + " ~ label").attr("data-success", "Correcto");
        $("#" + id + "").removeClass("invalid").addClass("valid");
        $("#" + id + " ~ .infoBb").hide(600);
    }
}

function siUser(id, user) {
    if (id == "nombreUsuario") {
        $("#" + id + " ~ label").removeAttr("data-success");
        $("#" + id + "").removeClass("valid").addClass("invalid");
        $("#" + id + " ~ .infoDb").show(600);
        setTimeout(function () {
            $("#" + id + " ~ .infoDb").hide(600);
        }, 3000);

    } else if (user.attr("id") == "actualizarUsuarioUsuario") {
        if (user.val() == user.attr('placeholder')) {
            $("#" + id + " ~ label").attr("data-success", "Correcto");
            $("#" + id + "").removeClass("invalid").addClass("valid");
            $("#" + id + " ~ .infoBb").hide(600);

        } else {
            $("#" + id + " ~ label").removeAttr("data-success");
            $("#" + id + "").removeClass("valid").addClass("invalid");
            $("#" + id + " ~ .infoDb").show(600);
            setTimeout(function () {
                $("#" + id + " ~ .infoDb").hide(600);
            }, 3000);
        }
    }
}