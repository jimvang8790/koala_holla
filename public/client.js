$(document).ready(onReady);

function onReady(){
  getKoalas();
}

function getKoalas(){
  $.ajax({
    url:"/koala",
    type: "GET",
    success: function(res) {
      console.log("in getKoalas:", res);

      for (var i = 0; i < res.length; i++) {
        $('.container').append('<p>Name: ' + res[i].name + ' | Sex: ' + res[i].sex +
         ' | Age: ' + res[i].age + ' | Ready For Transfer: ' + res[i].ready_for_transfer +
          ' | Notes: ' + res[i].notes + '</p>');
      }
    }
  });
}
