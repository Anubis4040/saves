<?php 
    namespace Controlador\Dano\AnaadirDano;

    require_once('../../../autoload.php');
    use Modelo\Dano\dano;     
    //echo __FILE__;

      //echo __FILE__;   
      $a = $_POST['NAME'];
      $b = $_POST['DESCP'];    

      if($a != NULL && $b != NULL){       
            $dano = new Dano($a,$b);
            $info = $dano->AgregarDano();            
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($info);     
      }

?>