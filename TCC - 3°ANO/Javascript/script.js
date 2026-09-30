var percent;

var r = $("circle#bar").attr('r');

var c = Math.PI*(r*2);

var range;

$("circle#bar").css({ strokeDashoffset:c });


function showprogress(number){
  $(".cont").attr('data-percent',number);
  percent = $(".cont").attr('data-percent');
  range = ((100-percent)/100)*c;
  $("circle#bar").css({ strokeDashoffset:range });
}