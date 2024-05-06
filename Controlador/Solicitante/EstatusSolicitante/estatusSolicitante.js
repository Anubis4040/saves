function estatusSolicitante(cod, estatus, tipo) {

    datos = {
        CODIGO: cod,
        ESTATUS: estatus,
        TIPO: tipo
    }


    event.stopPropagation();
    x = $.ajax({
            url: "Controlador/Solicitante/EstatusSolicitante/estatusSolicitante.php",
            type: "POST",
            async: true,
            data: datos
        })
        .done(function (dat, est, obj) {
            notificacion();
            console.log(typeof (dat));
            var a = 0;
            if (typeof (dat) == "string" || dat['rowAf'] == 0) {
                toastr["error"]("ERROR DE DB");
            } else {
                a = dat['rowAf'];
                $("#modalEstatus").modal('hide');
                $("#modalEstatus").on('hidden.bs.modal', function () {
                    if (a != 0) {
                        if ($("#tablaPrivados").is(":visible")) {
                            toastr["success"]("Solicitante Inavilitado exitosamente");
                            $("#historialSolicitantePriv").DataTable().destroy();
                            historialSolicitantePP(2);
                        } else if ($("#tablaPublicos").is(":visible")) {
                            toastr["success"]("Solicitante Inavilitado exitosamente");
                            $("#historialSolicitantePubl").DataTable().destroy();
                            historialSolicitantePP(1);
                        } else if ($("#tablaParticular").is(":visible")) {
                            toastr["success"]("Solicitante Inavilitado exitosamente");
                            $("#historialSolicitantePart").DataTable().destroy();
                            historialSolicitantePart();
                        } else if ($("#tablasInactivos").is(":visible")) {
                            if ($("#historialSolicitantesPPInact").is(":visible")) {
                                toastr["success"]("Solicitante avilitado exitosamente");
                                $("#historialSolicitantesPPInact").DataTable().destroy();
                                historialSolicitanteInactivo('historialSolicitantesPPInact', true);
                            } else if ($("#historialSolicitantePInact").is(":visible")) {
                                toastr["success"]("Solicitante avilitado exitosamente");
                                $("#historialSolicitantePInact").DataTable().destroy();
                                historialSolicitanteInactivo('historialSolicitantePInact', false);
                            }                            
                        }
                        a = 0;
                    }
                });
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