// SideNav Initialization
$(".button-collapse").sideNav();
// SideNav Scrollbar Initialization
var sideNavScrollbar = document.querySelector('.custom-scrollbar');
Ps.initialize(sideNavScrollbar);
new WOW().init();

$(document).ready(function () {
    $("#carga").hide();
});

validarInicioSesion();

// oculta todos los spanPassLogin
$(".md-addon-p").hide();

$(document).on('click', '#iniciarSesion', function () {
    $("#modalInisiarSesion").modal();
});

$("#btnIniciarSesion").click(function () {
    $("#usuarioClave").attr('type', 'password');
    validar($("#datosInicioUsuario"));
});


// desinicializamos los selects para evitar repeticiones de contenido
$(document).on('hidden.bs.modal', '.modal.fade', function () {
    $('.modal.fade .mdb-select').material_select('destroy');
});

$(document).on('click', 'div ul li a.add,div a.add', function () {
    $('.modal.fade .mdb-select').material_select('destroy');
});

// toma funciones de formulario
$(document).keypress(function (e) {
    if (e.which == 13) {
        if ($("#modalInisiarSesion").is(":visible")) {
            e.preventDefault();
            validar($("#datosInicioUsuario"));
        } else if ($("#datosPersona").is(":visible") || $("#datos1").is(":visible") || $("#datos2").is(":visible")) {
            e.preventDefault();
            enviarFormularios();
        } else if ($("#modalRegistroSolicitante").is(":visible") || $("#formularioPeticionVia").is(":visible")) {
            e.preventDefault();
        }
    }
});

function resetearModal(e) {
    cid = false;
    id = e.attr("id");
    p = e.parents("div.modal").modal("hide");
    nid = p.children().children().children(".modal-body").children().children().attr("id");
    $("#" + nid)[0].reset();
    $("#" + nid + " input").removeClass("valid invalid is-valid is-invalid");
    $("#" + nid + " input + label").removeClass("active");
    $("#" + nid + " input ~ span").hide();
    $("#" + nid + " .md-form i").removeClass("active");
}

// Inicializacion del dashboard

cargarDash();

$("#opcionInicio").click(cargarDash);

function cargarDash() {
    $("#main").removeClass("m-0 p-0").load("Vista/Contenido/Dashboard/contenido.php", function () {
        $(document).ready(function () {
            // inyectar svg
            $('.svg-inject').svgInject();
            $('#dashBoardObra').hide();
            InfoDashBoard(1);
            $("#btnPetInsp").click(function () {
                if ($("#dashBoardPetInsp").is(":hidden")) {
                    DashBoardPetInsp();
                }
            });
            $("#btnObra").click(function () {
                if ($("#dashBoardObra").is(":hidden")) {
                    DashBoardObra();
                }
            });

            var ctxL = document.getElementById("graficoDash").getContext('2d');
            var myLineChart = new Chart(ctxL, {
                type: 'line',
                data: {
                    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                    datasets: [{
                            label: "En espera",
                            data: [65, 59, 20, 20, 10, 5, 44, 1, 3, 11, 22, 50],
                            backgroundColor: [
                                'rgba(132, 0, 0, 0.2)',
                            ],
                            borderColor: [
                                'rgba(200, 99, 99, 0.7)',
                            ],
                            borderWidth: 2
                        },
                        {
                            label: "Planidficadas",
                            data: [28, 48, 40, 50, 60, 35, 38, 84, 15, 1, 55, 12],
                            backgroundColor: [
                                'rgba(137, 62, 0, 0.2)',
                            ],
                            borderColor: [
                                'rgba(130, 63, 0, 0.7)',
                            ],
                            borderWidth: 2
                        },
                        {
                            label: "Atendidas",
                            data: [10, 50, 10, 2, 20, 10, 30, 51, 1, 0, 0, 10],
                            backgroundColor: [
                                'rgba(32, 137, 0, 0.2)',
                            ],
                            borderColor: [
                                'rgba(4, 130, 0, 0.7)',
                            ],
                            borderWidth: 2
                        }
                    ]
                },
                options: {
                    responsive: true
                }
            });
        });
    });
}

function DashBoardPetInsp() {
    InfoDashBoard(1);
    $("#dashBoardPetInsp:hidden").addClass("animated fadeInLeft").show();
    $("#dashBoardObra").hide();
}

function DashBoardObra() {
    InfoDashBoard(2);
    $("#dashBoardPetInsp").hide();
    $("#dashBoardObra:hidden").addClass("animated fadeInRight").show();
}

// carga el Mapa del sistema

$("#opcionMapa").click(function () {
    $("#main").addClass("m-0 p-0").load("Vista/Contenido/Mapa/mapaInicio.html", function () {
        // inicializarMapaInicio();
    });
});


// activar registro de usuario
$(document).on('click', '#opcionUsuarios .add, #historialUsuarios ~ div a.add ', activarModalRegistrarUsuario);

function activarModalRegistrarUsuario() {
    if (datosDelUsuario['tuser'] == "1" || datosDelUsuario['tuser'] == "4" || datosDelUsuario['tuser'] == "2") {
        // inicializamos los selects
        $('#modalRegistroUsuario .mdb-select').material_select();

        // mostrar elementos
        $("#datosPersona").show();
        $("#divSiguiente").show();

        // ocultar elementos
        $("#datos1").hide();
        $("#datos2").hide();
        $("#divAnterior").hide();

        if (ciSoli == false) {
            $("#divCancelar").hide();
            $('.text-muted').hide();
            $("#nombrePersona").attr("disabled", 'true');
            $("#apellidoPersona").attr("disabled", 'true');
            $("#sexoUsuarioM").attr("disabled", 'true');
            $("#sexoUsuarioF").attr("disabled", 'true');
        } else {
            $("#divCancelar").show(600);
        }

        //establece html 
        $('#btnSiquiente').html("Siguiente<i class='fas fa-arrow-right ml-1'></i>");


        // variables de control


        if (ciSoli == true) {
            cid = false;
            update = true;
        } else {
            cid = false;
            update = false;
        }

        // mostrar el modal
        $("#modalRegistroUsuario").modal();
    }
}

$("#modalRegistroUsuario").on("hidden.bs.modal", function () {
    eliminarPersona();
});

$('#btnCancelar').click(function () {
    event.preventDefault();
    $("#divCancelar").hide(600);
    $("#nuevoUsuario")[0].reset();
    $("#nuevoUsuario label").removeClass("active");
    $('.text-muted').hide(600);
    update = false;
    ciSoli = false;
    cid = false;
    idPersona = '';
});

$('#btnSiguiente').click(function () { // Pasa a la siguiente seccion del registro    
    enviarFormularios();
});

function enviarFormularios() {
    var eForms = [$('#datosPersona'), $('#datos1'), $('#datos2')];
    for (var i = 0; i < eForms.length; i++) { // Recorre la variable donde se almacenaron las secciones de reistro                        
        if (eForms[i].is(":visible")) { // si uno de los elementos esta visible llama a la funcion validar y rompre el ciclo
            validar(eForms[i]);
            break;
        }
    }
}

$('#btnAnterior').click(function () { // Regresa a la  seccion anterior del registro              
    if ($('#datos2').is(":visible")) { // si data 2 esta visible llama a la funcion backDataUser
        datos2Usuario();
    } else if ($('#datos1').is(":visible")) { // si data 1 esta visible llama a la funcion backDataPersonal
        datosPersona();
    }
});

