<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>SAVES</title>
    <link rel="stylesheet" href="Vista/Estilos/Librerias/all.min.css">
    <link rel="stylesheet" href="Vista/Estilos/Librerias/BTTP.css">
    <link rel="stylesheet" href="Vista/Estilos/Librerias/BTTPDT.css">
    <link rel="stylesheet" href="Vista/Estilos/Librerias/MDB.css">
    <link rel="stylesheet" href="Vista/Estilos/MisEstilos/misEstilos.css">
    <link rel="shortcut icon" href="Vista/Img/logo.png">
</head>

<body class="fixed-sn mdb-saves-skin">

    <div id="carga" class="load-bar" >
        <div  class="preloader-wrapper big active load-bar-center">
            <div class="spinner-layer spinner-yellow">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="gap-patch">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
            <div class="spinner-layer spinner-blue">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="gap-patch">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
            <div class="spinner-layer spinner-red">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="gap-patch">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
    </div>

        <div id="mdb-lightbox-ui">

<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

    <div class="pswp__bg"></div>

    <div class="pswp__scroll-wrap">

        <div class="pswp__container" style="transform: translate3d(0px, 0px, 0px);">
            <div class="pswp__item" style="display: block; transform: translate3d(-1415px, 0px, 0px);">
                <div class="pswp__zoom-wrap" style="transform: translate3d(8px, 44px, 0px) scale(1);">
                    <img class="pswp__img pswp__img--placeholder" src="../escritorio.png" style="width: 1248px; height: 832px;">
                    <img class="pswp__img" src="../escritorio.png" style="width: 1248px; height: 832px;">
                </div>
            </div>
            <div class="pswp__item" style="transform: translate3d(0px, 0px, 0px);">
                <div class="pswp__zoom-wrap" style="transform: translate3d(686.453px, 368.234px, 0px) scale(0.232319);">
                    <!-- <img class="pswp__img pswp__img--placeholder" src="../escritorio.png"
                        style="width: 1248px; height: 832px;">
                    <img class="pswp__img" src="../escritorio.png"
                        style="display: block; width: 1248px; height: 832px;"> -->
                </div>
            </div>
            <div class="pswp__item" style="display: block; transform: translate3d(1415px, 0px, 0px);">
                <div class="pswp__zoom-wrap" style="transform: translate3d(8px, 44px, 0px) scale(1);">
                    <!-- <img class="pswp__img pswp__img--placeholder" src="../escritorio.png"
                        style="width: 1248px; height: 832px;">
                    <img class="pswp__img" src="../escritorio.png"
                        style="width: 1248px; height: 832px;"> -->
                </div>
            </div>
        </div>

        <div class="pswp__ui pswp__ui--fit pswp__ui--hidden">

            <div class="pswp__top-bar">


                <div class="pswp__counter">
                    <font style="vertical-align: inherit;">
                        <font style="vertical-align: inherit;"></font>
                    </font>
                </div>

                <button class="pswp__button pswp__button--close" title="Cerrar (Esc)"></button>


                <button class="pswp__button pswp__button--fs" title="Cambiar a pantalla completa"></button>

                <button class="pswp__button pswp__button--zoom" title="Acercar / alejar"></button>

                <div class="pswp__preloader pswp__preloader--active">
                    <div class="pswp__preloader__icn">
                        <div class="pswp__preloader__cut">
                            <div class="pswp__preloader__donut"></div>
                        </div>
                    </div>
                </div>
            </div>

            <button class="pswp__button pswp__button--arrow--left" title="Anterior (flecha izquierda)">
            </button>

            <button class="pswp__button pswp__button--arrow--right" title="Siguiente (flecha derecha)">
            </button>

            <div class="pswp__caption">
                <div class="pswp__caption__center"></div>
            </div>

        </div>

    </div>

