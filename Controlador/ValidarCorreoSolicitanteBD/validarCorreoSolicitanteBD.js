function validarCorreoSolicitanteBD(email) {

    console.log("valEmailBD");

    var id = email.attr("id");

    datos = {
        CORREO: email.val()
    }

    console.log(datos);
    x = $.ajax({
            url: "Controlador/ValidarCorreoSolicitanteBD/validarCorreoSolicitanteBD.php",
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
                if (id == "correoRep") {
                    $("#" + id + " ~ .infoErBD").hide(600);
                } 
            } else {
                if (id == "correoRep") {
                    $("#" + id + " ~ label").removeAttr("data-success");
                    $("#" + id + "").removeClass("valid").addClass("invalid");
                    $("#" + id + " ~ .infoErBD").show(600);

                } 
            }

        })
        .fail(function (obj, est) {
            console.log("FAIL");
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });
}