function usuarioDatos1() {
    $('#divCancelar').hide(800);
    $('#datosPersona').hide(800);
    $('#divAnterior').show(800);
    $('#datos1').show(800);
    if (ciSoli == false) {
        cid = true;
    } else {
        cid = false;
    }

}

function usuarioDatos2() { // Cambia data1 por data2 y  valida el password    
    $('#datos1').hide(800);
    $('#btnSiguiente').html("registrar<i class='fas fa-sign-in-alt ml-1'></i>");
    $('#datos2').show(800);
    validarClave(); // Llama a la funcion valPass
}

function datos2Usuario() {
    $('#datos2').hide(800);
    $('#datos1').show(800);
    $('#btnSiguiente').html("siguiente<i class='fas fa-arrow-right ml-1'></i>");
}

function datosPersona() {
    if (ciSoli == true) {
        $('#divCancelar').show(800);
    }
    $('#datos1').hide(800);
    $('#divAnterior').hide(800);
    $('#datosPersona').show(800);
    update = true;
}


$("#cedulaUsuario").blur(function () {
    if ($("#cedulaUsuario").val().length >= 7 && $("#cedulaUsuario").val().length <= 8) {
        validarCedulaBD($("#cedulaUsuario"));
    } else {
        $("#cedulaUsuario ~ .infoErBD").hide(600);
    }
});

$("#nombreUsuario").blur(function () {
    if ($("#nombreUsuario").val().length != 0) {
        validarUsuarioBD($("#nombreUsuario"));
    } else {
        $("#nombreUsuario ~ .infoBD").hide(600);
    }
});

$("#civIngeniero").blur(function () {
    if ($("#civIngeniero").val().length >= 7 && $("#civIngeniero").val().length <= 20) {
        validarCivBD($("#civIngeniero"));
    } else {
        $("#civIngeniero ~ .infoErBD").hide(600);
    }
});

$("#correoUsuario").blur(function () {
    if ($("#correoUsuario").val().length != 0) {
        validarCorreoUsuarioBD($("#correoUsuario"));
    } else {
        $("#correoUsuario ~ infoBb").hide(600);
    }
});

// activa el historial de usuarios

$("#opcionUsuarios div ul li a.hist").click(function () {
    activarHistorialUsuarios('main');
});

function activarHistorialUsuarios(id) {
    if (datosDelUsuario['tuser'] == "1" || datosDelUsuario['tuser'] == "4" || datosDelUsuario['tuser'] == "2") {
        $("#" + id).removeClass("m-0 p-0").load("Vista/Contenido/Historiales/HistorialUsuario/contenido.php", function () {
            $("#tablaIngeniero,#tablasInactivos").hide();
            $("#tablaIngeniero").attr("value", "a");
            $("#historialUsuarioAdm").DataTable().destroy();
            historialUsuarioAdm();
            $("#administradores").click(function () {
                if ($("#tablaAdministrador").is(":hidden")) {
                    UsuarioAdministrador();
                }
            });
            $("#ingenieros").click(function () {
                if ($("#tablaIngeniero").is(":hidden")) {
                    UsuarioIngeniero();
                }
            });
            $("#inactivos").click(function () {
                if ($("#tablasInactivos").is(":hidden")) {
                    UsuariosInactivos();
                }
            });
        });
    }
}

// actualizarUsuarioHistorial();

function UsuarioAdministrador() {
    $("#historialUsuarioAdm").DataTable().destroy();
    historialUsuarioAdm();
    $("#tablaAdministrador:hidden").addClass("animated fadeInLeft").show().attr("value", "0");
    $("#tablaIngeniero").hide().attr("value", "a");
    $("#tablasInactivos").hide();
}

function UsuarioIngeniero() {
    $("#historialUsuarioIng").DataTable().destroy();
    historialUsuarioIng();
    $("#tablaAdministrador").hide();
    if ($("#tablaIngeniero").attr("value") == "a") {
        $("#tablaIngeniero:hidden").removeClass("fadeInLeft").addClass("animated fadeInRight").show().attr("value", "0");
    } else {
        $("#tablaIngeniero:hidden").removeClass("fadeInRight").addClass("animated fadeInLeft").show().attr("value", "a");
    }
    $("#tablasInactivos").hide();
}

function UsuariosInactivos() {
    $("#historialUsuarioInactivo").DataTable().destroy();
    historialUsuarioInactivo();
    $("#tablaAdministrador").hide();
    $("#tablaIngeniero").hide().attr("value", "0");
    $("#tablasInactivos:hidden").addClass("animated fadeInRight").show().attr("value", "a");
}

informacionUsuarios();

function informacionUsuarios() {
    $(document).on('click', '#historialUsuarios tbody button.info-user-view', function () {
        var data = table.row($(this).parent().parent().parent()).data();
        if ($("#tablaAdministrador").is(":visible")) {
            informacionUsuario(data[4], false, 1);
        }
        if ($("#tablaIngeniero").is(":visible")) {
            informacionUsuario(data[4], false, 2);
        }
        if ($("#tablasInactivos").is(":visible")) {
            if (data[5] == "ADMINISTRADOR") {
                informacionUsuario(data[4], false, 1);
            } else if (data[5] == "INGENIERO") {
                informacionUsuario(data[4], false, 2);
            }
        }
    });
}

estatusUsuarios();

function estatusUsuarios() {
    $(document).on('click', '#historialUsuarios tbody button.est-user-view:visible', function () {
        dataTableUsuario = table.row($(this).parent().parent().parent()).data();
        if ($("#tablaAdministrador").is(":visible") || $("#tablaIngeniero").is(":visible")) {
            $("#modalEstatus p.heading").text("¿Esta seguro que desea inavilitar al usuario?");
            $("#modalEstatus #times").show();
            $("#modalEstatus #check").hide();
            estatusU = 2;
        }
        if ($("#tablasInactivos").is(":visible")) {
            $("#modalEstatus p.heading").text("¿Esta seguro que desea avilitar al usuario?");
            $("#modalEstatus #times").hide();
            $("#modalEstatus #check").show();
            estatusU = 1;
        }
        $("#modalEstatus").modal('show');
    });
}

datosActualizar();

function datosActualizar() {
    $(document).on('click', '#historialUsuarios tbody button.edt-user-view:visible', function () {
        var data = table.row($(this).parent().parent().parent()).data();
        if ($("#tablaAdministrador").is(":visible")) {
            informacionUsuario(data[4], true, 1);
        }
        if ($("#tablaIngeniero").is(":visible")) {
            informacionUsuario(data[4], true, 2);
        }
    });

}

$(document).on('blur', "#actualizarCedulaUsuario", function () {
    if ($("#actualizarCedulaUsuario").val().length >= 7 && $("#actualizarCedulaUsuario").val().length <= 8) {
        update = '';
        validarCedulaBD($("#actualizarCedulaUsuario"));
    } else {
        $("#actualizarCedulaUsuario ~ .infoErBD").hide(600);
    }
});

$(document).on('blur', "#actualizarUsuarioUsuario", function () {
    if ($("#actualizarUsuarioUsuario").val().length != 0) {
        validarUsuarioBD($("#actualizarUsuarioUsuario"));
    } else {
        $("#actualizarUsuarioUsuario ~ .infoErBD").hide(600);
    }
});

$(document).on('blur', "#actualizarCivUsuario", function () {
    if ($("#actualizarCivUsuario").val().length >= 7 && $("#actualizarCivUsuario").val().length <= 20) {
        validarCivBD($("#actualizarCivUsuario"));
    } else {
        $("#actualizarCivUsuario ~ .infoErBD").hide(600);
    }
});

