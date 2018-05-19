var view = {
  displayMessage: function (msg) {
    var messageArea = document.getElementById("meassageArea");
    messageArea.innerHTML = msg;

  },
  displayHit: function (location) {
    var cell = document.getElementById(location);//根据玩家猜测生成的id来获取要更新的元素。
    cell.setAttribute("class", "hit");//将<td>元素的class特性设置为hit。将立即显示战舰图像。

  },
  displayMiss: function (location) {

  }
}
view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");//将一个字母和一个数字转换为由两个数字组成的字符串。
view.displayHit("26");

var ship = {
  location: ["10", "20", "30"],
  hits: ["", "", ""]
};
var ships = [{ locations: ["10", "20", "30"], hits: ["", "", ""] },
{ locations: ["32", "33", "34"], hits: ["", "", ""] },
{ locations: ["63", "64", "64"], hits: ["", "", ""] }
];


var model = {
  boardSize: 7,
  numShip: 3,
  shipSunk: 0,
  shipLength: 3,
  ship: [{ locations: ["06", "16", 26], hits: ["", "", ""] },
  { locations: ["24", "34", "44"], hits: ["", "", ""] },
  { locations: ["10", "11", "12"], hits: ["", "", ""] }],


  fire: function (guess) {
    for (var i = 0; i < this.numShip; i++) {
      var ship = this.ships[i];//获取战舰。检查guess是否是该战舰占据的位置之一。
      var location = ship.locations;//获取战舰位置，如果guess包含在数组localions中，就说明击中了该战舰。
    var index = locations.indexOf(guess);//再获取guess在数组localions中的索引。
    if (index >= 0){
      ship.hits[index]= "hit";
      view.displayHit(guess);//告诉视图，玩家的猜测击中了战舰。
      view.displayMessage("HIT!");//视图显示消息“HIT”。
      if (this.isSunk(ship)){//确定战舰被击中后，执行这个检查。
        view.displayMessage("You sank my battleship!")//让玩家知道他击中了一艘船。
        this.shipSunk++;//如果战舰被击中，就将击沉的战舰数（储存在model对象属性shipSunk中）加1.
      }
      return true;//由于击中战舰。需要返回true。
    }
    }
    view.displayMiss(guess);//告诉视图玩家的猜测没有击中战舰。
    view.displayMessage("You missed."); //页面中显示消息。
    return false;//如果遍历所有战舰后，也没有发现被击中的战舰，就说明没有击中任何战舰，所有返回false。
  },
  isSunk: function(ship){
    for (var i=0; i < this.shipLength; i++){ //检查是否每个部位都被击中。
      if (ship.hits[i] !== "hit"){ //只要有任何部位未被击中，战舰就还浮在水面上，因此返回false。
        return false;
      }
    }
    return true;
  }

}


function parseGuess(guess){
  var alphabat =["A","B","C","D","E","F","G"];
  if (guess === null || guess.shipLength !== 2){//检查guess不为null且长度为2.
    alert("Oops,please enter a letter and a number on the bored.")
  }else {
    firstChar = guess.firstCharAt(0);//获取guess中的第一个字符
    var row = alphabat.indexOf(firstChar);//再使用indexof获取0~6的数字，他是这个字母在数组中的位置。
    var cloum = guess.firstCharAt(1);//获取第二个字符，表示列号
    if (isNaN(row) || isNaN(cloum)){//使用函数isNaN检查row和cloum是否都是数字
      alert("Oops,that isn't on the borad.");
    }else if (row < 0 || row >=model.boardSize){//自动类型转换，检查他的值是否在0到6之间。
      alert("Oops ,that's off the borad!");
    }else{
      return row + cloum;//结果是一个字符串
    }
  }
  return null;//如果执行到这里，说明有检查是失败的，所以返回null。
}


var controller ={
  guess: 0 ,
  parseGuess: function(guess){
    var location = parseGuess(guess);//使用parseGuess来验证玩家猜测的有效性
    if (location){//只要返回的不是null，就说明获取的位置是有效的，null是一个假值。
      this.guesses++;//玩家猜测有效， guess加1，如果玩家输入的游戏板位置无效，不计入猜测次数
      var hit = model.fire(location);
      if (hit && model.shipSunk === model.numShip){//如果击中的战舰，且击沉的战舰数与游戏中包含的战舰数相等，就显示消息 他击沉了所有的战舰。
        view. displayMessage("You sank all my battleships,in" + this.guesses + "guesses");
        //向玩家指出他经过多少次猜测就击中了所有的战舰。guess是this的对象，即controller的一个属性
      }
    }
  }
}





