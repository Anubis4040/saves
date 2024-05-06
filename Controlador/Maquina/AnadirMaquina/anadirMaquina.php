<?php 
    namespace Controlador\Maquina\AnadirMaquina;

    require_once('../../../autoload.php');
    use Modelo\Maquina\Maquina;     
    //echo __FILE__;

      //echo __FILE__;   
      $a = $_POST['NAME'];
      $b = $_POST['DESCP'];    

      if($a != NULL && $b != NULL){       
            $maquina = new Maquina($a,$b);
            $info = $maquina->AgregarMaquina();            
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($info);     
      }

?>