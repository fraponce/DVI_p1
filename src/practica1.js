/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};

/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {

	this.gs = gs;
	this.first = -1;
	this.second = -1;
	this.maze = Array(16);
	this.ids = ["8-ball","potato","dinosaur","kronos","rocket","unicorn","guy","zeppelin",
				"8-ball","potato","dinosaur","kronos","rocket","unicorn","guy","zeppelin"];
	this.initGame = function(){
		gs.drawMessage("Parejas");

		var posicion = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
		posicion = posicion.sort(function() {return Math.random() - 0.5});
		for(var i = 0; i<16;i++){
				this.maze[posicion[i]] = new MemoryGameCard(this.ids[i]);
		}
		this.loop();
	};
	this.draw = function(){
		for(var i = 0; i<16;i++){
			game.maze[i].draw(gs,i);
		}
	};
	this.loop = function(){
		setInterval(this.draw,16);
	};


	this.onClick = function(CardId){
		if(this.first==-1){
			if(!game.maze[CardId].find){
				this.first = CardId;
				game.maze[this.first].flip();
			}
		}else{
			if(!game.maze[CardId].find){
				if(this.first != CardId){
					if(game.maze[this.first].compareTo(game.maze[CardId])){
						game.maze[this.first].found();
						this.first = -1;
						game.maze[CardId].flip();
						game.maze[CardId].found();
						if (game.maze.every(elem => elem.find == true)){
							gs.drawMessage("Victoria");
						}
					}else{
						game.maze[CardId].flip();
						setTimeout(game.maze[this.first].flip(),1000);
						setTimeout(game.maze[CardId].flip(),1000);
						this.first = -1;
					}
				}
			}
		}
	};
};



/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {
	
	this.name = id;
	this.state = false; //boca abajo o boca arriba
	this.find = false; //emparejada o no
	this.flip = function(){
		this.state = !this.state;
	};
	this.found = function(){
		this.find = true;
	};
	this.compareTo = function(otherCard){
		return this.name == otherCard.name;
	};
	this.draw = function(gs, pos){
		if(!this.state){
			gs.draw("back",pos);
		}else{
			gs.draw(this.name,pos);
		}
	};
};
