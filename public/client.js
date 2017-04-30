// getting document ready
$(document).ready(onReady);

// on click
function onReady(){
  // event listener
  $('#submit').on('click', addKoala);
  $(document).on('click', '.delete', relocate); // creating a new document inorder to delete
  getKoalas(); // getKoalas will be display as soon as server is up
} // end of onReady

// ***NOTE***
// this function is appending koala to the DOM and database
function getKoalas(){
  $.ajax({
    url:"/koala",
    type: "GET",
    success: function() {
      console.log("in getKoalas:", response);

      $('.container').empty();

      // this loop is how the appending new koala will look on the DOM
      for (var i = 0; i < response.length; i++) {
        $('.container').append('<p>Name: ' + response[i].name + ' | Sex: ' + response[i].sex +
         ' | Age: ' + response[i].age + ' | Ready For Transfer: ' + response[i].ready_for_transfer +
          ' | Notes: ' + response[i].notes + '</p></div><button class="delete" data-koalaid="'+res[i].id+'">Relocate</button>');
      } // end of for loop
    } // end of success
  }); // end of ajax
}//end getKoalas function

// ***NOTE***
// this is what info to add to the koala table
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
    data: objectToSend, // this data is being sent to app.post via the ajax
    success: function(response) {
      console.log("adding koalas", response);
      getKoalas();
    } // end of success
  }); // end of ajax
} // end of addKoala function

//***NOTE***
// this function is removing a koala from the koala database and on the DOM
function relocate (){
  var myID = $(this).data('koalaid');
  console.log('remove', myID);

  // sending to server via ajax
  $.ajax({
    url: '/remove',
    type: 'DELETE',
    data: {id: myID},
    success: function(response) {
      console.log(response);
      getKoalas(); // calling get koala whenever
    } // end of success
  }); // end of ajax
} // end of relocate function
