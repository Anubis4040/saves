function solicitudInspeccion(e) {

    var id = e.parent().parent().parent().parent().attr("id");

    d = capturarInputs(e);

    datos = {
        COD: d[1],
        SOLI: d[0],
        FECHA: d[2],
        INFO: d[4],
        COOR: d[3],
        MOTIVO: d[5]
    }
    console.table(datos);

    notificacion();
    x = $.ajax({
            url: "Controlador/Peticion/SolicitudInspeccion/solicitudInspeccion.php",
            type: "POST",
            async: true,
            data: datos
        })
        .done(function (dat, est, obj) {

            console.log(typeof (dat));
            if (typeof (dat) == "string" || dat['rowAf'] == 0) {
                toastr["error"]("ERROR DE DB");
            } else {
                $("#" + id)[0].reset();
                $("#" + id + " label").removeClass("active");
                $("#" + id + " span").hide();
                toastr["success"]("Su Solicitud fue registrada exitosamente");
                if (regresarPe == 1) {
                    activarHistorialPeticiones('main');
                } else {
                    activarFormularioPeticiones();
                }

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