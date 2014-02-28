$( document ).ready( function () {

      // Global var game
      var $rows, $player, $click, $you;

      initGame();

      // Init game
      function initGame() {
        $rows = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        $player = (0 == Math.random()) ? 1 : 10;
        $you = $player;
        $click = 0;
        $( '#tris .box' ).html( '' ).data( 'value', '0' );
      }

      // Click
      $( '#tris .box' ).click( function () {
        var $value = $( this ).data( 'value' );
        if ( '0' == $value ) {
          $( this ).data( 'value', $player )
          var $index = $( this ).data( 'index' );
          $rows[$index] = $player;
          $( this ).html( (1 == $player) ? "O" : "X" );
          checkGame();
        }
        return false;
      } );

      function checkGame() {
        var winValue = (1 == $player) ? 3 : 30;
        
        // Check the first 3 rows
        if ( $rows[0] + $rows[1] + $rows[2] == winValue ||
          $rows[3] + $rows[4] + $rows[5] == winValue ||
          $rows[6] + $rows[7] + $rows[8] == winValue ||
          // le 3 colonne
          $rows[0] + $rows[3] + $rows[6] == winValue ||
          $rows[1] + $rows[4] + $rows[7] == winValue ||
          $rows[2] + $rows[5] + $rows[8] == winValue ||
          // le 2 diagonali
          $rows[0] + $rows[4] + $rows[8] == winValue ||
          $rows[2] + $rows[4] + $rows[6] == winValue ) {
          return showWin();
        }
        else {
          if ( 9 == ++$click ) {
            return gameOver();
          }
        }
        $player = (1 == $player) ? 10 : 1;
        if ( $player != $you ) {
          computer();
        }
      }

      function computer() {
        if ( $player != $you ) {
          var $move = Math.floor( Math.random() * (8 - 0) + 0 );
          if ( 0 == $rows[$move] ) {
            $( '#tris .box[data-index="' + $move + '"]' ).html( (1 == $player) ? "O" : "X" ).data( 'value', $player );
            $rows[$move] = $player;
            return checkGame();
          }
          computer();
        }
      }

      function showWin() {
        alert( ( $player == $you ) ? 'YOU WIN!!!' : 'COMPUTER WIN!!' );
        initGame();
      }

      function gameOver() {
        alert( 'No WIN!' );
        initGame();
      }

    } );
