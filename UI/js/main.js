$(document).ready(function () {
  $('#main2').hide();
  $('#btn1').click(function () {
    $('#main2').show();
    $('#main1').hide();
  });

  $('#btn2').click(function () {
    $('#main2').hide();
    $('#main1').show();
  });
});

//Register a user
function addUser() {
  $('#userForm').submit(function (e) {
    e.preventDefault();
    const firstName = $('#fName').val();
    const lastName = $('#lName').val();
    const email = $('#eml').val();
    const password = $('#pwd').val();
    const url = $(this).attr('action');
    const user = { firstName, lastName, email, password };
    $.ajax({
      url: url,
      type: 'POST',
      data: user,
      success: function (data) {
        $('.side2').html(`
        <h2>You have successfully registered on VOVS</h2>
        <h3>Your details are </h3>
        <b>Name: </b>${data.firstName} ${data.lastName} <br>
        <b>Email: </b>${data.email} <br>
         `);
        alert(`Congratulations ${user.firstName} ${user.lastName}, You have successfully registered on VOVS. You can now sign in and cast your vote`);

      },
      error: function (e) {
        console.log(e.message);
      }
    });
  });
}

function edit() {
  // alert('you clicked');
  $('a[class="current"]').removeClass('current');
$('a[onclick="edit()"]').addClass('current');
$('.main-right').html(`<h2>These are the presidential candidates</h2> 
<div class="candidates"></div>
`);

$.ajax({
  method:'GET',
  url: 'http://localhost:3000/candidates',
  dataType: 'json'
}).done(function(data){
  console.log(data);
  $.map(data, function(candidate, i){
    $('.candidates').append(`
    <div class="candidate">
    <a href="#">
      <div><img src="${candidate.photoUrl}"></div>
      <h4>${candidate.name}</h4>
      <h3>${candidate.party}</h3>
      <p>${candidate.age} years old</p>
    </a>
    <hr>
    <a href="#">Delete</a> <hr>
    <a href="#">Edit</a>
  </div>`);
  });
});

}