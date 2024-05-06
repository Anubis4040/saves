<?php namespace Modelo\Organizacion;

    use Modelo\BaseDatos\ConexionBaseDatos;

    class Organizacion extends ConexionBaseDatos {

        protected $idOrganizacion;
        protected $organizacion;
        protected $rifOrg;
        protected $tipoOrg;
        protected $estatus;
        protected $conexion;

        public function __construct ($organizacion = '', $rifOrg = '000000000000', $tipoOrg = '1', $estatus = '' ){

            parent::__Construct();
            $this->conexion = self::$conexionBD;  
            $this->organizacion = htmlentities(addslashes($organizacion));
            $this->rifOrg = $rifOrg;
            $this->tipoOrg = $tipoOrg;
            $this->estatus = $estatus;  
        }

        public function SetOrganizacion($tipoOrg,$rifOrg,$organizacion){
            $this->organizacion = htmlentities(addslashes($organizacion));
            $this->rifOrg = $rifOrg;
            $this->tipoOrg = $tipoOrg;
        }

        public function SetTipoOrg($tipoOrg){
            $this->tipoOrg = $tipoOrg;
        }

        public function GetTipoOrg(){
            return $this->tipoOrg;
        }

        public function SetRif($rifOrg){
            $this->rifOrg = $rifOrg;
        }

        public function GetRif(){
            return $this->rifOrg;
        }

        public function SetOrganismo($organizacion){
            $this->organizacion = htmlentities(addslashes($organizacion));
        }

        public function GetIdOrganizacion(){
          return $this->idOrganizacion;
        }

        public function AgregarOrganismo(){

            try{

                if($this->organizacion == null){
                    $this->organizacion = 'null';
                }

                $informe = array();

                $sql = "INSERT INTO organizacion (nombre,tipo,rif) VALUES (:no, :tp, :rif)";
        
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":no" => $this->organizacion,
                    ":tp" => $this->tipoOrg,
                    ":rif" => $this->rifOrg                                
                ));                

                $resultado = $query;
               
                $rowAfIn = $resultado->rowCount();
                
                if ($rowAfIn == 0) {
                    $informe['errorSms'] = $resultado->errorInfo();
                } else {
                    $informe['rowAf'] = $rowAfIn;
                    $this->idOrganizacion = $this->conexion->lastInsertId(); 
                }


            }catch(\PDOException $e){                
                die("Error: " . $e->getMessage() . "<br>Archivo: " . $e->getFile());              
            }

        }

        public function ValidarRifOrganismoBD() {

            $informe = array();

            try{                
            
                $sql = "SELECT * FROM organizacion WHERE rif = :rif";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":rif" => $this->rifOrg
                ));
                
                $resultado = $query;               
                
                $rowAfIn = $resultado->rowCount();
                
                if ($rowAfIn == 0) {
                    $informe['rowAf']    = $rowAfIn;
                    $informe['errorSms'] = $resultado->errorInfo();
                } else {
                    $informe['rowAf'] = $rowAfIn;
                }

            }catch(\PDOException $e){
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }                  
            
            return $informe;
        }

        public function ValidarNombreOrganismoBD() {

            $informe = array();

            try{                
            
                $sql = "SELECT * FROM organizacion WHERE nombre = :nom";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":nom" => $this->organizacion
                ));
                
                $resultado = $query;               
                
                $rowAfIn = $resultado->rowCount();
                
                if ($rowAfIn == 0) {
                    $informe['rowAf']    = $rowAfIn;
                    $informe['errorSms'] = $resultado->errorInfo();
                } else {
                    $informe['rowAf'] = $rowAfIn;
                }

            }catch(\PDOException $e){
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }                  
            
            return $informe;
        }




    }


?>