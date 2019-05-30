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
        <b>Name: </b>${user.firstName} ${user.lastName} <br>
        <b>Name: </b>${user.email} <br>
         `);
      alert(`Congratulations ${user.firstName} ${user.lastName}, You have successfully registered on VOVS. You can now sign in and cast your vote`);

    },
    error: function (e) {
      console.log(e.message);
    }
  });
});

