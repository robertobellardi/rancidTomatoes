function myFunctionsx() {
  var x = document.getElementById("passreg");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function myFunctiondx() {
  var x = document.getElementById("passacc");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function profilo(){
    location.href="profilo.php";
}

function functionreg(){
    puliscierr("#errorereg");
    
    var nomereg=document.getElementById("nomereg");
    var cognomereg=document.getElementById("cognomereg");
    var passreg=document.getElementById("passreg");
    var generereg;
    
    if(document.getElementById("genereregM").checked){
        generereg=document.getElementById("genereregM");
       }
    else{
        generereg=document.getElementById("genereregF");
    }    
    var giornoreg=document.getElementById("giornoreg");
    var mesereg=document.getElementById("mesereg");
    var annoreg=document.getElementById("annoreg");
    
    if(nomereg.value==""){
        agganciaerrore("Campo nome non valido","registrazione","errorereg");
    }
    else{
        if(cognomereg.value==""){
            agganciaerrore("Campo cognome non valido","registrazione","errorereg");
        }
        else{
            if(passreg.value==""){
                agganciaerrore("Campo password non valido","registrazione","errorereg");
            }
            else{
                if(giornoreg.value=="" || mesereg.value=="" || annoreg.value=="" || !isdata(giornoreg.value,mesereg.value,annoreg.value)==false){
                    agganciaerrore("Campo data non valido","registrazione","errorereg");
                }
                else{
                    var ajax=$.post("server_side/verify_login.php",{registrazione: "true",nome: nomereg.value,cognome: cognomereg.value,password: passreg.value,genere: generereg.value,giorno: giornoreg.value,mese: mesereg.value,anno: annoreg.value},function(ajaxObj,status){
                        
                    console.log("status: "+status);
                    }).fail(function(ajaxO,ajaxStatus,ajaxObj){
                    console.log("status "+ajaxStatus);
                        errorerispo("Errore connessione database.Riprova")
                    }).done(function(ajaxO,ajaxStatus,ajaxObj){                        
                    var risp=ajaxO;
                    if(risp.erroredb=="false"){
                        if(risp.registrazione=="true"){
                            location.href="rancid.php";
                        }
                        else{                        
                            var flash=document.getElementById("flash");
                            flash.parentNode.removeChild(flash);

                            flash=document.createElement("div");
                            flash.setAttribute("id","flash");
                            flash.append(document.createTextNode("Utente già registrato, utilizza la sezione accesso"));

                            $("#Titololog").after(flash); 
                        }
                    }else
                        errorerispo("Errore connessione database.Riprova");
                    });
                }
            }
        }
    } 
}

function functionacc(){
    puliscierr("#erroreacc");
    
    var nomeacc=document.getElementById("nomeacc");
    var cognomeacc=document.getElementById("cognomeacc");
    var passacc=document.getElementById("passacc");

    if(nomeacc.value==""){
        agganciaerrore("Campo nome non valido","accesso","erroreacc");
    }
    else{
        if(cognomeacc.value==""){
            agganciaerrore("Campo cognome non valido","accesso","erroreacc");
        }
        else{
            if(passacc.value==""){
                agganciaerrore("Campo password non valido","accesso","erroreacc");
            }
            else{
                var ajax=$.post("server_side/verify_login.php",{accesso: "true",nome: nomeacc.value,cognome: cognomeacc.value,password: passacc.value},function(ajaxObj,status){
                console.log("status: "+status);
                }).fail(function(ajaxO,ajaxStatus,ajaxObj){
                console.log("status "+ajaxStatus);
                errorerispo("Errore connessione database.Riprova");
                }).done(function(ajaxO,ajaxStatus,ajaxObj){
                console.log(ajaxO);
                var risp=ajaxO;
                if(risp.erroredb=="false"){
                    if(risp.vuoto=="true"){
                        var flash=document.getElementById("flash");
                        flash.parentNode.removeChild(flash);
                        flash=document.createElement("div");
                        flash.setAttribute("id","flash");
                        flash.append(document.createTextNode("Utente non registrato, utilizza la sezione registrazione"));

                        $("#Titololog").after(flash);                    
                    }
                    else{
                        if(risp.login=="false"){
                            var flash=document.getElementById("flash");
                            flash.parentNode.removeChild(flash);
                            flash=document.createElement("div");
                            flash.setAttribute("id","flash");
                            flash.append(document.createTextNode("Password errata"));

                            $("#Titololog").after(flash); 
                        }
                        else{
                            location.href="rancid.php";
                        }
                    }
                }else
                    errorerispo("Errore connessione database.Riprova");
                });
            }
        }
    }    
}

function agganciaerrore(stringa,iderroreaggancio,errore){
    var label=document.createElement("label");
    label.setAttribute("id",errore);
    label.append(document.createTextNode(stringa));
    var div=document.getElementById(iderroreaggancio);
    div.append(label);
}

function isdata(giorno,mese,anno){
    var okay=false;
    
    if(giorno>0 && giorno <=31 && mese >0 && mese <=12){
        var data=new Date();
        var g=data.getDate();
        var m=data.getMonth()+1;
        var a=data.getFullYear();
        
        if(anno < a || (anno == a && mese < m) || (anno == a && mese == m && giorno <= g)){
            if(giorno<=g && mese<= m && anno<=a && anno>= a-125){
                if(mese=="02" || mese==2){
                    if(giorno<=28)
                        okay=true;
                    else{
                        if(giorno==29){
                            if((anno%100)!=0){
                                if((anno%4)==0)
                                    okay=true;
                            }
                            else{
                                if((anno%400)==0)
                                    okay=true;
                            }
                        }
                    }
                }
                else{
                    if(mese==4 || mese==6 || mese==9 || mese==11 || mese=="04" || mese=="06" || mese=="09"){
                        if(giorno<=30){
                            okay=true;
                        }
                    }
                    else{
                        okay=true;
                    }
                }
            }
        }
    }
    return okay;
}

function puliscierr(err){
    var errore=document.querySelector(err);

    if(errore)
        errore.parentNode.removeChild(errore);
}

function errorerispo(str){
    var errore=document.querySelector("#errorerispo");
    
    if(!errore){
        errore=document.createElement("h1");
        errore.setAttribute("id","errorerispo");
        errore.append(document.createTextNode(str));
        $("#banner").after(errore);
    }
}