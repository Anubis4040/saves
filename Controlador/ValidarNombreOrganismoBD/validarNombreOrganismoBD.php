<?php namespace Controlador\ValidarNombreOrganismoBD;
    require_once('../../autoload.php');
    
    use Modelo\Organizacion\Organizacion;  

    //echo __FILE__;

    $a = $_POST['NOMBRE'];    

    if($a != NULL){       
        $orgnizacion = new Organizacion();
        $orgnizacion->SetOrganismo($a);
        $info = $orgnizacion->ValidarNombreOrganismoBD(); 
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info);      
    }   
    
?>