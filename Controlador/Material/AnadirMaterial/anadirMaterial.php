<?php namespace Controlador\Material\AnadirMaterial;

    require_once('../../../autoload.php');
    use Modelo\Material\Material;     
    //echo __FILE__;

      //echo __FILE__;   
      $a = $_POST['NAME'];
      $b = $_POST['DESCP'];    

      if($a != NULL && $b != NULL){       
            $material = new Material($a,$b);
            $info = $material->AgregarMaterial();            
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($info);     
      }

?>