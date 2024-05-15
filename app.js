let casillas = new Map();
let partidaTerminada = false;

for(let i = 1; i <= 9; i++){
    casillas.set(`casilla${i}`, 'blanco');
}

print(casillas);

let modoSeleccionado;

function print(msg){
    console.log(msg);
}

function modoFacil(){
    document.getElementById('modo').innerText = 'Modo fácil seleccionado';
    modoSeleccionado = 'modoFacil';
}

function modoDificil(){
    document.getElementById('modo').innerText = 'Modo Dark Souls seleccionado';
    modoSeleccionado = 'modoDificil';
}

function accionJugador(eleccion){
    casillas.set(eleccion, 'cruz');
    document.getElementById(eleccion).innerText = 'X';
}

function casillasOcupadas(){
    let cierto = false;
    let casillasActuales = devolverCasillasActuales(true);
    for(let i = 0; i <= casillasActuales.length - 1; i++){
        if(casillasActuales[i] !== 'blanco'){
            cierto = true;
        }else{
            return false;
        }
    }

    return cierto;
}

function maquinaInfinitoIQ(){
    let eleccion;
    let situacion = 'aleatorio';
    let arr = devolverCasillasActuales(true);

    //A favor
    //Posibilidades horizontales
    if(posibilidadHorizontales('circulo', arr) !== false){
        //eleccion = posibilidadHorizontales('circulo', arr);
        situacion = 'a favorH';
        print('A favor');
    }
    //Posibilidades verticales
    if(posibilidadVerticales('circulo', arr) !== false){
        //eleccion = posibilidadVerticales('circulo', arr);
        situacion = 'a favorV';
        print('A favor');
    }
    //Posibilidades diagonales
    if(
    //Casilla central en blanco
    (arr[0] == 'circulo' && arr[4] == 'blanco' && arr[8] == 'circulo') ||
    (arr[2] == 'circulo' && arr[4] == 'blanco' && arr[6] == 'circulo')
    ){
        eleccion = 4;
        situacion = 'a favorX';
        print('A favor');
    }else if(
    //Esquinas superiores en blanco
    (arr[0] == 'blanco' && arr[4] == 'circulo' && arr[8] == 'circulo')
    ){
        eleccion = 0;
        situacion = 'a favorX';
        print('A favor');
    }else if(
    (arr[2] == 'blanco' && arr[4] == 'circulo' && arr[6] == 'circulo')
    ){
        eleccion = 2;
        situacion = 'a favorX';
        print('A favor');
    }else if(
    //Esquinas inferiores en blanco
    (arr[0] == 'circulo' && arr[4] == 'circulo' && arr[8] == 'blanco')
    ){
        eleccion = 8;
        situacion = 'a favorX';
        print('A favor');
    }else if(
    (arr[2] == 'circulo' && arr[4] == 'circulo' && arr[6] == 'blanco')
    ){
        eleccion = 6;
        situacion = 'a favorX';
        print('A favor');
    }

    if(situacion == 'a favorH'){
        return posibilidadHorizontales('circulo', arr);
    }else if(situacion == 'a favorV'){
        return posibilidadVerticales('circulo', arr);
    }else if(situacion == 'a favorX'){
        return eleccion;
    }else if(situacion == 'aleatorio'){
        eleccion = 'aleatorio';
        print('No hay a favor');
    }else{
        print('Algo salió mal')
    }

    //En contra
    //Posibilidades horizontales
    if(posibilidadHorizontales('cruz', arr) !== false){
        //eleccion = posibilidadHorizontales('cruz', arr);
        situacion = 'en contraH';
        print('En contra');
    }
    //Posibilidades verticales
    if(posibilidadVerticales('cruz', arr) !== false){
        //eleccion = posibilidadVerticales('cruz', arr);
        situacion = 'en contraV';
        print('En contra');
    }
    //Posibilidades diagonales
    if(
    //Casilla central en blanco
    (arr[0] == 'cruz' && arr[4] == 'blanco' && arr[8] == 'cruz') ||
    (arr[2] == 'cruz' && arr[4] == 'blanco' && arr[6] == 'cruz')
    ){
        eleccion = 4;
        situacion = 'en contraX';
        print('En contra');
    }else if(
    //Esquinas superiores en blanco
    (arr[0] == 'blanco' && arr[4] == 'cruz' && arr[8] == 'cruz')
    ){
        eleccion = 0;
        situacion = 'en contraX';
        print('En contra');
    }else if(
    (arr[2] == 'blanco' && arr[4] == 'cruz' && arr[6] == 'cruz')
    ){
        eleccion = 2;
        situacion = 'en contraX';
        print('En contra');
    }else if(
    //Esquinas inferiores en blanco
    (arr[0] == 'cruz' && arr[4] == 'cruz' && arr[8] == 'blanco')
    ){
        eleccion = 8;
        situacion = 'en contraX';
        print('En contra');
    }else if(
    (arr[2] == 'cruz' && arr[4] == 'cruz' && arr[6] == 'blanco')
    ){
        eleccion = 6;
        situacion = 'en contraX';
        print('En contra');
    }

    if(situacion == 'en contraH'){
        return posibilidadHorizontales('cruz', arr);
    }else if(situacion == 'en contraV'){
        return posibilidadVerticales('cruz', arr);
    }else if(situacion == 'en contraX'){
        return eleccion;
    }else if(situacion == 'aleatorio'){
        eleccion = accionAleatoria();
    }else{
        print('Algo salió mal')
    }

    return eleccion;
}

