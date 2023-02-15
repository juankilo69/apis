let peticion = new XMLHttpRequest()                 //Creamos el objeto para la peticion
let urlM = "http://gateway.marvel.com/v1/public/creators/32/comics?ts=1000&apikey=fe2b6d8979489384544444da46b59af5&hash=77a33bf1cb7b74086ff8e2ea8cb4a72a"
let urlP = "https://pokeapi.co/api/v2/pokemon"
let urlS = ""

let change = document.getElementById("seleccionar")

const divM = document.getElementById("datosM")
const divP = document.getElementById("datosP")
const divS = document.getElementById("datosS")

let pintadoM = false
let pintadoP = false
let pintadoS = false



document.querySelector("button").addEventListener("click",()=>{
    console.log(change.value);
    if(change.value == "marvel"){
        divP.style.display = "none"
        divS.style.display = "none"
        if(pintadoM != true){
            peticion.open("GET", urlM,true)      
            peticion.send(null)
            peticion.onreadystatechange = function() {
                if(this.readyState == 4 && this.status == 200){         
                    let datos = JSON.parse(this.responseText)           

                    for(let d of datos.data.results){                                          
                        let urlImg = d.thumbnail.path+"."+d.thumbnail.extension                
                        let precio = d.prices[0].price                                        

                        divM.innerHTML += `<div class="objeto">ºº  º
                            <img class="fotos" src="${urlImg}">
                            <h2>${d.title}</h2>
                            <p>Precio:  ${precio} €</p>
                            <p>ISBN:  ${d.isbn}</p>
                            <p>Páginas:  ${d.pageCount}</p>
                        </div>`                                                                 
                    }
                }
            }
            pintadoM = true
        }else{
            divM.style.display = "flex"
        }
    }else if(change.value == "pokemon"){
        divM.style.display = "none"
        divS.style.display = "none"
    
        peticion.onreadystatechange = function() {
            if(pintadoP != true){
                peticion.open("GET", urlP,true)      
                peticion.send(null)
                peticion.onreadystatechange = function() {
                    if(this.readyState == 4 && this.status == 200){          
                        let datos = JSON.parse(this.responseText)           
                        console.log(datos.results);
                        for(let d of datos.results){                              
    
                            divP.innerHTML += `<div class="objeto">
                                <h1>${d.name}</h1>
                            </div>`                                                                 
                        }
                    }
                }
                pintadoP = true
            }else{
                divP.style.display = "flex"
            }
        }
        
    }else if(change.value == "starwars"){
        divM.style.display = "none"
        divP.style.display = "none"
        peticion.onreadystatechange = function() {
            if(pintadoS != true){
                peticion.open("GET", urlS,true)      
                peticion.send(null)
                peticion.onreadystatechange = function() {
                    if(this.readyState == 4 && this.status == 200){          
                        let datos = JSON.parse(this.responseText)           
                        console.log(datos);
                        for(let d of datos.data.results){                              
    
                            divP.innerHTML += `<div class="objeto">ºº  º
                                <h1>Hola a todos S</h1>
                            </div>`                                                                 
                        }
                    }
                }
                pintadoS = true
            }else{
                divS.style.display = "flex"
            }
        }
    }
})