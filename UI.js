/**
 * Clase para la interfaz del juego
 * Crea un cronometro para que el jugador
 * sepa el tiempo de juego y el contado de vidas
 */

class GUI {

    constructor() {
        this.centesimas = 0;
        this.segundos = 0;
        this.minutos = 0;
        this.control = null;
        this.lifes = 3;
    }

    endGame() {
        document.getElementById("fin").style.visibility = "visible";
        this.control = null;
    }

    /**
     * Funcion utilizada para quitar una vida de la interfaz
     */
    lostLife() {
        var contenedor = document.getElementById("vidas");
        var vidas = document.getElementsByClassName("heart");

        if (this.lifes != 0) {
            var vidaPerdida = contenedor.removeChild(vidas[0]);
            this.lifes--;
        }

    }

    /**
     * Funcion utilizada para añadir una vida a la interfaz
     */
    winLife() {
        var lifes = document.getElementById("vidas");

        if (this.lifes < 3) {
            lifes.insertAdjacentHTML('afterbegin', "<img class=\"heart\" src=\"imgs/vida.png\">");
            this.lifes++;
        }

    }

    /**
     * Funcion que crea e inicia el cronometro
     */
    cronometroStart() {
        this.control = setInterval(this.cronometro, 10);
    }

    /**
     * Funcion encargada del correcto funcionamiento del cronometro 
     */
    cronometro() {
        if (this.centesimas < 99) {
            this.centesimas++;
            if (this.centesimas < 10) { this.centesimas = "0" + this.centesimas }
            Centesimas.innerHTML = ":" + this.centesimas;
        }
        if (this.centesimas == 99) {
            this.centesimas = -1;
        }
        if (this.centesimas == 0) {
            this.segundos++;
            if (this.segundos < 10) { this.segundos = "0" + this.segundos }
            Segundos.innerHTML = ":" + this.segundos;
        }
        if (this.segundos == 59) {
            this.segundos = -1;
        }
        if ((this.centesimas == 0) && (this.segundos == 0)) {
            this.minutos++;
            if (this.minutos < 10) { this.minutos = "0" + this.minutos }
            Minutos.innerHTML = this.minutos;
        }

    }

    update() {
        this.cronometro();
    }


}