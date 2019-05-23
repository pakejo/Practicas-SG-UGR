
class GUI {

    constructor() {
        this.centesimas = 0;
        this.segundos = 0;
        this.minutos = 0;
        this.control = null;
        this.lifes = 0;
    }

    lostLife() {

    }

    winLife() {
        var lifes = document.getElementsByClassName("heart");

        if(lifes.length < 3)
            lifes[0].insertAdjacentHTML('beforebegin', "<img class=\"heart\" src=\"img/vida.png\">");

    }

    cronometroStart() {
        this.control = setInterval(this.cronometro, 10);
    }

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
            Minutos.innerHTML = ":" + this.minutos;
        }

    }

    update() {
        this.cronometro();
    }


}