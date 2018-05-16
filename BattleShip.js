var view ={
  displayMessage: function (msg) {
    var messageArea = document.getElementById("meassageArea");
    messageArea.innerHTML = msg;
    
  },
  displayHit: function(location){
    var cell = document.getElementById(location);//根据玩家猜测生成的id来获取要更新的元素。
    cell.setAttribute("class","hit");//将<td>元素的class特性设置为hit。将立即显示战舰图像。

  },
  displayMiss: function(location){

  }
}
view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");//将一个字母和一个数字转换为由两个数字组成的字符串。
view.displayHit("26");


