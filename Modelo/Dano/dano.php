<?php 

    namespace Modelo\Dano;

    use Modelo\BaseDatos\ConexionBaseDatos;
    
    class Dano extends ConexionBaseDatos {

        protected $idDano;
        protected $nombre;
        protected $descripcion;

        public function __construct ($nombre = '', $descripcion = ''){

            parent::__Construct();
            $this->conexion = self::$conexionBD;  
            $this->nombre = $nombre;
            $this->descripcion = $descripcion;
        }

        public function AgregarDano () {

            try{

                $informe = array();

                $sql = "INSERT INTO dano (nombre,descripcion) VALUES (:nom,:descp)";

                $query = $this->conexion->prepare($sql);

                $query->execute(array(
                    ":nom" => $this->nombre,
                    ":descp" => $this->descripcion                              
                ));

                $resultado = $query;
               
                $rowAfIn = $resultado->rowCount();
                
                if ($rowAfIn == 0) {
                    $informe['errorSms'] = $resultado->errorInfo();
                } else {
                    $informe['rowAf'] = $rowAfIn;
                    $this->idOrganizacion = $this->conexion->lastInsertId(); 
                }

                return $informe;

            }catch(\PDOException $e){
                die("Error: " . $e->getMessage() . "<br>Archivo: " . $e->getFile());
            }

        }

        public function ListarDano(){

            try{

                $informe = array();

                $sql = "SELECT idDano as id,nombre,descripcion FROM dano";

                $query = $this->conexion->prepare($sql);

                $query->execute();

                $resultado = $query;

                $rowAfIn = $resultado->rowCount();
                
                if ($rowAfIn == 0) {
                    $informe['rowAf'] = $rowAfIn;
                    $informe['errorSms'] = $resultado->errorInfo();
                    $informe['length'] = 0;
                    return $informe;
                } else if( $rowAfIn > 0){
                    $informe['rowAf'] = $rowAfIn;
                    while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                        $dano[] = $registro;
                    }
                    return $dano;
                }

               
            }catch(\PDOException $e){
                die("Error: " . $e->getMessage() . "<br>Archivo: " . $e->getFile());
            }

        }

    }