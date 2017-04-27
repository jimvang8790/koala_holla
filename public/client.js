$(document).ready(onReady);

function onReady(){
  // event listener
  $('#submit').on('click', addKoala);
  getKoalas();
} // end of onReady

function getKoalas(){
  $.ajax({
    url:"/koala",
    type: "GET",
    success: function() {
      console.log("in getKoalas:", response);

      $('.container').empty();

      for (var i = 0; i < response.length; i++) {
        $('.container').append('<p>Name: ' + response[i].name + ' | Sex: ' + response[i].sex +
         ' | Age: ' + response[i].age + ' | Ready For Transfer: ' + response[i].ready_for_transfer +
          ' | Notes: ' + response[i].notes + '</p>');
      } // end of for loop
    } // end of success
  }); // end of ajax
}//end getKoalas function

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
    success: function(response) {
      console.log("adding koalas", response);
      getKoalas();
    } // end of success
  }); // end of ajax
} // end of addKoala function