//Variable para modo difícil
let primeraAleatoria = false;
function accionMaquina(modo){
    let ocupado = casillasOcupadas();
    console.log(ocupado)
    if(ocupado == false){
        if(modo == 'modoFacil'){

            let eleccion;
            do{
                eleccion = accionAleatoria();
                print(eleccion);
                print(casillas);
                if(casillas.get(`casilla${eleccion}`) == 'blanco'){
                    casillas.set(`casilla${eleccion}`, 'circulo');
                    document.getElementById(`casilla${eleccion}`).innerText = 'O';
                    
                    print('Máquina eligió correctamente');
                    break;
                }else{
                    print('Máquina eligió casilla ocupada');
                }
            }while(casillas.get(`casilla${eleccion}`) !== 'blanco')
        }else if(modo == 'modoDificil'){
            let eleccion;

            if(primeraAleatoria == false){
                do{
                    eleccion = accionAleatoria();
                    if(casillas.get(`casilla${eleccion}`) == 'blanco'){
                        casillas.set(`casilla${eleccion}`, 'circulo');
                        document.getElementById(`casilla${eleccion}`).innerText = 'O';
                        
                        print('Máquina eligió correctamente');
                        primeraAleatoria = true;
                        break;
                    }else{
                        print('Máquina eligió casilla ocupada');
                    }
                }while(casillas.get(`casilla${eleccion}`) !== 'blanco')
            }else if(primeraAleatoria == true){
                do{
                    eleccion = maquinaInfinitoIQ();
                    eleccion++;
                    //print(casillas);
                    
                    if(casillas.get(`casilla${eleccion}`) == 'blanco'){
                        casillas.set(`casilla${eleccion}`, 'circulo');
                        document.getElementById(`casilla${eleccion}`).innerText = 'O';
                        
                        print('Máquina eligió correctamente');
                        break;
                    }else{
                        print('Máquina eligió casilla ocupada');
                    }
                }while(casillas.get(`casilla${eleccion}`) !== 'blanco')
            }
        }else{
            alert('Algo fue mal');
        }
    }else{
        console.log('La partida ha terminado.');
    }
}

function accionAleatoria(){
    let numero;
    do{
        numero = Math.floor(Math.random()*9 + 1);
        if(numero <= 0 && numero >= 10){
            print('Número incorrecto.');
        }else{
            return numero;
        }
    }while(numero <= 0 && numero >= 10)

}

function comprobarCasillasHorizontales(eleccion, arr){
    let ganado = false;

    for(let i = 0; i <= 6; i++){
        if(i == 0 || i == 3 || i == 6){
            if(arr[i] == eleccion && arr[i + 1] == eleccion && arr[i + 2] == eleccion){
                ganado = true;
                //print('Hay raya');
                break;
            }else{
                //print('No hay raya');
                ganado = false;
            }
        }
    }

    return ganado;
}

