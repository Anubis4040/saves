<?php

    namespace Modelo\Coordenada;

    use Modelo\BaseDatos\ConexionBaseDatos;

    class Coordenada extends ConexionBaseDatos {

        protected $idCoordenada;
        protected $latitud;
        protected $longitud;
        protected $informacion;
        
        protected $conexion;
        
        public function __Construct ($latitud = '0', $longitud = '0', $informacion = '' ){

            parent::__Construct();
            $this->conexion = self::$conexionBD;         
            $this->latitud = $latitud;
            $this->longitud = $longitud;
            $this->informacion = $informacion;
        }

        public function SetCoordenadas($lat,$long,$info){
            $this->latitud = $lat; 
            $this->longitud = $long;
            $this->informacion = $info;           
        }

        public function GetIdCoordenadas(){
            return $this->idCoordenada;
          }
        

        //public function get_idCoordenada;

        public function AgregarCoordenada () {
            try{

                $informe = array();

                $sql = "INSERT INTO coordenada (latitud,longitud,informacion) 
                        VALUES (:lat, :log, :inf)";

                $query = $this->conexion->prepare($sql);

                $query ->execute(array(
                    ":lat" => $this->latitud,
                    ":log" => $this->longitud,
                    ":inf" => $this->informacion
                ));

                $resultado = $query;

                $rowAfIn = $resultado->rowCount();

                if ($rowAfIn == 0) {
                    $informe['errorSms'] = $resultado->errorInfo();                   
                } else {
                    $informe['rowAf'] = $rowAfIn;
                    $this->idCoordenada = $this->conexion->lastInsertId();                   
                }
            }

            catch (\PDOException $e) {
                die("Error: " . $e->getMessage() . "<br>Archivo: " . $e->getFile());			}

        } 
            
        

    }