$(document).on('blur', "#actualizarCorreoUsuario", function () {
    if ($("#actualizarCorreoUsuario").val().length != 0) {
        validarCorreoUsuarioBD($("#actualizarCorreoUsuario"));
    } else {
        $("#actualizarCorreoUsuario ~ .infoErBD").hide(600);
    }
});

$(document).on('click', '#datosPublicos button.guardar', function () {
    validarDatosUsuarioActualizarUser($("#datosPublicos"));
});

$(document).on('click', '#datosCuenta button.guardar', function () {
    validarDatosUsuarioActualizarUser($("#datosCuenta"));
});

$(document).on('click', '#datosClave button.guardar', function () {
    validarDatosUsuarioActualizarUser($("#datosClave"));
});

$(document).on('hidden.bs.modal', '#modalActualizarUsuariosHistorial', function () {
    $("#datosPublicos")[0].reset();
    $("#datosCuenta")[0].reset();

    $("#modalActualizarUsuariosHistorial input").removeClass("is-valid").prop("checked", false);

    $('.modal.fade .mdb-select').material_select('destroy');
});

// activar Registro de solicitante

// --------------------------------------------------------------------

$(document).on('click', "#opcionSolicitantes div ul li a.add, #historialSolicitante ~ div a.add ", avtivarModalRegistroSolicitante);

function avtivarModalRegistroSolicitante() {

    $('.text-muted').hide();
    $("#divCancelarRep").hide();

    $("#modalRegistroSolicitante .mdb-select").material_select();

    $('#tSoli').change(function () {
        var sel = $('#tSoli').val();
        if (sel == "2" || sel == "1") {
            $("#datosPublicosPrivados").show(600);
        } else if (sel == "3") {
            $("#datosPublicosPrivados").hide(600);
        }
    });

    $("#modalRegistroSolicitante").modal();

};

//initializeMap("map-container-1");

function initializeMap(element, lat = 10.645556, lng = -63.038889, marker = true, zoom = 8) {

    labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    labelIndex = 0;
    var last_marcador = [];
    var first = false;

    var map = new google.maps.Map(document.getElementById(element), {
        center: {
            lat: 10.645556,
            lng: -63.038889
        },
        zoom: zoom,
        mapTypeId: 'roadmap'
    });

    var infoWin = new google.maps.InfoWindow();

    if (marker == true) {

        google.maps.event.addListener(map, 'click', function (event) {

            if (first == true) {
                last_marcador.forEach(function (marker) {
                    marker.setMap(null);
                });
            }

            last_marcador = [];

            last_marcador = addMarker(last_marcador, event.latLng, map, infoWin);

            var location = event.latLng;

            geocodeLatLng(location, map, infoWin);

            $(".cords").val(location.lat() + ' , ' + location.lng());

            first = true;
        });

        // Crear el cuadro de búsqueda y vincularlo al elemento UI.
        var input = document.getElementById($("#" + element).siblings().attr("id"));
        var buscaodor = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // desvía los resultados del cuadro de búsqueda hacia la ventana de mapas actual.
        map.addListener('bounds_changed', function () {
            buscaodor.setBounds(map.getBounds());
        });

        buscaodor.addListener('places_changed', function () {
            var places = buscaodor.getPlaces();

            if (places.length == 0) {
                return;
            }

            last_marcador.forEach(function (marker) {
                marker.setMap(null);
            });

            last_marcador = [];

            var bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {

                if (!place.geometry) {
                    return;
                }

                last_marcador = addMarker(last_marcador, place.geometry.location, map, infoWin, place.name);

                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }

            });

            map.fitBounds(bounds);

            first = true;

        });

    } else {
        var location = {
            lat: parseFloat(lat),
            lng: parseFloat(lng)
        };
        last_marcador = addMarker(last_marcador, location, map, infoWin);
        geocodeLatLng(location, map, infoWin);
    }
}

// agrega un nuevo marcador en el mapa
function addMarker(marker, location, map, infoWin, title) {

    if (title == null) {

        marker.push(new google.maps.Marker({
            map: map,
            position: location,
            label: labels[labelIndex++ % labels.length]
        }));

        marcador = marker[0];

        marcador.addListener('click', function () {
            infoWin.open(map, marcador);
        });

    } else {

        marker.push(new google.maps.Marker({
            map: map,
            title: title,
            position: location,
            label: labels[labelIndex++ % labels.length]
        }));

    }

    return marker;

}

//tranformar coordenadas en una direccion 
function geocodeLatLng(loc, map, infowindow) {

    var geocoder = new google.maps.Geocoder;

    geocoder.geocode({
        'location': loc
    }, function (results, status) {
        result = 12;
        if (status === 'OK') {

            if (results[0]) {
                //informacion que contendra el Info Window
                var infoString = '<p style="color: red"> Ubicacion </p>' +
                    '<p>Direccion:  ' + results[0].formatted_address + '</p>';

                if ($("#modalRegistroSolicitante").is(":visible")) {
                    $("#infoUbi").val(results[0].formatted_address);
                } else if ($("#formularioPeticionVia").is(":visible")) {
                    $("#infoUbiPet").val(results[0].formatted_address);
                }

                infowindow.setContent(infoString)

                infowindow.open(map, marcador);

            } else {
                console.log('No se encontraron resultados');
                result = 12;
            }
        } else {
            console.log('Geocoder ha fallado: ' + status);
            result = 12;
        }
    });

}

$(document).on('click', '#btnCancelarRep', function () {
    event.preventDefault();
    $("#ciRep").val('').removeClass("invalid valid").siblings("label").removeClass("active");
    $("#nombreRep").val('').removeClass("invalid valid").siblings("label").removeClass("active");
    $("#apellidoRep").val('').removeClass("invalid valid").siblings("label").removeClass("active");
    $("#telSoli").val('').removeClass("invalid valid");
    $("#idPersonaRep").val('');
    $("#divCancelarRep").hide(600);
    $("#CambiosRep").hide(600);
});

$(document).on('blur', "#rif", function () {
    if ($("#rif").val().length != 0) {
        validarRifOrganismoBD($("#rif"));
    } else {
        $("#rif ~ .infoErBD").hide(600);
    }
});

$(document).on('blur', "#nombreOrg", function () {
    if ($("#nombreOrg").val().length != 0) {
        validarNombreOrganismoBD($("#nombreOrg"));
    } else {
        $("#nombreOrg ~ .infoErBD").hide(600);
    }
});

$(document).on('blur', '#ciRep', function () {
    if ($("#ciRep").val().length >= 7 && $("#ciRep").val().length <= 8) {
        validarCedulaRepresentanteBD($("#ciRep"));
    } else {
        $("#ciRep ~ .infoErBD").hide(600);
    }
});

$(document).on('blur', '#correoRep', function () {
    if ($("#correoRep").val().length != 0) {
        validarCorreoSolicitanteBD($("#correoRep"));
    } else {
        $("#correoRep ~ .infoErBD").hide(600);
    }
});

$(document).on('click', "#regSolit", function () {
    if ($("#cords").val() != 0) {
        $("#cords").removeClass("invalid").addClass("valid");
    }
    validar($("#modalRegistroSolicitante"));
});


// Activar Historial de solicitantes

$("#opcionSolicitantes div ul li a.hist").click(function () {
    avtivarHistorialSolicitante('main');
});

