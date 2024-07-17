

card.innerHTML=`<img src="${imagen}" alt="Imagen cuadro" class="imagen-cuadro">
        <p class="titulo-cuadro">"${titulo}"</p>
        <p class="tecnica">"${tecnica}"</p>
        <button class="eliminar" data-id="${id}">
            <div class="icono-papelera">
                <img src="imagenes/marca-x.png" alt="Eliminar">
            </div>
        </button>`;
        const botonEliminar =card.querySelector(".eliminar");
    botonEliminar.addEventListener("click", () => {
        conexionApi.borrarCuadro(id)
        .then(() => {
            card.remove();
        })
        .catch(err => console.log(err));
    });

    lista.appendChild(card);
    return card;
    

function esURLValida(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

async function crear-card(evento){
    evento.preventDefault();

    const nombre=document.querySelector("[data-nombre]").value.trim();
    const precio=document.querySelector("[data-precio]").value.trim();
    const url=document.querySelector("[data-url]").value.trim();

    if (!nombre || !precio || !url) {
        alert("Por favor, completa todos los campos antes de enviar.");
        return;
    }

    if (!esURLValida(imagen)) {
        alert("Por favor, ingresa una URL válida.");
        return;
    }

    try {
        await conexionApi.enviarCuadro(nombre,precio,imagen);
        formulario.reset();
        window.location.reload();
    } catch (error){
        console.error("Error al enviar los datos: ", error);
    }    
    
    
}

formulario.addEventListener("submit", nuevo-producto);
