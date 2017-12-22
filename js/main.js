var json = "https://raw.githubusercontent.com/wakayama-pref-org/pr_magazine_event_2017_12/master/json/pr_magazine_event_2017_12.json";
getEvent(json);

function getEvent(json) { //jsonを読み込む関数
  $.getJSON(json , function(data) {
    var ulObj = $("#demo"), //ulタグに挿入するオブジェクトを作成
    len = data.length;
    console.log("json", data); //jsonの中身をコンソールで表示
    for(var i = 0; i < len; i++) { //jsonの中身を取り出す
      if(data[i]["対象"].indexOf("小学生") != -1) //もし"対象"というキーが"小学生"という文字列を含んでいたら実行
      ulObj.append($("<li>").attr({"id":i}).text(data[i]["開催日"])); //ulタグに情報を追加
    }
  });
}

$(document).ready(function calendarMake(){ //カレンダーを作成する関数
  $.getJSON(json , function(data) {
    var ulObj = $("#demo"), //ulタグに挿入するオブジェクトを作成
    len = data.length;
    console.log("json", data); //jsonの中身をコンソールで表示
    var event_array = [];
    for(var i = 0; i < len; i++) { //jsonの中身を取り出す
      var eventdate;
      if(data[i]["開催日"].indexOf("月") != -1){
        var splitdate = data[i]["開催日"].split("月");
        var month = splitdate[0].slice(-2);
        var date = splitdate[1].slice(0, 2);
        if(isNaN(date) == true){
          var date = date.slice(0, 1);
          var date = "0" + date;
        }
        if(date.length == 1){
          var date = date.slice(0, 1);
          var date = "0" + date;
        }
        if(month == 1){
          eventdate = "2018-" + "0" + month + "-" + date;
        }else{
          eventdate = "2017-" + month + "-" + date;
        }
        console.log(eventdate);
        console.log(data[i]["催し名"]);
        event_array.push({
          title: data[i]["催し名"],
          start: eventdate,
          url: 'map.html' + '?date=' + eventdate
        });
      }
    }
    $('#calendar').fullCalendar({
      events:event_array
    });
  });
});

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), { // #sampleに地図を埋め込む
    center: { // 地図の中心を指定（和歌山市役所）
      lat: 34.230517, // 緯度
      lng: 135.170808 // 経度
    },
    zoom: 10 // 地図のズームを指定
  });
}

$(document).ready(function(){
  $("#marker").on('click', function(){  //"マーカ"ボタンが押されたときマーカをたてる
  putMarker();
  });
});

function putMarker(){　//マーカをたてる関数
  var markerLatlng = new google.maps.LatLng(34.230517,135.170808);// マーカを立てる位置

  var contentString = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">和歌山市役所</h1>'+
  '<div id="bodyContent">'+
  '<p>ここは和歌山市役所です．</p>'+
  '</div>'; //情報ウィンドウの説明

  var infowindow = new google.maps.InfoWindow({ //情報ウィンドウの表示
    content: contentString
  });
  var marker = new google.maps.Marker({ //マーカを立てる処理
    position: markerLatlng,
    title:"和歌山市役所"
  });
  marker.setMap(map);
  marker.addListener('click', function() { //マーカをクリックしたときの処理
    infowindow.open(map, marker); //情報ウィンドウを開く
  });
}
