function listarDano(a) {

    x = $.ajax({
        url: "Controlador/Dano/ListarDano/listarDano.php",
        type: "POST",
        async: true,
    })
        .done(function (dat, est, obj) {
            dano = dat;
            notificacion();
            console.log(typeof (dat));
            if (typeof (dat) == "string" || dat == '') {
                toastr["error"]("ERROR DE DB");
            } else {
                $("#secDaño").children().children().children('a').children().html('Daños <span class="badge badge-pill badge-light">' + dano["length"] + '</span>').attr("vl", dano["length"]);
                if (a == 1) {
                    loadCardMDM(dano, 'addDano');
                } else if (a == 2) {
                    ListSelectMDM(dano, 'InspeccionDanos', 'Daños');
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