function avtivarHistorialSolicitante(id) {
    $("#" + id).removeClass("m-0 p-0").load("Vista/Contenido/Historiales/HistorialSolicitante/contenido.php", function () {
        $("#tablaPublicos,#tablaParticular,#tablasInactivos").hide();
        $("#tablaPublicos,#tablaParticular").attr("value", "a");
        $("#historialSolicitantePriv").DataTable().destroy();
        historialSolicitantePP(2);
        $("#Privados").click(function () {
            if ($("#tablaPrivados").is(":hidden")) {
                SolicitantePriv();
            }
        });
        $("#Publicos").click(function () {
            if ($("#tablaPublicos").is(":hidden")) {
                SolicitantePubl();
            }
        });
        $("#particulares").click(function () {
            if ($("#tablaParticular").is(":hidden")) {
                SolicitantePart();
            }
        });
        $("#Inactivos").click(function () {
            if ($("#tablasInactivos").is(":hidden")) {
                SolicitanteInactivo();
            }
        });
    });
}

function SolicitantePriv() {
    $("#historialSolicitantePriv").DataTable().destroy();
    historialSolicitantePP(2);
    $("#tablaPrivados:hidden").addClass("animated fadeInLeft").show().attr("value", "0");
    $("#tablaPublicos").hide().attr("value", "a");
    $("#tablaParticular").hide().attr("value", "a");
    $("#tablasInactivos").hide();
}

function SolicitantePubl() {
    $("#historialSolicitantePubl").DataTable().destroy();
    historialSolicitantePP(1);
    $("#tablaPrivados").hide();
    if ($("#tablaPublicos").attr("value") == "a") {
        $("#tablaPublicos:hidden").removeClass("fadeInLeft").addClass("animated fadeInRight").show().attr("value", "0");
    } else {
        $("#tablaPublicos:hidden").removeClass("fadeInRight").addClass("animated fadeInLeft").show().attr("value", "a");
    }
    $("#tablaParticular").hide();
    $("#tablasInactivos").hide();
}

function SolicitantePart() {
    $("#historialSolicitantePart").DataTable().destroy();
    historialSolicitantePart();
    $("#tablaPrivados").hide();
    $("#tablaPublicos").hide();
    if ($("#tablaParticular").attr("value") == "a") {
        $("#tablaParticular:hidden").removeClass("fadeInLeft").addClass("animated fadeInRight").show().attr("value", "0");
    } else {
        $("#tablaParticular:hidden").removeClass("fadeInRight").addClass("animated fadeInLeft").show().attr("value", "a");
    }
    $("#tablasInactivos").hide();
}

function SolicitanteInactivo() {
    $("#historialSolicitantesPPInact").DataTable().destroy();
    historialSolicitanteInactivo('historialSolicitantesPPInact', true);
    $("#tablaPrivados").hide();
    $("#tablaPublicos").hide().attr("value", "0");
    $("#tablaParticular").hide().attr("value", "0");
    $("#tablasInactivos:hidden").addClass("animated fadeInRight").show().attr("value", "a");
    activarInactivos();
}

function activarInactivos() {
    $("#tablaSoliPPInact").show();
    $("#tablaSoliPInact").hide();
}

$(document).on('click', '#privPubliInacti', function () {
    if ($("#tablaSoliPPInact").is(":hidden")) {
        $("#historialSolicitantesPPInact").DataTable().destroy();
        historialSolicitanteInactivo('historialSolicitantesPPInact', true);
        $("#tablaSoliPPInact").addClass("animated fadeInLeft").show();
        $("#tablaSoliPInact").hide();
    }
});


$(document).on('click', '#partiInacti', function () {
    if ($("#tablaSoliPInact").is(":hidden")) {
        $("#historialSolicitantePInact").DataTable().destroy();
        historialSolicitanteInactivo('historialSolicitantePInact', false);
        $("#tablaSoliPInact").addClass("animated fadeInRight").show();
        $("#tablaSoliPPInact").hide();
    }
});


informacionSolicitante();

function informacionSolicitante() {
    $(document).on('click', '#historialSolicitante tbody button.info-user-view', function () {
        var data = table.row($(this).parent().parent().parent()).data();
        if ($("#tablaPublicos").is(":visible")) {
            informacionSolicitantesPP(data[2], 1, false);
        }
        if ($("#tablaPrivados").is(":visible")) {
            informacionSolicitantesPP(data[2], 2, false);
        }
        if ($("#tablaParticular").is(":visible")) {
            informacionSolicitantesP(data[2], 3, false);
        }
        if ($("#tablasInactivos").is(":visible")) {
            if ($("#tablaSoliPPInact").is(":visible")) {
                if (data[2] == "PUBLICO") {
                    informacionSolicitantesPP(data[3], 1, false);
                } else if (data[2] == "PRIVADO") {
                    informacionSolicitantesPP(data[3], 2, false);
                }
            } else if ($("#tablaSoliPInact").is(":visible")) {
                informacionSolicitantesP(data[2], 3, false);
            }
        }
    });
}


estatusSolicitantes();

function estatusSolicitantes() {
    $(document).on('click', '#historialSolicitante tbody button.est-user-view:visible', function () {
        dataTableSolicitante = table.row($(this).parent().parent().parent()).data();
        if ($("#tablaPrivados").is(":visible") || $("#tablaPublicos").is(":visible") || $("#tablaParticular").is(":visible")) {
            $("#modalEstatus p.heading").text("¿Esta seguro que desea inavilitar al Solicitante?");
            $("#modalEstatus #times").show();
            $("#modalEstatus #check").hide();
            estatusS = 2;
        }
        if ($("#tablasInactivos").is(":visible")) {
            $("#modalEstatus p.heading").text("¿Esta seguro que desea avilitar al Solicitante?");
            $("#modalEstatus #times").hide();
            $("#modalEstatus #check").show();
            estatusS = 1;
        }
        $("#modalEstatus").modal('show');
    });
}

$(document).on('click', "#modalEstatus a[value='1'].btn", function () {
    if ($("#historialUsuarios").is(":visible")) {
        estatusUsuario(dataTableUsuario[4], estatusU);
    } else if ($("#historialSolicitante").is(":visible")) {

        if ($("#tablaPrivados").is(":visible") || $("#tablaPublicos").is(":visible")) {
            estatusSolicitante(dataTableSolicitante[2], estatusS, true);
        } else if ($("#tablaParticular").is(":visible")) {
            estatusSolicitante(dataTableSolicitante[2], estatusS, false);
        } else if ($("#tablasInactivos").is(":visible")) {

            if ($("#tablaSoliPPInact").is(":visible")) {
                estatusSolicitante(dataTableSolicitante[3], estatusS, true);
            } else if ($("#tablaSoliPInact").is(":visible")) {
                estatusSolicitante(dataTableSolicitante[2], estatusS, false);
            }
        }

    }

});


// Activar Historial de peticiones


$("#opcionPeticiones div ul li a.hist").click(function () {
    activarHistorialPeticiones('main');
});

function activarHistorialPeticiones(id) {
    $("#" + id).removeClass("m-0 p-0").load("Vista/Contenido/Historiales/HistorialPeticiones/contenido.php", function () {
        $("#TablaPlanificadas,#TablaFinalizadas").hide();
        $("#TablaPlanificadas").attr("value", "a");
        $("#historialPeticionesEspera").DataTable().destroy();
        HistorialPeticionEspera();
        $("#Espera").click(function () {
            if ($("#TablaEspera").is(":hidden")) {
                PeticionesEspera();
            }
        });
        $("#Planificadas").click(function () {
            if ($("#TablaPlanificadas").is(":hidden")) {
                PeticionesPlanificadas();
            }
        });
        $("#Finalizadas").click(function () {
            if ($("#TablaFinalizadas").is(":hidden")) {
                PeticionesFinalizadas();
            }
        });
    });

}

