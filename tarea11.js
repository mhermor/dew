window.addEventListener("load", inicio);

function inicio() {
    document.getElementById("provincias").style.visibility = "hidden"; 
    document.getElementById("etiq_provincias").style.visibility = "hidden"; 
    document.getElementById("municipios").style.visibility = "hidden"; 
    document.getElementById("etiq_municipios").style.visibility = "hidden";   
    mostrar_comunidades();
    document.getElementById("comunidades").addEventListener("change", mostrar_provincias);
    document.getElementById("provincias").addEventListener("change", mostrar_municipios);
}   
    
function mostrar_comunidades () {
    let objeto = {"tabla": "comunidades"};
    let xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function () { 
        if ((this.readyState == 4) && (this.status == 200)) {
            let array = JSON.parse(this.responseText);
            let comunidad = document.getElementById("comunidades");
            let c = document.createElement("option");
            c.text = "";
            comunidad.options.add(c, 0);
            for (let i = 0; i < array.length; i++) {
                let comunidad = document.getElementById("comunidades");
                let c = document.createElement("option");
                c.text = array[i].nombre;
                c.value = array[i].id_comunidad;
                comunidad.options.add(c, i+1);                          
            }          
        }
    }
    let parametros = JSON.stringify(objeto);   
    xhttp.open("POST", "acceso_bd.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("objeto="+parametros);
}

function mostrar_provincias(e) { 
    let pro = e.target;
    let comunidad_id = document.getElementById("comunidades").value;

    if (comunidad_id === "") {
        document.getElementById("provincias").style.visibility = "hidden"; 
        document.getElementById("etiq_provincias").style.visibility = "hidden"; 
        document.getElementById("municipios").style.visibility = "hidden"; 
        document.getElementById("etiq_municipios").style.visibility = "hidden";
        return;
    }

    let objeto = {"tabla": "provincias"};
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if ((this.readyState == 4) && (this.status == 200)) {
            let array = JSON.parse(this.responseText);
            let provincia = document.getElementById("provincias");
            provincia.innerHTML = "";
            let p = document.createElement("option");
            p.text = "";
            provincia.options.add(p, 0);
            for (let i = 0; i < array.length; i++) {
                if (array[i].id_comunidades == pro.value){
                    let provincia = document.getElementById("provincias");
                    let p = document.createElement("option");
                    p.text = array[i].provincia;
                    p.value = array[i].id_provincia;
                    provincia.options.add(p, i+1);
                }
           }

            document.getElementById("provincias").style.visibility = "visible";
            document.getElementById("etiq_provincias").style.visibility = "visible";
            document.getElementById("municipios").style.visibility = "hidden";
            document.getElementById("etiq_municipios").style.visibility = "hidden";
        }
    };

    let parametros = JSON.stringify(objeto);
    xhttp.open("POST", "acceso_bd.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("objeto=" + parametros);
}

function mostrar_municipios(e) {
    let mun = e.target;
    let provincia_id = document.getElementById("provincias").value;
    let objeto = {"tabla": "municipios"};
    
    if (provincia_id === "") {
        document.getElementById("municipios").style.visibility = "hidden"; 
        document.getElementById("etiq_municipios").style.visibility = "hidden";
        return;
    }

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if ((this.readyState == 4) && (this.status == 200)) {
            let array = JSON.parse(this.responseText);
            let municipio = document.getElementById("municipios");
            municipio.innerHTML = "";
            let m = document.createElement("option");
            m.text = "";
            municipio.options.add(m, 0);
            for (let i = 0; i < array.length; i++) {
                if (array[i].id_provincia == mun.value){
                    let municipio = document.getElementById("municipios");
                    let m = document.createElement("option");
                    m.text = array[i].nombre;
                    m.value = array[i].id_municipio;
                    municipio.options.add(m, i+1);
                }
            }

            document.getElementById("municipios").style.visibility = "visible";
            document.getElementById("etiq_municipios").style.visibility = "visible";
        }
    };

    let parametros = JSON.stringify(objeto);
    xhttp.open("POST", "acceso_bd.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("objeto=" + parametros);
}