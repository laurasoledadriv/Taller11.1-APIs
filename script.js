document.addEventListener("DOMContentLoaded", ()=>{
    const api1="http://www.boredapi.com/api/activity/"; //constante para guardar la bored api
    let btnSugerencia= document.getElementById("sugerencia");
    let divSugerencia= document.getElementById("container2");
    //Creo una función para dejar vacío el div donde va la actividad
    function borrarActividad(){
        divSugerencia.innerHTML="";
    }
    //Funcion que hace el fetch a la bored api y a una api de imágenes y las ordena en un div,luego las agrega al div de html
    function crearActivity(){
        fetch(api1)
        .then(res => res.json())
        .then(data=>{
            const actividad = data.activity; //paso la actividad que me devuelve el fetch a una constante y luego la uso para pasarla a la api2 y buscar imágenes sobre esa actividad
            const apiKey='FTe0Dal6ddaPd1vk2LxLsa1dYsMyMQjP7k46WRMKnnXTArHVhnvtP9AF';//mi api Key de Pexels
            const api2 = `https://api.pexels.com/v1/search?query=${actividad}`;

            fetch(api2, {
                headers: {
                  Authorization: apiKey
                }
              })
              .then(response => response.json())
              .then(pexelsData => {
                divSugerencia.innerHTML+=  `<div class='jaula' ><h1>Actividad sugerida:</h1><div class='jaulaimg'><img src=${pexelsData.photos[0].src.original}> <img src=${pexelsData.photos[2].src.original}></div><h1 id='actividad'class='font-italic'>${actividad}</h1> </div> `;
              })
        })    
    }
    //cuando se hace click al botón corre la función crearActivity y luego se borra el contenido del div de la actividad cada 30 segundos
    btnSugerencia.addEventListener("click",()=>{
        crearActivity();
        setTimeout(borrarActividad, 30);
    })

})