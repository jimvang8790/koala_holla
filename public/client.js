$(document).ready(onReady);

function onReady(){
  $('#submit').on('click', addKoala);
  getKoalas();
}

function getKoalas(){
  $.ajax({
    url:"/koala",
    type: "GET",
    success: function(res) {
      console.log("in getKoalas:", res);

      $('.container').empty();

      for (var i = 0; i < res.length; i++) {
        $('.container').append('<p>Name: ' + res[i].name + ' | Sex: ' + res[i].sex +
         ' | Age: ' + res[i].age + ' | Ready For Transfer: ' + res[i].ready_for_transfer +
          ' | Notes: ' + res[i].notes + '</p>');
      }
    }
  });
}//end function

function addKoala(){

  var objectToSend = {
    name: $('#name').val(),
    sex: $('#sex').val(),
    age: $('#age').val(),
    transfer: $('#transfer').val(),
    notes: $('#notes').val(),
  };

  $.ajax({
    url:"/addingKoala",
    type: "POST",
    data: objectToSend,
    success: function(res) {
      console.log("adding koalas", res);
      getKoalas();
    }
  });
}