// actualizarUsuarioHistorial();

function PeticionesEspera() {
    $("#historialPeticionesEspera").DataTable().destroy();
    HistorialPeticionEspera();
    $("#TablaEspera:hidden").addClass("animated fadeInLeft").show().attr("value", "0");
    $("#TablaPlanificadas").hide().attr("value", "a");
    $("#TablaFinalizadas").hide();
}

function PeticionesPlanificadas() {
    $("#historialPeticionesPlanificadas").DataTable().destroy();
    historialPeticionPlanificadas();
    $("#TablaEspera").hide();
    if ($("#TablaPlanificadas").attr("value") == "a") {
        $("#TablaPlanificadas:hidden").removeClass("fadeInLeft").addClass("animated fadeInRight").show().attr("value", "0");
    } else {
        $("#TablaPlanificadas:hidden").removeClass("fadeInRight").addClass("animated fadeInLeft").show().attr("value", "a");
    }
    $("#TablaFinalizadas").hide();
}

function PeticionesFinalizadas() {
    $("#historialPeticionesFinalizadas").DataTable().destroy();
    HistorialPeticionFinalizadas();
    $("#TablaEspera").hide();
    $("#TablaPlanificadas").hide().attr("value", "0");
    $("#TablaFinalizadas:hidden").addClass("animated fadeInRight").show().attr("value", "a");
}

// activar formulario peticion

$(document).on('click', '#opcionPeticiones div ul li a.add', activarFormularioPeticiones);
$(document).on('click', '#historialPeticiones ~ div a.add  ', function () {
    activarFormularioPeticiones(1);
});

$(document).on('click', '#Regresar', function () {
    activarHistorialPeticiones('main');
});

function activarFormularioPeticiones(regresarP = 0) {
    regresarPe = regresarP;
    $("#main").removeClass("m-0 p-0").load("Vista/Contenido/Formularios/formularioPeticionVia.html", function () {
        //Carga del mapa
        //initializeMap("map-container-2");

        activarDataTable('historialPeticionesSolicitante');
        $("#cargarHistorialSolicitante").hide();
        $("#regresarSoli").hide();
        if (regresarPe == 1) {
            $("#Regresar").show(600);
        } else {
            $("#Regresar").hide();
        }


        avtivarHistorialSolicitante('cargarHistorialSolicitante');

        $('#formularioPeticionVia .mdb-select').material_select();

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = dd + '/' + mm + '/' + yyyy;

        $("#sfecha").attr('data-value', today);

        $('.datepicker').pickadate({
            monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
                'Noviembre', 'Diciembre'
            ],
            weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vie', 'Sab'],
            monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
            today: 'Hoy',
            clear: 'Borrar',
            close: 'Cerrar',
            selectYears: true,
            selectMonths: true,
            formatSubmit: 'yyyy/mm/dd',
            container: "#main"
        });

        $(document).on('dblclick', '#historialSolicitantePriv tbody tr, #historialSolicitantePubl tbody tr, #historialSolicitantePart tbody tr', function () {
            var data = table.row(this).data();
            PeticionSolicitante(data[2]);
            $("#code").val(data[2]).siblings("label").addClass("active");
            $("#nameSolic").val(data[1]).siblings("label").addClass("active");
            $("#formularioPeticionVia").addClass("animated fadeInLeft").show();
            $("#cargarHistorialSolicitante").hide();
            $("#regresarSoli").hide(600);
            $("#sfecha").removeAttr("disabled");
            $("#motivo").removeAttr("disabled");
            if (regresarPe == 1) {
                $("#Regresar").show(600);
            } else {
                $("#Regresar").hide();
                $('#petSoli').show();
            }
        });

    });
}

informacionPeticionSolicitante();

function informacionPeticionSolicitante() {
    $(document).on('click', '#historialPeticionesSolicitante tbody button.info-user-view', function () {
        var data = table.row($(this).parent().parent().parent()).data();
        if (data[3] == 'ESPERA') {
            InformacionPeticionesA(data[1], 1);
        } else if (data[3] == 'PLANIFICADA') {
            InformacionPeticionesA(data[1], 2);
        } else if (data[3] == 'ATENDIDA') {
            InformacionPeticionesA(data[1], 3);
        }

    });
}


$(document).on('click', '#addonSolicitante', function () {
    $("#formularioPeticionVia").hide();
    $("#historialSolicitantePriv").DataTable().destroy();
    historialSolicitantePP(2);
    $("#cargarHistorialSolicitante").addClass("animated fadeInRight").show();
    $("#regresarSoli").show(600);
    $("#cargarHistorialSolicitante div.fixed-action-btn").css('top', '100%');
    $("#Regresar").hide();
});

$(document).on('click', '#btnRegresarSoli', function () {
    $("#formularioPeticionVia").addClass("animated fadeInLeft").show();
    $("#cargarHistorialSolicitante").hide();
    $("#regresarSoli").hide(600);
    if (regresarPe == 1) {
        $("#Regresar").show(600);
    } else {
        $("#Regresar").hide();
    }
});

$(document).on('click', '#guarsarSolicitud', function () {
    if ($("#code").val().length != 0) {
        $("#code").removeClass("invalid").addClass("valid");
    }
    if ($("#nameSolic").val().length != 0) {
        $("#nameSolic").removeClass("invalid").addClass("valid");
    }
    if ($("#Corde").val().length != 0) {
        $("#Corde").removeClass("invalid").addClass("valid");
    }
    validar($("#solicitudInspec"));
});

informacionPeticion();

function informacionPeticion() {
    $(document).on('click', '#historialPeticiones tbody button.info-user-view,#historialInspeccion tbody button.info-user-view', function () {
        var data = table.row($(this).parent().parent().parent()).data();
        if ($("#TablaEspera").is(":visible")) {
            InformacionPeticionesE(data[1], false);
        }
        if ($("#TablaPlanificadas,#tablaIPlanificadas").is(":visible")) {
            InformacionPeticionesP(data[1]);
        }
        if ($("#TablaFinalizadas").is(":visible")) {
            if (data[11] == 'ESPERA') {
                InformacionPeticionesA(data[1], 1);
            } else if (data[11] == 'PLANIFICADA') {
                InformacionPeticionesA(data[1], 2);
            } else if (data[11] == 'ATENDIDA') {
                InformacionPeticionesA(data[1], 3);
            }
        }
        if ($("#tablaIRealizadas").is(":visible")) {
            if (data[11] == 'ESPERA') {
                InformacionInspeccionA(data[1], 1);
            } else if (data[11] == 'PLANIFICADA') {
                InformacionInspeccionA(data[1], 2);
            } else if (data[11] == 'ATENDIDA') {
                InformacionInspeccionA(data[1], 3);
            }
        }
    });
}

// Formulario de inspecciones 


$("#opcionInspecciones div ul li a.add").on("click", planificarInspeccion);

