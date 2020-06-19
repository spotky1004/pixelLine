$(function (){
  pixelSelCount = 0;
  pixelPosition = [[0, 0], [0, 0]];

  for (var i = 0; i < 625; i++) {
    $('<span class=pixelCell>').addClass('pl' + Math.floor(i/25+1) + 'c' + (i%25+1)).appendTo('#pixelCanvas');
    if (i%25 == 0 && i != 0) {
      $('<br>').appendTo('#pixelCanvas');
    }
  }

  setInterval( function (){
    screenHeight = $(window).height();
    $('#pixelCanvas').css({width: (screenHeight*0.5+50), height: (screenHeight*0.5+50)});
  }, 100);

  $(document).on('click','.pixelCell',function() {
    indexThis = $('.pixelCell').index(this);
    pixelSelCount++;
    indexL = Math.floor(indexThis/25+1);
    indexC = indexThis%25+1;
    pixelPosition[pixelSelCount%2] = [indexC, indexL];
    $('.pixelCell:eq(' + indexThis +')').css('background-color', ((pixelSelCount%2) ? '#f00' : '#00f'));
    if (pixelSelCount%2 == 0) {
      xLength = Math.abs(pixelPosition[0][0]-pixelPosition[1][0])+1;
      yLength = Math.abs(pixelPosition[1][1]-pixelPosition[0][1])+1;
      inclinationY = xLength/yLength;
      inclinationX = yLength/xLength;
      if (pixelPosition[0][1] < pixelPosition[1][1] && pixelPosition[0][0] < pixelPosition[1][0]) {
        for (var i = 0; i < Math.abs(xLength-2); i++) {
          $('.pl' + (pixelPosition[0][1]+1/inclinationY*(i+1)).toFixed(0) + 'c' + (pixelPosition[0][0]+(i+1)).toFixed(0)).css('background-color', '#000');
        }
        for (var i = 0; i < Math.abs(yLength-2); i++) {
          $('.pl' + (pixelPosition[0][1]+(i+1)).toFixed(0) + 'c' + (pixelPosition[0][0]+1/inclinationX*(i+1)).toFixed(0)).css('background-color', '#000');
        }
      } else if (pixelPosition[0][1] > pixelPosition[1][1] && pixelPosition[0][0] < pixelPosition[1][0]) {
        for (var i = 0; i < Math.abs(xLength-2); i++) {
          $('.pl' + (pixelPosition[0][1]-1/inclinationY*(i+1)).toFixed(0) + 'c' + (pixelPosition[0][0]+(i+1)).toFixed(0)).css('background-color', '#000');
        }
        for (var i = 0; i < Math.abs(yLength-2); i++) {
          $('.pl' + (pixelPosition[0][1]-(i+1)).toFixed(0) + 'c' + (pixelPosition[0][0]+1/inclinationX*(i+1)).toFixed(0)).css('background-color', '#000');
        }
      } else if (pixelPosition[0][1] < pixelPosition[1][1] && pixelPosition[0][0] > pixelPosition[1][0]) {
        for (var i = 0; i < Math.abs(xLength-2); i++) {
          $('.pl' + (pixelPosition[0][1]+1/inclinationY*(i+1)).toFixed(0) + 'c' + (pixelPosition[0][0]-(i+1)).toFixed(0)).css('background-color', '#000');
        }
        for (var i = 0; i < Math.abs(yLength-2); i++) {
          $('.pl' + (pixelPosition[0][1]+(i+1)).toFixed(0) + 'c' + (pixelPosition[0][0]-1/inclinationX*(i+1)).toFixed(0)).css('background-color', '#000');
        }
      } else if (pixelPosition[0][1] > pixelPosition[1][1] && pixelPosition[0][0] > pixelPosition[1][0]) {
        for (var i = 0; i < Math.abs(xLength-2); i++) {
          $('.pl' + (pixelPosition[0][1]-1/inclinationY*(i+1)).toFixed(0) + 'c' + (pixelPosition[0][0]-(i+1).toFixed(0))).css('background-color', '#000');
        }
        for (var i = 0; i < Math.abs(yLength-2); i++) {
          $('.pl' + (pixelPosition[0][1]-(i+1)).toFixed(0) + 'c' + (pixelPosition[0][0]-1/inclinationX*(i+1)).toFixed(0)).css('background-color', '#000');
        }
      } else if (pixelPosition[0][0] == pixelPosition[1][0] && pixelPosition[0][1] > pixelPosition[1][1]) {
        for (var i = 0; i < Math.abs(xLength-2); i++) {
          $('.pl' + (pixelPosition[0][1]+1/inclinationY*(i+1)).toFixed(0) + 'c' + (pixelPosition[0][0]+(i+1)).toFixed(0)).css('background-color', '#000');
        }
        for (var i = 0; i < Math.abs(yLength-2); i++) {
          $('.pl' + (pixelPosition[0][1]-(i+1)).toFixed(0) + 'c' + (pixelPosition[1][0]+0).toFixed(0)).css('background-color', '#000');
        }
      } else if (pixelPosition[0][0] == pixelPosition[1][0] && pixelPosition[0][1] < pixelPosition[1][1]) {
        for (var i = 0; i < Math.abs(xLength-2); i++) {
          $('.pl' + (pixelPosition[0][1]-1/inclinationY*(i+1)).toFixed(0) + 'c' + (pixelPosition[0][0]+(i+1)).toFixed(0)).css('background-color', '#000');
        }
        for (var i = 0; i < Math.abs(yLength-2); i++) {
          $('.pl' + (pixelPosition[0][1]+(i+1)).toFixed(0) + 'c' + (pixelPosition[1][0]+0).toFixed(0)).css('background-color', '#000');
        }
      } else if (pixelPosition[0][1] == pixelPosition[1][1] && pixelPosition[0][0] < pixelPosition[1][0]) {
        for (var i = 0; i < Math.abs(xLength-2); i++) {
          $('.pl' + (pixelPosition[0][1]-0).toFixed(0) + 'c' + (pixelPosition[1][0]-i-1).toFixed(0)).css('background-color', '#000');
        }
      } else if (pixelPosition[0][1] == pixelPosition[1][1] && pixelPosition[0][0] > pixelPosition[1][0]) {
        for (var i = 0; i < Math.abs(xLength-2); i++) {
          $('.pl' + (pixelPosition[0][1]-0).toFixed(0) + 'c' + (pixelPosition[1][0]+i+1).toFixed(0)).css('background-color', '#000');
        }
      }
    }
  });
  $(document).on('click','#resetGen',function() {
    pixelSelCount = 0;
    $('.pixelCell').css('background-color', 'rgba(0, 0, 0, 0)');
  });
});
