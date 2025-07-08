// Evento para guardar datos en el Local Storage
document.getElementById('saveButton').addEventListener('click', () => {
    // Guardamos la información de name y age en una variable luego de que el usuario haga click en el boton de guardar.
    const nameInput = document.getElementById('name'); 
    const ageInput = document.getElementById('age');
    
    // Validamos de que los elementos sean validos.
    if (!nameInput || !ageInput) {
        console.error('Los elementos del formulario no existen.');
        return;
    };

    const name = nameInput.value.trim(); // Accede al valor de nombre y verifica que no tenga espacios ni al principio ni al fianl, estos espacios los elimina.
    const age = parseInt(ageInput.value); // Accede al valor de edad y lo convierte el valor de edad en numeros enteros.

    // Valida que solo letras y espacios (mayúsculas y minúsculas)
    const onlyLetters = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;

    if (!onlyLetters.test(name)) {
        alert('El nombre solo debe contener letras y espacios.');
        return;
    };
    
    // Valida que la edad sea positiva
    if (age < 0) {
        alert('La edad no puede ser negativa.');
        return;
    };

    
    // Si nombre y solo números son validos hace lo siguiente:
    if (name && !isNaN(age)) {
        localStorage.setItem('userName', name); // Guarda el valor de la variable name en la clave userName.
        localStorage.setItem('userAge', age); // Guarda el valor de la variable age en la clave userAge.

        // Actualizar contador
        let count = parseInt(sessionStorage.getItem('interactionCount') || '0');
        count++;
        sessionStorage.setItem('interactionCount', count.toString());
        displayData();
        
    } else {
        alert('Por favor, ingresa un nombre válido y una edad numérica.');
    }
});

// Evento para limpiar los datos del Local Storage y actualizar contador.
document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('name').value = ''; // Borra la info del input de name.
    document.getElementById('age').value = ''; // Borra la info del input de age.
    localStorage.clear(); // Limpia todo el Local Storage.
    sessionStorage.setItem('interactionCount', '0'); // Reiniciar también el contador de sesión si se limpia todo.
    displayData();
});

// Mensaje segun la edad.
function getAgeMessage(age) {
if (typeof age !== 'number' || isNaN(age) || age < 0) { 
    return "Edad no válida. Por favor, ingresa un número positivo.";
} else if (age < 13) {
    return "Eres un niño.";
} else if (age >= 13 && age < 18) {
    return "Eres un adolescente.";
} else if (age >= 18 && age < 60) {
    return "Eres un adulto"
} else if (age >= 60 && age <80) {
    return "Eres de la tercera edad"
} else {
    return "Eres un anciano"
};

};
// Función para mostrar los datos almacenados.
function displayData() {
    // Obtenemos los datos de name y age del Local Storage.
    const name = localStorage.getItem('userName');
    const ageStr = localStorage.getItem('userAge');
    const age = ageStr !== null ? Number(ageStr) : null; // Operador ternario que valida si ageStr es distinto de null, si lo es, lo convierte en número, sino es null.

    // Aqui es donde mostrara los datos en el div.
    const outputDiv = document.getElementById('output');
    const interactionCountDiv = document.getElementById('interactionCountOutput');

    // Variables predeterminada para más adelante msotras los mensajes
    let mainMessage = '';
    let ageMessage = '';
    let countMessage = '';

    // Mensaje de Nombre y Edad
    if (name && ageStr !== null && !isNaN(age)) {
        mainMessage = `¡Hola ${name}! Tu edad es de: ${age} años.`;
        console.log(mainMessage);
        ageMessage = getAgeMessage(age)
        console.log(ageMessage);
    } else {
        mainMessage = `No hay datos almacenados.`;
    }

    // Mensaje de contador de interacciones
    const count = parseInt(sessionStorage.getItem('interactionCount') || '0');
    countMessage = `Has interactuado con la página: ${count} veces.`;
    console.log(countMessage);
    console.log('');
    // Mostrar los mensajes y guardarlos en el div
    if (outputDiv) {
        outputDiv.textContent = `${mainMessage} ${ageMessage ? `(${ageMessage})` : ''}`; // Operador ternario que determina si mainMessage es true, si es false, no muestra el mensaje de la edad, si es true dice que eres segun tu edad.
    }

    // Info del div del contador
    if (interactionCountDiv) {
        interactionCountDiv.textContent = countMessage;
    }
};


// Contador de interacciones en el Session Storage
if (!sessionStorage.getItem('interactionCount')) {
    sessionStorage.setItem('interactionCount', '0');
};

// Al cargar la página, reinicia los valores pues al ser un sessionStorage, solo dura la sesion y no se mantiene a información.
window.onload = displayData;