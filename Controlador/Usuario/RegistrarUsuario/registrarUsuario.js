function registrarUsuario(e) {

    var d = capturarInputs(e);

    datos = {
        USER: d[0],
        TUSER: d[1],    
        EMAIL: d[2],
        PASS: d[3],
        SEXO: sexoU,
        ID: idPersona
    }
    
    console.log("InsertUser");

    console.log(datos);
    x = $.ajax({
            url: "Controlador/Usuario/RegistrarUsuario/registrarUsuario.php",
            type: "POST",
            async: true,
            data: datos
        })
        .done(function (dat, est, obj) {
            notificacion();
            console.log(typeof (dat));
            if (typeof (dat) == "string" || dat['rowAf'] == 0 || dat == '') {
                toastr["error"]("ERROR DE DB");
            } else {
                resetearModal(e);
                if ($("#historialUsuarios").is(":visible")) {
                    if ($("#tablaAdministrador").is(":visible")) {
                        $("#historialUsuarioAdm").DataTable().destroy();
                        historialUsuarioAdm();
                    } else if ($("#tablaIngeniero").is(":visible")) {
                        $("#historialUsuarioIng").DataTable().destroy();
                        historialUsuarioIng();
                    } else if ($("#tablasInactivos").is(":visible")) {
                        $("#historialUsuarioInactivo").DataTable().destroy();
                        historialUsuarioInactivo();
                    }
                }
                ciSoli = false;
                toastr["success"]("Fue registrado exitosamente");
                console.log("Registrado");
            }
            console.log(dat);
            console.log("Estado de peticion= " + est);
            console.log("DONE");
            console.log("---------------------------------------------------------");
            status = est;
        })
        .fail(function (obj, est) {
            toastr["warning"]("ERROR DE PETICION");
            console.log("FAIL");
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });
}