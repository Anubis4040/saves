function listarMaterial(a) {

    x = $.ajax({
            url: "Controlador/Material/ListarMaterial/listarMaterial.php",
            type: "POST",
            async: true,
        })
        .done(function (dat, est, obj) {
            var materiales = dat;
            notificacion();
            console.log(typeof (dat));
            if (typeof (dat) == "string" || dat == '') {
                toastr["error"]("ERROR DE DB");
            } else {
                $("#secMat").children().children().children('a').children().html('Materiales <span class="badge badge-pill badge-light">' + materiales["length"] + '</span>').attr("vl", materiales["length"]);
                if (a == 1) {
                    loadCardMDM(materiales, 'addMat');
                } else if (a == 2) {
                    ListSelectMDM(materiales, 'InspeccionMateriales', 'Materiales');
                } else if (a == 3) {
                    ListSelectMDM(materiales,  $("#secMatr div.row:last select[name='material']").attr('id') ,'Materiales');
                }
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
