$(document).ready(function(){
  $('#main2').hide();
  $('#btn1').click(function(){
    $('#main2').show();
    $('#main1').hide();
  });

  $('#btn2').click(function(){
    $('#main2').hide();
    $('#main1').show();
  });

});