function planificarInspeccion() {
    $("#main").removeClass("m-0 p-0").load("Vista/Contenido/Formularios/formularioInspeccionVia.html", function () {

        //initializeMap("map-container-3");

        $("#cargarHistorialUsuarios").hide();
        $("#regresarInspeccion").hide();

        $("#cargarHistorialPeticiones").hide();

        $("#encargado").val(datosDelUsuario['nombre'] + " " + datosDelUsuario['apellido']).siblings("label").addClass("active");
        $("#encargadoCi").val(datosDelUsuario['ci']).siblings("label").addClass("active");

        $('#inspeccionvia .mdb-select').material_select();

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = dd + '/' + mm + '/' + yyyy;

        $("#planifecha").attr('data-value', today);

        $('#planifecha.datepicker').pickadate({
            monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
                'Noviembre', 'Diciembre'
            ],
            weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vie', 'Sab'],
            monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
            today: 'Hoy',
            clear: 'Borrar',
            close: 'Cerrar',
            selectYears: true,
            selectMonths: true,
            formatSubmit: 'yyyy/mm/dd',
            container: "#main"
        });


        $(document).on('dblclick', '#historialUsuarioAdm tbody tr, #historialUsuarioIng tbody tr', function () {
            var data = table.row(this).data();

            $("#encargado").val(data[1]).siblings("label").addClass("active");
            $("#encargadoCi").val(data[2]).siblings("label").addClass("active");

            $("#formulariInspeccionvia").addClass("animated fadeInLeft").show();
            $("#cargarHistorialUsuarios").hide();
            $("#regresarInspeccion").hide(600);

        });


        $(document).on('dblclick', '#historialPeticionesEspera tbody tr', function () {
            var data = table.row(this).data();

            CoordenadasPet(data[1], 'map-container-3');
            $("#SolicitanteIns").val(data[2]).siblings("label").addClass("active");
            $("#CodePet").val(data[1]).siblings("label").addClass("active");
            $("#nombreVia").val(data[5]).siblings("label").addClass("active");
            $("#formulariInspeccionvia").addClass("animated fadeInLeft").show();
            $("#cargarHistorialPeticiones").hide();
            $("#regresarInspeccion").hide(600);
            $('.mdb-select').material_select('destroy');
            $("#planifecha").removeAttr("disabled");
            $('.mdb-select').material_select();

        });

    });
}

// fin formulario inspeccion 


$(document).on('click', '.addEncarg', function (e) {
    encargado = this;
    activarHistorialUsuarios('cargarHistorialUsuarios');
    $("#formulariInspeccionvia").hide();
    $("#historialUsuarioAdm").DataTable().destroy();
    historialUsuarioAdm();
    $("#cargarHistorialUsuarios").addClass("animated fadeInRight").show();
    $("#regresarInspeccion").show(600);
    if (datosDelUsuario['tuser'] == 2) {
        setTimeout(function () {
            $("#cargarHistorialUsuarios div.fixed-action-btn").remove();
        }, 300);
    } else {
        setTimeout(function () {
            $("#cargarHistorialUsuarios div.fixed-action-btn").css('top', '100%');
        }, 300);
    }
});

$(document).on('click', '#addonCodePet', function () {
    activarHistorialPeticiones('cargarHistorialPeticiones');
    $("#formulariInspeccionvia").hide();
    $("#historialPeticionesEspera").DataTable().destroy();
    HistorialPeticionEspera();
    $("#cargarHistorialPeticiones").addClass("animated fadeInRight").show();
    $("#regresarInspeccion").show(600);
    setTimeout(function () {
        $("#cargarHistorialPeticiones div.fixed-action-btn").css('top', '100%');
    }, 300);

});

$(document).on('click', '#btnRegresarInsp', function () {
    $("#formulariInspeccionvia").addClass("animated fadeInLeft").show();
    $("#cargarHistorialUsuarios").hide();
    $("#cargarHistorialPeticiones").hide();
    $("#regresarInspeccion").hide(600);

});


$(document).on('click', '#guarsarPlanificacionInspeccion', function () {
    if ($("#CodePet").val().length > 0) {
        $("#CodePet").removeClass('invalid').addClass('valid');
    }
    if ($("#SolicitanteIns").val().length > 0) {
        $("#SolicitanteIns").removeClass('invalid').addClass('valid');
    }
    if ($("#nombreVia").val().length > 0) {
        $("#nombreVia").removeClass('invalid').addClass('valid');
    }
    validar($("#FormularioPlanificacionInspeccion"));
});


// inicio historial inspeciones 

$("#opcionInspecciones div ul li a.hist").on("click", function () {
    activarHistorialInspeciones('main');
});

function activarHistorialInspeciones(e) {
    $("#" + e).removeClass("m-0 p-0").load("Vista/Contenido/Historiales/HistorialInspeccion/contenido.php", function () {

        listarMaterial(2);
        listarDano(2);
        listarMaquina(2);

        $("#tablaIRealizadas").hide();
        $("#historialInspeccionesPlanificadas").DataTable().destroy();
        historiaInspeccionPlanificadas();
        $("#IPlanificadas").click(function () {
            if ($("#tablaIPlanificadas").is(":hidden")) {
                InspeccionPlanificada();
            }
        });
        $("#IRalizadas").click(function () {
            if ($("#tablaIRealizadas").is(":hidden")) {
                InspeccionRealizada();
            }
        });

        $(document).on('dblclick', '#historialInspeccionesPlanificadas tbody tr', function () {
            var data = table.row(this).data();
            activarModalFinalizarInspeccion(data);
        });


    });
}

function activarModalFinalizarInspeccion(e) {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = dd + '/' + mm + '/' + yyyy;

    $("#finInspFecha").attr('data-value', today);

    $('#finInspFecha.datepicker').pickadate({
        monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
            'Noviembre', 'Diciembre'
        ],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vie', 'Sab'],
        monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        today: 'Hoy',
        clear: 'Borrar',
        close: 'Cerrar',
        selectYears: true,
        selectMonths: true,
        formatSubmit: 'yyyy/mm/dd',
        container: "#main"
    });

    $("#codigoPlanificacionInspeccion").val(e[2]).siblings("label").addClass("active");
    $("#InspEncargado").val(e[3]).siblings("label").addClass("active");
    $('#modalFinalizarInspeccion .mdb-select').material_select('destroy');
    $('#modalFinalizarInspeccion .mdb-select').material_select();
    $("#modalFinalizarInspeccion").modal('show');
}

function InspeccionPlanificada() {
    $("#historialInspeccionesPlanificadas").DataTable().destroy();
    historiaInspeccionPlanificadas();
    $("#tablaIPlanificadas:hidden").addClass("animated fadeInLeft").show();
    $("#tablaIRealizadas").hide();
}

function InspeccionRealizada() {
    $("#historialInspeccionesRealizadas").DataTable().destroy();
    historiaInspeccionAtendia();
    $("#tablaIRealizadas:hidden").addClass("animated fadeInRight").show();
    $("#tablaIPlanificadas").hide();
}

// fin historial inspeccion 

// Materiales Daños y Equipo 

$("#opcionDañosEquipos a.open").on("click", dañosEquipo);

function dañosEquipo() {
    $("main").removeClass("m-0 p-0").load("Vista/Contenido/DanosMaterialesEquipo/DanosEquipo.html", function () {

        $("#addMat,#btnGuardarMaterial").off("click");
        $("#addDano,#btnGuardarDano").off("click");
        $("#addMaq,#btnGuardarMaquina").off("click");

        $("#contMat div[nm], #contDa div[nd], #contMaq div[nmq]").remove();
        listarMaterial(1);
        listarDano(1);
        listarMaquina(1);

        //Materiales
        $("#addMat").on("click", function () {
            $("#modalMaterial").modal("show");
        });

        $("#btnGuardarMaterial").on("click", function () {
            validar($("#modalMaterial"));
        });

        //Daños
        $("#addDano").on("click", function () {
            $("#modalDano").modal("show");
        });

        $("#btnGuardarDano").on("click", function () {
            validar($("#modalDano"));
        });

        //Maquinas
        $("#addMaq").on("click", function () {
            $("#modalMaquina").modal("show");
        });

        $("#btnGuardarMaquina").on("click", function () {
            validar($("#modalMaquina"));
        });

    });

}

