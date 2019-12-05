        <!--
                Autore: Roberto Bellardi Gioli
                Sito: Rancid Tomamtoes
                Contenuto: bacheca in cui poter vedere tutte le locandine dei film presenti sul sito
        -->

<?php include("top.html")?>
<?php include("server_side/function.php")?>

<?php 
        if(!isset($_SESSION)){
            session_start();
        }
        loggato();
?>
        <div id=profilo>
            
            <h3 id=benv><?=$_SESSION["login"]?> <?=$_SESSION["nome"]?></h3>
            
            <button type="button" onclick=profilo()>Profilo</button>
        </div>

        <div id=bacheca>
<?php 
        $config=require("db/config.php");

        $db=connection($config);
        if($db){
            $rows = $db->query("select name from movies");
            foreach ($rows as $row){
?>
                <div class="locandina">
                    <a href="film.php?film=<?=$row["name"]?>">
                        <img src="img/<?=$row["name"]?>.jpg" alt="<?=$row["name"]?>" >
                    </a>
                </div>
<?php
            }
        }
?>
        </div>
<?php include("bottom.php")?>