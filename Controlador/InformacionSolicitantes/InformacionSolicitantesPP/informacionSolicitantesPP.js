function informacionSolicitantesPP(rif, tipo, update) {

    console.log("informacionPP");

    datos = {
        RIF: rif,
        TIPO: tipo
    }

    console.log(datos);
    x = $.ajax({
            url: "Controlador/InformacionSolicitantes/InformacionSolicitantesPP/informacionSolicitantesPP.php",
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
                toastr["error"]("ERROR DE DB");
            } else {
                if (update == false) {
                    activarModalInformacionSolicitantePP(dat);
                } else if (update) {
                   
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

// function activarModalActualizarUsuariosHistorialAdm(informacionAdm) {

//     if ($("#tablaAdministrador").is(":visible")) {

//         $("#civ").hide();
//         $('#modalActualizarUsuariosHistorial .text-muted').hide();
//         $("#modalActualizarUsuariosHistorial option").prop("selected", false);
//         $("#modalActualizarUsuariosHistorial label").addClass("active");

//         var nombre = informacionAdm[0]["nombre"];
//         nombre = nombre.split(' ');

//         $("#idUpp").val(informacionAdm[0]["idPersona"]);
//         $("#idUpc").val(informacionAdm[0]["idPersona"]);
//         $("#idUppass").val(informacionAdm[0]["idPersona"]);

//         $("#actualizarCedulaUsuario").attr('placeholder', informacionAdm[0]["ci"]);
//         $("#actualizarNombreUsuario").attr('placeholder', nombre[0]);
//         $("#actualizarApellidoUsuario").attr('placeholder', nombre[1]);
//         $("#actualizarUsuarioUsuario").attr('placeholder', informacionAdm[0]["login"]);
//         $("#actualizarCorreoUsuario").attr('placeholder', informacionAdm[0]["email"]);
//         $("#telUser").attr('placeholder', informacionAdm[0]["tlf"]);

//         if (informacionAdm[0]['sexo'] == 1) {
//             $("#actualizarSexoUsuarioMasculino").addClass("is-valid sex");
//             $("#actualizarSexoUsuarioFemenino").removeClass("sex");
//         } else {
//             $("#actualizarSexoUsuarioFemenino").addClass("is-valid sex");
//             $("#actualizarSexoUsuarioMasculino").removeClass("sex");
//         }

//         $("#actualidarTipoUsuario option[value=" + informacionAdm[0]['tUser'] + "]").attr("selected", true);
//         $("#tTelUser option[value=" + informacionAdm[0]['tTlf'] + "]").prop("selected", true);

//         $('#modalActualizarUsuariosHistorial .mdb-select').material_select();

//         $("#modalActualizarUsuariosHistorial").modal();     

//     }
// }

function activarModalInformacionSolicitantePP(informacionSolicitante) {

    //initializeMap("mapSoliOrg", informacionSolicitante[0]['latitud'], informacionSolicitante[0]['longitud'],false,17);

    $("#Organismo").text(informacionSolicitante[0]['nombre']);

    if (informacionSolicitante[0]['tipo'] == 1) {
        $("#TipoOrganismo").text("Organismo Publico");
    } else if (informacionSolicitante[0]['tipo'] == 2) {
        $("#TipoOrganismo").text("Organismo Privado");
    }

    $("#UbicacionOrg").text("Ubicacion: " + informacionSolicitante[0]['informacion']);

    $("#RifOrg").text("Rif: " + informacionSolicitante[0]["rif"]);

    $("#nomRep").text("Representante: " + informacionSolicitante[0]["representante"]);

    $("#ciRepr").text("CI: " + informacionSolicitante[0]["ci"]);

    if (informacionSolicitante[0]["tTlf"] == 1) {
        $("#tlfRep").text("Tlf: " + informacionSolicitante[0]["tlf"] + " MOVIL");
    } else {
        $("#tlfRep").text("Tlf: " + informacionSolicitante[0]["tlf"] + " LOCAL");
    }

    $("#CorreoSoli").text("Correo: " + informacionSolicitante[0]["correo"]);

    $("#modalInformacionSolicitantePP").modal();

}