function posibilidadHorizontales(eleccion, arr){
    let posibilidad = false;

    for(let i = 0; i < 7; i++){
        if(i == 0 || i == 3 || i == 6){
            if(arr[i] == eleccion && arr[i + 1] == eleccion && arr[i + 2] == 'blanco'){
                posibilidad = i + 2;
                break;
            }else if(arr[i] == eleccion && arr[i + 1] == 'blanco' && arr[i + 2] == eleccion){
                posibilidad = i + 1;
                break;
            }else if(arr[i] == 'blanco' && arr[i + 1] == eleccion && arr[i + 2] == eleccion){
                posibilidad = i;
                break;
            }else{
                print("No hay posibilidad.");
            }
        }else{
            print('No c.');
        }
    }

    return posibilidad;
}

function comprobarCasillasVerticales(eleccion, arr){
    let ganado = false;

    for(let i = 0; i <= 3; i++){
        if(arr[i] == eleccion && arr[i + 3] == eleccion && arr[i + 6] == eleccion){
            ganado = true;
            //print('Hay raya');
            break;
        }else{
            //print('No hay raya');
            ganado = false;
        }
    }

    return ganado;
}

function posibilidadVerticales(eleccion, arr){
    let posibilidad = false;

    for(let i = 0; i <= 2; i++){
        print('i vertical actual: ' + i)
        if(arr[i] == eleccion && arr[i + 3] == eleccion && arr[i + 6] == 'blanco'){
            posibilidad = i + 6;
            break;
        }else if(arr[i] == eleccion && arr[i + 3] == 'blanco' && arr[i + 6] == eleccion){
            posibilidad = i + 3;
            break;
        }else if(arr[i] == 'blanco' && arr[i + 3] == eleccion && arr[i + 6] == eleccion){
            posibilidad = i;
            break;
        }else{
            print("No hay posibilidad.");
        }
    }

    return posibilidad;
}

function devolverCasillasActuales(returnValue){
    let x = [];
    
    casillas.forEach (function (value, key){
        if(returnValue == false){
            x.push(key);
        }else{
            x.push(value);
        }
        
    });

    return x;
}

function comprobarPartida(){
    let casillasActuales = devolverCasillasActuales();
    
    print(casillasActuales);
    print(partidaTerminada);

    if(partidaTerminada == false){
        if(
            //Posibilidades jugador
            //Posibilidades horizontales
            comprobarCasillasHorizontales('cruz', casillasActuales) ||
            //Posibilidades verticales
            comprobarCasillasVerticales('cruz', casillasActuales) ||
        
            //Posibilidades diagonales
            (casillasActuales[0] == 'cruz' && casillasActuales[4] == 'cruz' && casillasActuales[8] == 'cruz') ||
            (casillasActuales[2] == 'cruz' && casillasActuales[4] == 'cruz' && casillasActuales[6] == 'cruz')
        ){
            alert('Enhorabuena, has ganado :)');
            partidaTerminada = true;
        }else if(
            //Posibilidades máquina
            //Posibilidades horizontales
            comprobarCasillasHorizontales('circulo', casillasActuales) ||
            //Posibilidades verticales
            comprobarCasillasVerticales('circulo', casillasActuales) ||
            //Posibilidades diagonales
            (casillasActuales[0] == 'circulo' && casillasActuales[4] == 'circulo' && casillasActuales[8] == 'circulo') ||
            (casillasActuales[2] == 'circulo' && casillasActuales[4] == 'circulo' && casillasActuales[6] == 'circulo')
        ){
            alert('Ganó la máquina :(');
            partidaTerminada = true;
        }else{
            print('La partida ha terminado');
        }
    }else{
        print('La partida ha finalizado.');
    }
}

function realizarJugada(){
    if(partidaTerminada == false && casillasOcupadas() == false){
        let eleccion = document.getElementById('eleccion').value;
        if(modoSeleccionado == 'modoFacil' || modoSeleccionado == 'modoDificil'){
            if(eleccion >= 1 && eleccion <= 9){
                print('Casilla existente')
                if(casillas.get(`casilla${eleccion}`) == 'blanco'){
                    accionJugador(`casilla${eleccion}`);
                    comprobarPartida();
                    accionMaquina(modoSeleccionado);
                    comprobarPartida();
                }else{
                    alert('La casilla ya ha sido seleccionada');
                }
            }else{
                alert('No se ha seleccionado una casilla válida. Tiene que estar entre el número 1 al 9.');
            }
        }else{
            alert('No ha seleccionado el nivel de dificultad.');
        }
    }else{
        alert('La partida ha terminado')
    }
}