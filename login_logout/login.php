<?php
    if (!isset($_SESSION)){
        session_start();
    }
?>
    <div id=centro>
        <h1 id="Titololog">Benvenuto su Rancid Tomatoes</h1>
<?php
        if (isset($_SESSION["flash"])) {
?>
            <div id="flash"> <?=$_SESSION["flash"]?> </div>
<?php
            unset($_SESSION["flash"]);
        }
?>
        <div id=registrazione>
                <fieldset class="column">

                    <legend>Registrazione</legend>

                    <strong><label class="lab">Nome:</label></strong>
                        <input id="nomereg" type="text" name="nome" size="16" maxlength="16" placeholder="nome">

                    <br>

                    <strong><label class="lab">Cognome:</label></strong>
                        <input id="cognomereg" type="text" name="cognome" size="16" maxlength="16" placeholder="cognome">

                    <br>

                    <strong><label class="lab">Password:</label></strong>
                        <input id="passreg" type="password" name="password" size="16" maxlength="16" placeholder="password">
                        <br>
                        <div class="show"><input type="checkbox" onclick="myFunctionsx()">Show Password</div>
                    <br>
                    <br>

                    <strong><label class="lab">Genere:</label></strong>
                        <input id="genereregM" type="radio" name="genere" checked="checked" value="M">Male
                        <input id="genereregF" type="radio" name="genere" value="F">Female

                    <br>

                    <strong><label class="lab">Data di nascita:</label></strong>
                        <input id="giornoreg" type="text" name="giorno" size="2" maxlength="2" placeholder="giorno">
                        <input id="mesereg" type="text" name="mese" size="2" maxlength="2" placeholder="mese">
                        <input id="annoreg" type="text" name="anno" size="2" maxlength="4" placeholder="anno">
                    <br>

                    <input class="bottone" type="submit" name="signup" value="Registrati" onclick="functionreg()">            
                </fieldset>
        </div>

        <div id=accesso>
                <fieldset class="column">

                    <legend>Accedi</legend>

                    <strong><label class="lab">Nome:</label></strong>
                        <input id="nomeacc" type="text" name="nome" size="16" maxlength="16" placeholder="nome">

                    <br>

                    <strong><label class="lab">Cognome:</label></strong>
                        <input id="cognomeacc" type="text" name="cognome" size="16" maxlength="16" placeholder="cognome">

                    <br>

                    <strong><label class="lab">Password:</label></strong>
                        <input id="passacc" type="password" name="password" size="16" maxlength="16" placeholder="password">
                        <br>
                        <div class="show"><input type="checkbox" onclick="myFunctiondx()">Show Password</div>

                    <br>
                    <br>

                    <input class="bottone" type="submit" name="signup" value="Accedi" onclick="functionacc()">            
                </fieldset>
        </div>

    </div>