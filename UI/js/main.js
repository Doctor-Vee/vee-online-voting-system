$(document).ready(function () {
  $('#main2').hide();
  $('.modal').hide();
  $('.election').hide();
  // $('.vote-right').hide();
  $('.login-right').hide();

  $('#btn1').click(function () {
    $('#main2').show();
    $('#main1').hide();
  });

  $('#btn2').click(function () {
    $('#main2').hide();
    $('#main1').show();
  });
});


function showModal() {
  $('.modal').show();
}

function hideModal() {
  $('.modal').hide();
}

function showElection() {
  $('.election').show();
}

function hideElection() {
  $('.election').hide();
}

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
        alert(`Congratulations ${data.firstName} ${data.lastName}, You have successfully registered on VOVS. You can now sign in and cast your vote`);

      },
      error: function (e) {
        console.log(e.message);
      }
    });
  });
}

function loginUser() {
  $('#loginForm').submit(function (e) {
    e.preventDefault();
    const email = $('#loginEml').val();
    const password = $('#loginPwd').val();
    const user = { email, password };
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/users',
      dataType: 'json'
    }).done(function (data) {
      let index;
      for (let i = 0; i < data.length; i++) {
        if (user.email === data[i].email && user.password === data[i].password) {
          index = i;
        }
      }
      if (index) {
        data = data[index];
        localStorage.setItem('userDetails', JSON.stringify(data));
        location.href = 'userdashboard.html';
      } else {
        $('#welcomeBack').html(`Invalid username or password`);
      }
    });
  });
}

function logOutUser() {
  localStorage.removeItem('userDetails');
  console.log('Done');
}

//Register a candidate
function addCandidate() {
  console.log('In form now');
  window.location.href = '/';
}


//Admin can edit all candidates
function edit() {
  $('a[class="current"]').removeClass('current');
  $('a[onclick="edit()"]').addClass('current');
  $('.main-right').html(`<h2>These are the presidential candidates</h2> 
<div class="candidates"></div>
`);

  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/candidates',
    dataType: 'json'
  }).done(function (data) {
    console.log(data);
    $.map(data, function (candidate, i) {
      $('.candidates').append(`
    <div class="candidate">
    <a href="#" onclick="viewCandidate(${candidate.id})">
      <div><img src="${candidate.photoUrl}"></div>
      <h4>${candidate.name}</h4>
      <h3>${candidate.party}</h3>
      <p>${candidate.age} years old</p>
    </a>
    <hr>
    <a href="#" onclick="deleteCandidate(${candidate.id})">Delete</a> <hr>
    <a href="#" onclick="modal(${candidate.id}, '${candidate.name}', 
    ${candidate.age}, '${candidate.party}', '${candidate.photoUrl}')">Update</a>
  </div>`);
    });
  });
}

function modal(id, name, age, party, photoUrl) {
  showModal();
  $('#modal-id').attr('value', id);
  $('#modal-name').attr('value', name);
  $('#modal-age').attr('value', age);
  $('#modal-party').attr('value', party);
  $('#modal-photoUrl').attr('value', photoUrl);
}

function update() {
  console.log("Entered");
  $('#modalForm').submit(function (e) {
    e.preventDefault();
    const id = $('#modal-id').val();
    const name = $('#modal-name').val();
    const age = $('#modal-age').val();
    const party = $('#modal-party').val();
    const photoUrl = $('#modal-photoUrl').val();
    let url = $(this).attr('action');
    url += `/${id}`;
    const candidate = { name, age, party, photoUrl };
    $.ajax({
      url: url,
      type: 'PUT',
      data: candidate,
      success: function (data) {
        alert(`Congratulations ${data.name}'s details have been updated successfully`);
      },
      error: function (e) {
        console.log(e.message);
      }
    });
  });
}

function viewCandidate(id) {
  let url = 'http://localhost:3000/candidates';
  url += `/${id}`;
  $.ajax({
    method: 'GET',
    url: url,
    dataType: 'json'
  }).done(function (data) {
    console.log(data);
    $('.main-right').html(`<h2>${data.name}</h2>
    <div class="candidates"></div>
  `);
    $('.candidates').append(`
    <div>
      <div><img src="${data.photoUrl}"></div>
      <h3>${data.party}</h3>
      <p>${data.age} years old</p>`);
  });
}

function deleteCandidate(id) {
  let url = 'http://localhost:3000/candidates';
  url += `/${id}`;
  $.ajax({
    url: url,
    type: 'DELETE',
    success: function (data) {
      alert(`The deleted candidate can no longer participate in this election`);
    },
    error: function (e) {
      console.log(e.message);
    }
  });
}

function election() {
  showElection();
}

function deadline() {
  console.log('Entered in to the deadline region')
  $('#electionForm').submit(function (e) {
    e.preventDefault();
    const deadline = $('#deadline').val();
    const election = { deadline };
    $.ajax({
      url: 'http://localhost:3000/election/1',
      type: 'PUT',
      data: election,
      success: function (data) {
        alert(`Voting ends by ${data.deadline}`);
      },
      error: function (e) {
        console.log(e.message);
      }
    });
  });
}

// USER ACTIONS

//View all candidates
function view() {
  $('a[class="current"]').removeClass('current');
  $('a[onclick="view()"]').addClass('current');
  $('.main-right').html(`<h2>These are the presidential candidates</h2> 
<div class="candidates"></div>
`);

  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/candidates',
    dataType: 'json'
  }).done(function (data) {
    console.log(data);
    $.map(data, function (candidate, i) {
      $('.candidates').append(`
    <div class="candidate">
    <a href="#" onclick="viewCandidate(${candidate.id})">
      <div><img src="${candidate.photoUrl}"></div>
      <h4>${candidate.name}</h4>
      <h3>${candidate.party}</h3>
      <p>${candidate.age} years old</p>
    </a>
  </div>`);
    });
  });
}

// View Results
function results() {
  $('a[class="current"]').removeClass('current');
  $('a[onclick="results()"]').addClass('current');
  $('.main-right').html(`<h2>These are the results</h2> 
<div class="candidates"></div>
`);
  let candidate1 = 0, candidate2 = 0;
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/votes',
    dataType: 'json'
  }).done(function (data) {
    console.log(data);
    $.map(data, function (vote, i) {
      if (vote.vote === "1") {
        candidate1++;
      } else if (vote.vote === "2") {
        candidate2++;
      }
    });
    $('.candidates').append(`
    <div class="candidate">
    <a href="#" onclick="viewCandidate(1)">
      <h4>Candidate 1</h4>
      <h3>${candidate1} vote(s)</h3>
    </a>
  </div>`);
    $('.candidates').append(`
  <div class="candidate">
  <a href="#" onclick="viewCandidate(2)">
    <h4>Candidate 2</h4>
    <h3>${candidate2} vote(s)</h3>
  </a>
</div>`);
  });
}