function resetModalEquipos(e) {
    var id = e.parent().parent().parent().parent().parent().attr('id');
    $("#" + id).on("hide.bs.modal", function () {
        $("#" + id + " label").removeClass("active");
        $("#" + id + " input,#" + id + " textarea").removeClass("valid invalid is-valid is-invalid");
        $("#" + id + " input,#" + id + " textarea").val("");
    });
}


function loadCardMDM(a, e) {
    for (var i = 0; i < a.length; i++) {

        newCaja =
            '<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 my-4 ">' +
            '<div class="card card-height ">' +
            '<div class="card-body ">' +
            '<h5 class="card-title text-center">' + a[i]["nombre"] + '</h5> ' +
            '<p class="card-text fix-overflow">' + a[i]["descripcion"] + '</p>' +
            '</div>' +
            '<div class="card-footer transparente"><a class="card-link">Mas informacion</a></div>' +
            '</div>' +
            '</div>';

        $("#" + e).before(newCaja);
    }
}

function addCardMDM(a, e) {
    newCaja =
        '<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 my-4">' +
        '<div class="card card-height ">' +
        '<div class="card-body ">' +
        '<h5 class="card-title text-center">' + a["nombre"] + '</h5> ' +
        '<p class="card-text fix-overflow">' + a["descripcion"] + '</p>' +
        '</div>' +
        '<div class="card-footer transparente"><a class="card-link">Mas informacion</a></div>' +
        '</div>' +
        '</div>';

    $("#" + e).before(newCaja);
}

//Fin materiales Daño y Equipo

//listar Materiales Equipo y Daños en formularios

function ListSelectMDM(a, b, c) {
    $('#' + b).empty();
    var op = '<option value="0" disabled selected class="none" >' + c + '</option>';
    $("#" + b).append(op);
    for (var i = 0; i < a.length; i++) {
        var z = $("<option>").attr("value", a[i]["id"]).text(a[i]["nombre"]);
        $("#" + b).append(z);
    }
    $('#' + b + ' .mdb-select').materialSelect('destroy');
    $('#' + b + ' .mdb-select').materialSelect();
}

$(document).on('click', '#FinalizarInspeccion', function () {
    validar($('#FormFinalizarInspeccion'));
});

//Obras 

$("#opcionObra a.add").on("click", formObra);

function formObra() {

    $("#main").removeClass("m-0 p-0").load("Vista/Contenido/Formularios/planObra.html", function () {

        $("#RegresarObra").hide();

        $("#encargadoObra").val(datosDelUsuario["nombre"]).siblings("label").addClass("active");
        $("#encargadoCiObra").val(datosDelUsuario["ci"]).siblings("label").addClass("active");

        //initializeMap("map-container-4");


        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = dd + '/' + mm + '/' + yyyy;

        $("#fehaObraAten").attr('data-value', today);

        $('.mdb-select').material_select('destroy');
        $('.datepicker').pickadate({
            monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
                'Noviembre', 'Diciembre'
            ],
            weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vie', 'Sab'],
            monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
            today: 'Hoy',
            clear: 'Borrar',
            close: 'Cerrar',
            selectYears: true,
            selectMonths: true,
            formatSubmit: 'yyyy/mm/dd',
            container: "#main"
        });

        $('#formulariInspeccionvia .mdb-select').material_select();

        $("#historialUsuarioAdm tbody tr, #historialUsuarioIng tbody tr").off("dblclick");

        $(document).on('dblclick', '#historialUsuarioAdm tbody tr, #historialUsuarioIng tbody tr', function () {
            var data = table.row(this).data();
            $("#encargadoObra").val(data[1]).siblings("label").addClass("active");
            $("#encargadoCiObra").val(data[2]).siblings("label").addClass("active");

            $("#formularioPlanObra").addClass("animated fadeInLeft").show();
            $("#cargarHistorialUsuariosObra").hide();
            $("#RegresarObra").hide(600);

        });

        $(document).on('dblclick', '#historialInspeccionesRealizadas tbody tr', function () {
            var data = table.row(this).data();

            if (data[11] == 'ESPERA') {
                CoordenadasPet(data[1], 'map-container-4');
                $("#idInspec").val(data[2]).siblings("label").addClass("active");
                $("#nombreVia").val(data[8]).siblings("label").addClass("active");
                $("#encPet").val(data[3]).siblings("label").addClass("active");

                $("#formularioPlanObra").addClass("animated fadeInLeft").show();
                $("#cargarHistorialInspeccionesObra").hide();
                $("#RegresarObra").hide(600);
                $('.mdb-select').material_select('destroy');
                $("#fehaObraAten").removeAttr("disabled");
                $('.mdb-select').material_select();
            }
        });

    });

}

$(document).on('click', '.addEncargObra', function (e) {
    encargado = this;
    activarHistorialUsuarios('cargarHistorialUsuariosObra');
    $("#formularioPlanObra").hide();
    $("#historialUsuarioAdm").DataTable().destroy();
    historialUsuarioAdm();
    $("#cargarHistorialUsuariosObra").addClass("animated fadeInRight").show(function () {
        $("#RegresarObra").show(1500);
        if (datosDelUsuario['tuser'] == 2) {
            setTimeout(function () {
                $("#cargarHistorialUsuariosObra div.fixed-action-btn").remove();
            }, 300);
        } else {
            setTimeout(function () {
                $("#cargarHistorialUsuariosObra div.fixed-action-btn").css('top', '100%');
            }, 300);
        }
    });
});

$(document).on('click', '#addonidObra', function () {
    activarHistorialInspeciones('cargarHistorialInspeccionesObra')
    $("#formularioPlanObra").hide();
    $("#historialInspeccionesPlanificadas").DataTable().destroy();
    HistorialPeticionEspera();
    $("#cargarHistorialInspeccionesObra").addClass("animated fadeInRight").show(function () {
        $("#RegresarObra").show(1500);
    });
    setTimeout(function () {
        $("#cargarHistorialInspeccionesObra div.fixed-action-btn").css('top', '100%');
    }, 300);

});

$(document).on('click', '#btnRegresarObra', function () {
    $("#formularioPlanObra").addClass("animated fadeInLeft").show();
    $("#cargarHistorialUsuariosObra").hide();
    $("#cargarHistorialInspeccionesObra").hide();
    $("#RegresarObra").hide(600);
});


$(document).on('click', '#guardarPlanificacionObra', function () {
    if ($("#idInspec").val().length > 0) {
        $("#idInspec").removeClass('invalid').addClass('valid');
    }
    if ($("#encPet").val().length > 0) {
        $("#encPet").removeClass('invalid').addClass('valid');
    }
    if ($("#nombreVia").val().length > 0) {
        $("#nombreVia").removeClass('invalid').addClass('valid');
    }
    validar($("#FormularioPlanificacionObra"));
});

// inicio historial Obras

$("#opcionObra div ul li a.hist").on("click", function () {
    activarHistorialOBra('main');
});

