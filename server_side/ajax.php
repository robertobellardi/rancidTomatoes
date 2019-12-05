<?php if (!isset($_SESSION)){
    session_start();
}
    include("function.php");
    $config=require("../db/config.php");
    $db=connection($config);
    if($db){
        if(isset($_POST["rank"])){
            $film=$_SESSION["film"]; 
            unset($_POST["rank"]);
            
            $row=query($db,"select rank from movies where name=",$film);

            if(isset($row[0]))
                $errore="false";
            else
                $errore="true";

            $json=array("erroredb" => $errore,"rank" => $row[0]["rank"]);
            header('Content-type: application/json');
            print json_encode($json);
        }
        if(isset($_POST["trama"])){
            $film=$_SESSION["film"]; 
            unset($_POST["rank"]);
            
            $trama=read_trama($film);
            
            if(isset($trama))
                $errore="false";
            else
                $errore="true";

            $json=array("erroredb" => $errore,"trama" => $trama);
            header('Content-type: application/json');
            print json_encode($json);
        }
        if(isset($_POST["commenti"])){
            $film=$_SESSION["film"]; 
            unset($_POST["commenti"]);

            $mat=read_commenti($db,$film);
            
            if(isset($mat))
                $errore="false";
            else
                $json[0]=array("erroredb" =>"true");
            
            
            for($i=0;$mat && $i<sizeof($mat);$i++){
               $json[$i]=array("erroredb" => $errore,"nome" => $mat[$i][0],"cognome" => $mat[$i][1],"testo" => $mat[$i][2]); 
            }
            header('Content-type: application/json');
            print json_encode($json);
        }
        if(isset($_POST["genere"])){
            $film=$_SESSION["film"]; 
            unset($_POST["genere"]);

            $risp=query($db,"SELECT DISTINCT mg.genre from movies m JOIN movies_genres mg on m.id=mg.movie_id where name=",$film);
            
            if(isset($risp))
                $errore="false";
            else
                $errore="true";

            for($i=0;$i<sizeof($risp);$i++){
                $json[$i]=array("erroredb" => $errore,"genere" => $risp[$i]["genre"]); 
            }
            header('Content-type: application/json');
            print json_encode($json);
        }
        if(isset($_POST["direttore"])){
            $film=$_SESSION["film"]; 
            unset($_POST["direttore"]);

            $risp=query($db,"SELECT DISTINCT d.first_name,d.last_name from movies m JOIN movies_directors md on m.id=md.movie_id join directors d on md.director_id=d.id where name=",$film);
            
            if(isset($risp))
                $errore="false";
            else
                $errore="true";

            for($i=0;$i<sizeof($risp);$i++){
                $json[$i]=array("erroredb" => $errore,"nome" => $risp[$i]["first_name"],"cognome" => $risp[$i]["last_name"]);
            }

            header('Content-type: application/json');
            print json_encode($json);
        }
        if(isset($_POST["attori"])){
            $film=$_SESSION["film"]; 
            unset($_POST["attori"]);

            $risp=query($db,"SELECT DISTINCT r.role,a.first_name,a.last_name from movies m JOIN roles r on m.id=r.movie_id join actors a on r.actor_id=a.id where m.name=",$film);
            
            if(isset($risp))
                $errore="false";
            else
                $errore="true";
            
            for($i=0;$i<sizeof($risp);$i++){
                if($risp[$i]["role"]=="")
                    $risp[$i]["role"]="Null";
                if($risp[$i]["first_name"]=="")
                    $risp[$i]["first_name"]="Null";
                if($risp[$i]["last_name"]=="")
                    $risp[$i]["last_name"]="Null";

                $json[$i]=array("erroredb" => $errore,"ruolo" => $risp[$i]["role"],"nome" => $risp[$i]["first_name"],"cognome" => $risp[$i]["last_name"]);

            }
                header('Content-type: application/json');
                print json_encode($json);
        }
        if(isset($_POST["commento"])){
            $nome=$_SESSION["nome"];
            $cognome=$_SESSION["cognome"];
            $film=$_SESSION["film"];
            $testo=htmlspecialchars($_POST["commento"]); 
            unset($_POST["commento"]);

            $id=require_id($db,$film);
            
            if(isset($id)){
                $errore="false";
                $rispo=write_comment($db,$nome,$cognome,$testo,$id["id"]);
                if($rispo==true){
                    $json=array("erroredb" => $errore,"nome" => $nome,"cognome" => $cognome,"commento" => $testo);
                    header('Content-type: application/json');
                    print json_encode($json);
                }
                else{
                    $json=array("erroredb" => "true");
                    header('Content-type: application/json');
                    print json_encode($json);
                }
            }
            else{
                $json=array("erroredb" => "true");
                header('Content-type: application/json');
                print json_encode($json);
            }            
        }
        if(isset($_POST["profiloinfo"])){
            $nome=$_SESSION["nome"]; 
            $cognome=$_SESSION["cognome"]; 
            unset($_POST["profilo"]);

            $row=query_utente($db,$nome,$cognome);
            
            if(isset($row))
                $errore="false";
            else
                $errore="true";

            $json=array("erroredb" => $errore,"nome" => $row[0]["nome"],"cognome" => $row[0]["cognome"],"genere" => $row[0]["genere"],"giorno" => $row[0]["giorno"],"mese" => $row[0]["mese"],"anno" => $row[0]["anno"]);
            header('Content-type: application/json');
            print json_encode($json);
        }
        if(isset($_POST["filmcommenti"])){
            $nome=$_SESSION["nome"]; 
            $cognome=$_SESSION["cognome"]; 
            unset($_POST["filmcommenti"]);

            $row=queryprofilo($db,$nome,$cognome); 
            
            if(isset($row))
                $errore="false";
            else
                $errore="true";
            
            if($row){
                for($i=0;$i<sizeof($row);$i++){
                    $json[$i]=array("erroredb" => $errore,"commento" => $row[$i]["commento"],"film" => $row[$i]["name"]);
                }
            }
            else
                $json[0]=array("erroredb" => $errore);
            header('Content-type: application/json');
            print json_encode($json);
        }

        if(isset($_POST["querydb"]) && isset($_POST["modifica"]) && isset($_POST["nomedb"]) &&  isset($_POST["cognomedb"])){
            $query=$_POST["querydb"]; 
            $modifica=htmlspecialchars($_POST["modifica"]); 
            $nome=$_POST["nomedb"]; 
            $cognome=$_POST["cognomedb"]; 

            unset($_POST["querydb"]);
            unset($_POST["nomedb"]);
            unset($_POST["cognomedb"]);

            $row=modificaprofilo($query,$modifica,$nome,$cognome);
            
            if($row==true)
                $errore="false";
            else
                $errore="true";

            $json=array("erroredb" => $errore);
            header('Content-type: application/json');
            print json_encode($json);
        }
    }
    else{
        $json=array("Erroredb" => "true");
        header('Content-type: application/json');
        print json_encode($json);
}
?>