</div>
</div>

    <?php 
        require_once('autoload.php'); 
        require_once('Vista/Contenido/PaginaPricipal/contenido.html'); 
        require_once('Vista/Contenido/Modales/modalInformacionSolicitantePP.html'); 
               
        require_once('Vista/Contenido/Modales/modalEstatus.html'); 
        require_once('Vista/Contenido/Modales/modalInformacionSolicitanteP.html'); 
        require_once('Vista/Contenido/Modales/modalInformacionPeticiones.html'); 
        require_once('Vista/Contenido/Modales/modalInformacionInspecciones.html'); 
        require_once('Vista/Contenido/Modales/modalInformacionObras.html'); 
   
        require_once('Vista/Contenido/Modales/modalInformacionUsuario.html'); 
        require_once('Vista/Contenido/Modales/modalEstatus.html'); 
        require_once('Vista/Contenido/Modales/modalActualizarUsuariosHistorial.html'); 

        require_once('Vista/Contenido/Modales/modalFinalizarInspeccion.html'); 
        require_once('Vista/Contenido/Modales/modalFinalizarReparacion.html'); 

        require_once('Vista/Contenido/Modales/modalMaterial.html');
        require_once('Vista/Contenido/Modales/modalDano.html');
        require_once('Vista/Contenido/Modales/modalMaquina.html');

    ?>




    <script src="Controlador/Librerias/JQuery.js"></script>
    <script src="Controlador/Librerias/BTTP.js"></script>
    <script src="Controlador/Librerias/MDB.js"></script>
    <script src="Controlador/Librerias/JQDT.js"></script>
    <script src="Controlador/Librerias/BTTPDT.js"></script>
    <script src="Controlador/Librerias/all.min.js"></script>
    <script src="Controlador/Librerias/Poppers.js"></script>
    <script src="Controlador/Librerias/svgInject.js"></script>
    <script src="https://maps.google.com/maps/api/js?key=AIzaSyA87kIzYHa2fhpARHMcFddqWRi6H5lOLR0&v=3.31&libraries=places"></script>
    
    <script src="controlador/InfoDashBoard/infoDashBoard.js"></script>
    <script src="Controlador/CapturarDatos/capturarDatos.js"></script>
    <script src="Controlador/Validacion/validacion.js"></script>
    <script src="Controlador/IniciarSesion/iniciarSesion.js"></script>
    <script src="Controlador/CerrarSesion/cerrarSesion.js"></script>
    <script src="Controlador/ValidarSesion/validarSesion.js"></script>
    <script src="Controlador/ValidarCedulaBD/validarCedulaBD.js"></script>
    <script src="Controlador/Usuario/RegistrarPersona/registrarPersona.js"></script>
    <script src="Controlador/Usuario/EliminarPersona/eliminarPersona.js"></script>
    <script src="Controlador/ValidarUsuarioBD/validarUsuarioBD.js"></script>
    <script src="Controlador/ValidarCorreoUsuarioBD/validarCorreoUsuarioBD.js"></script>
    <script src="Controlador/ValidarCivBD/validarCivBD.js"></script>
    <script src="Controlador/Usuario/RegistrarUsuario/registrarUsuario.js"></script>
    <script src="Controlador/Historial/HistorialUsuarioAdm/historialUsuarioAdm.js"></script>
    <script src="Controlador/Historial/HistorialUsuarioIng/historialUsuarioIng.js"></script>
    <script src="Controlador/Historial/HistorialUsuarioInactivo/historialUsuarioInactivo.js"></script>
    <script src="Controlador/Historial/HistorialSolicitantePP/historialSolicitantePP.js"></script>
    <script src="Controlador/Historial/HistorialSolicitantePart/historialSolicitantePart.js"></script>
    <script src="Controlador/DataTable/activarDataTable.js"></script>

    <script src="Controlador/InformacionUsuariosRegistrados/InformacionUsuario/informacionUsuario.js"></script>    
    <script src="Controlador/Usuario/EstatusUsuario/estatusUsuario.js"></script>
    <script src="Controlador/Usuario/ActualizarUsuarioHistorial/DatosPublicos/actualizarDatosPublicos.js"></script>
    <script src="Controlador/Usuario/ActualizarUsuarioHistorial/DatosCuenta/actualizarDatosCuenta.js"></script>
    <script src="Controlador/Usuario/ResetearClave/resetearClave.js"></script>
    <script src="Controlador/ValidarRifOrganismoBD/validarRifOrganismoBD.js"></script>
    <script src="Controlador/ValidarNombreOrganismoBD/validarNombreOrganismoBD.js"></script>
    <script src="Controlador/ValidarCedulaRepresentanteBD/validarCedulaRepresentanteBD.js"></script>
    <script src="Controlador/ValidarCorreoSolicitanteBD/validarCorreoSolicitanteBD.js"></script>
    <script src="Controlador/Solicitante/RegistrarSolicitante/registrarSolicitante.js"></script>
    <script src="Controlador/Peticion/SolicitudInspeccion/solicitudInspeccion.js"></script>
    <script src="Controlador/InformacionSolicitantes/InformacionSolicitantesPP/informacionSolicitantesPP.js"></script>
    <script src="Controlador/InformacionSolicitantes/InformacionSolicitantesP/informacionSolicitantesP.js"></script>
    <script src="Controlador/Historial/HistorialSolicitanteInactivo/historialSolicitanteInactivo.js"></script>
    <script src="Controlador/Solicitante/EstatusSolicitante/estatusSolicitante.js"></script>
    <script src="Controlador/Historial/HistorialPeticionEspera/historialPeticionEspera.js"></script>
    <script src="Controlador/Historial/HistorialPeticionFinalizadas/historialPeticionFinalizadas.js"></script>
    <script src="Controlador/Historial/HistorialPeticionPlanificadas/historialPeticionPlanificadas.js"></script>
    <script src="Controlador/Historial/HistoriaInspeccionPlanificadas/historiaInspeccionPlanificadas.js"></script>
    <script src="Controlador/Historial/HistoriaInspeccionAtendida/historiaInspeccionAtendida.js"></script>
    <script src="Controlador/Historial/HistoriaObrasPlanificadas/historiaObrasPlanificadas.js"></script>
    <script src="Controlador/InformacionPeticiones/InformacionPeticionesEspera/informacionPeticionesEspera.js"></script>
    <script src="Controlador/InformacionPeticiones/InformacionPeticionesPlanificada/informacionPeticionesPlanificada.js"></script>
    <script src="Controlador/InformacionPeticiones/InformacionPeticionesAtendidas/informacionPeticionesAtendidas.js"></script>
    <script src="Controlador/InformacionInspecciones/InformacionInspeccionesAtendidas/informacionInspeccionesAtendidas.js"></script>
    <script src="Controlador/Obra/Finalizar/finalizarObra.js"></script>
    <script src="Controlador/Historial/HistoriaObrasFinalizadas/historiaObrasFinalizadas.js"></script>
    <script src="Controlador/PlanificarPetInsp/coordenadasPet.js"></script>
    <script src="Controlador/InformacionObras/InformacionObrasAF/informacionObrasAF.js"></script>
    <script src="Controlador/Peticion/PeticionSolicitante/peticionSolicitante.js"></script>

    <script src="Controlador/PlanificarPetInsp/planificarPetInsp.js"></script>
    <script src="Controlador/Inspeccion/Finalizar/finalizarInspeccion.js"></script>

    <script src="Controlador/Material/AnadirMaterial/anadirMaterial.js"></script>
    <script src="Controlador/Material/ListarMaterial/listarMaterial.js"></script>
    <script src="Controlador/Dano/AnadirDano/anadirDano.js"></script>
    <script src="Controlador/Dano/ListarDano/listarDano.js"></script>
    <script src="Controlador/Maquina/AnadirMaquina/anadirMaquina.js"></script>
    <script src="Controlador/Maquina/ListarMaquina/listarMaquina.js"></script>

    <script src="Controlador/Mapa/MapaInicio/mapaInicio.js"></script>
    <script src="Controlador/Librerias/inicio.js"></script>

</body>

</html>