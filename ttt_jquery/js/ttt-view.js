class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

//freezing after the winner wins!
//changing the background color of the cells to green for the winer
  bindEvents() {
    this.$el.on("click", (e) => {
      const $square = $(e.target);
      // debugger
      let position = $square.attr("data-pos").split(',').map(el=>parseInt(el));
      if(position){
        let mark = this.game.currentPlayer;
        try {
          this.game.playMove(position);
        }
        catch(e){
          alert(e.msg);
        }
        this.makeMove($square, mark);
        if(this.game.isOver()){
          $('li').each((idx, el) => {
            if(el.textContent === mark){
              $(el).css({"background-color": "green", "color": "white"});
            }
            else{
              $(el).css({"color": "red"});
            }
            // if(el.value())
          });
          alert(`${mark} is winner!`);
        }
      }
    });
  }

//TA this.game.board.grid UNIDEAL
//ask all about variables we are creating
//ask about the fact nothing is centered?

  makeMove($square, mark) {
    $square.css({"background-color": 'white'});
    $square.text(mark);
  }

  setupBoard() {
    const $ul = $("<ul>");
    for(let row = 0; row < 3; row++) {
      for(let col = 0; col < 3; col++){
        const $square = $("<li>").attr("data-pos", [row, col]);
        $ul.append($square);
      }
      this.$el.append($ul);
    }
  }
}

module.exports = View;