function activarHistorialOBra(e) {

    $("#" + e).removeClass("m-0 p-0").load("Vista/Contenido/Historiales/HistorialObras/contenido.php", function () {

        listarMaterial(3);
        listarMaquina(3);

        $("#tablaORealizadas").hide();
        $("#historialObrasPlanificadas").DataTable().destroy();
        HistoriaObrasPlanificadas();
        $("#OPlanificadas").click(function () {
            if ($("#tablaOPlanificadas").is(":hidden")) {
                ObrasPlanificada();
            }
        });
        $("#ORalizadas").click(function () {
            if ($("#tablaORealizadas").is(":hidden")) {
                ObrasRealizada();
            }
        });

        $(document).on('dblclick', '#historialObrasPlanificadas tbody tr', function () {
            var data = table.row(this).data();
            activarModalFinalizarReparacion(data);
        });


    });

}

function activarModalFinalizarReparacion(e) {

    $("#FinalizarReparacion").on("click", function () {
        validar($("#modalFinalizarReparacion"));
    });

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = dd + '/' + mm + '/' + yyyy;

    $("#fechaRepFinal").attr('data-value', today);

    $('#fechaRepFinal.datepicker').pickadate({
        monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
            'Noviembre', 'Diciembre'
        ],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vie', 'Sab'],
        monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        today: 'Hoy',
        clear: 'Borrar',
        close: 'Cerrar',
        selectYears: true,
        selectMonths: true,
        formatSubmit: 'yyyy/mm/dd',
        container: "#main"
    });

    $("#codigoObra").val(e[2]).siblings("label").addClass("active");
    $("#direcObra").val(e[3]).siblings("label").addClass("active");
    $('#modalFinalizarReparacion .mdb-select').material_select('destroy');
    $('#modalFinalizarReparacion .mdb-select').material_select();
    $("#modalFinalizarReparacion").modal('show');
}

$("#agregarMaterial").on("click", function (e) {
    if (validarFinObra($("#secMatr div.row:last"))) {

        n = $("#agregarMaterial").attr("mtr");

        n++;

        $("#agregarMaterial").attr("mtr", n);

        var model =
            '<div class="row" id="materiales' + n + '">' +

            '<div class="col-5">' +
            '<select class="mdb-select md-form mat" id="material' + n + '" name="material" searchable="Buscar...">' +
            '<option value="0" selected disabled>Materiales</option>' +
            '</select>' +
            '</div>' +

            '<div class="col-3">' +
            '<div class="md-form">' +
            '<input type="number" id="cantidadMaterial0" name="cantidadMaterial" class="form-control validate" max="99999" placeholder="Cantidad">' +
            '</div>' +
            '</div>' +

            '<div class="col-3">' +
            '<select class="mdb-select md-form" id="cUni' + n + '" name="cUni">' +
            '<option value="0" disabled selected>Unidad</option>' +
            '<option value="1">Kg</option>' +
            '<option value="2">Tn</option>' +
            '</select>' +
            '</div>' +

            '<div class="col-1">' +
            '<span class="md-addon md-addon-a">' +
            '<a  mtr="' + n + '" class="waves-effect d-material">' +
            '<i class="fas fa-minus"></i>' +
            '</a>' +
            '</span>' +
            '</div>' +
            '</div>';

        $("#secMatr div.row:last").after(model);
        $('#secMatr div.row:last').hide().show(600);
        $('#modalFinalizarReparacion .mdb-select').material_select('destroy');
        $('#modalFinalizarReparacion .mdb-select').material_select();
        listarMaterial(3);

    } else {
        if ($('#secMatr div.row:last select[name="material"] option:selected').val() != 0) {
            $('#secMatr div.row:last select[name="material"]').siblings('input').addClass('valid').removeClass('invalid');
        } else {
            $('#secMatr div.row:last select[name="material"]').siblings('input').addClass('invalid').removeClass('valid');
        }

        if ($('#secMatr div.row:last select[name="cUni"] option:selected').val() != 0) {
            $('#secMatr div.row:last select[name="cUni"]').siblings('input').addClass('valid').removeClass('invalid');
        } else {
            $('#secMatr div.row:last select[name="cUni"]').siblings('input').addClass('invalid');
        }

        if ($('#secMatr div.row:last input[name="cantidadMaterial"]').val() > 0) {
            $('#secMatr div.row:last input[name="cantidadMaterial"]').addClass('valid').removeClass('invalid');
        } else {
            $('#secMatr div.row:last input[name="cantidadMaterial"]').addClass('invalid');
        }

    }

});

function validarFinObra(a) {
    var val = '';
    console.log(a);
    e = a.find("input:visible:not(.select-dropdown):not(.controls), select:hidden:not(.off), textarea:visible");
    console.log(e);

    for (var i = 0; i < e.length; i++) {
        switch (e[i].name) {
            case 'cantidadMaterial':
                console.log('-------------------------------------------------');
                console.log(e[i]);
                console.log("CantidadMaterial");
                console.log(e[i].name + " : " + e[i].value);
                if (e[i].value == "" || e[i].value == 0) {
                    $('#secMatr div.row:last input[name="cantidadMaterial"]').addClass('invalid').removeClass('valid');
                    val = 'e';
                } else {
                    $('#secMatr div.row:last input[name="cantidadMaterial"]').addClass('valid').removeClass('invalid');
                    val++;
                }
                break;
            case 'material':
                console.log('-------------------------------------------------');
                console.log(e[i]);
                console.log("Material");
                console.log(e[i].name + " : " + e[i].value);
                if (e[i].selectedOptions[0].value == 0) {
                    $('#secMatr div.row:last select[name="material"]').siblings('input').addClass('invalid').removeClass('valid');
                    val = 'e';
                } else {
                    $('#secMatr div.row:last select[name="material"]').siblings('input').addClass('valid').removeClass('invalid');
                    val++;
                }
                break;
            case 'cUni':
                console.log('-------------------------------------------------');
                console.log(e[i]);
                console.log("select-one");
                console.log(e[i].name + " : " + e[i].selectedOptions[0].value);
                if (e[i].selectedOptions[0].value == 0) {
                    $('#secMatr div.row:last select[name="cUni"]').siblings('input').addClass('invalid').removeClass('valid');
                    val = 'e';
                } else {
                    $('#secMatr div.row:last input[name="cantidadMaterial"]').addClass('valid').removeClass('invalid');
                    val++;
                }
        }

    }
    if (!isNaN(val)) {
        return true;
    } else {
        return false;
    }

}

$(document).on('click', '.d-material', function (e) {
    var c = $(this).parent().parent().parent().hide('600');
    setTimeout(function () {
        c.remove();
    }, 600);
});

function ObrasPlanificada() {
    $("#historialObrasPlanificadas").DataTable().destroy();
    HistoriaObrasPlanificadas();
    $("#tablaOPlanificadas:hidden").addClass("animated fadeInLeft").show();
    $("#tablaORealizadas").hide();
}

function ObrasRealizada() {
    $("#historialObrasRealizadas").DataTable().destroy();
    HistoriaObrasFinalizadas();
    $("#tablaORealizadas:hidden").addClass("animated fadeInRight").show();
    $("#tablaOPlanificadas").hide();
}

informacionObra();

function informacionObra() {
    $(document).on('click', '#historialObra tbody button.info-user-view', function () {
        var data = table.row($(this).parent().parent().parent()).data();
        if ($("#tablaOPlanificadas").is(":visible")) {
            InformacionObraAF(data[1], 1);
        }
        if ($("#tablaORealizadas").is(":visible")) {
            InformacionObraAF(data[1], 2);
        }
    });
}

//Fin Obras

// Notificaciones
function notificacion() {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": 1000,
        "hideDuration": 1000,
        "timeOut": 3000,
        "extendedTimeOut": 1000,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}