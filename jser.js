// render the chart inside of a function and then call the function. Have a function that can make the chart get it hard coded
// clean it up
// total=total+new
// add the new value to the total val(total)
var total = 1000;
$(document).ready(function() {
  // load page

  function validateNumbers(input){
    var isValid=false
    if(input.val()){
      isValid=true
      // if everything comes back as good
    }
    else{
      alert("please enter a number")
      return false
      // if the requirements aren't met than an error appears
    }
    // TODO: ask leaon about typeof
    if (typeof input.attr("max") !== typeof undefined
    && input.attr("max") !==false
    && typeof input.attr("min") !==typeof undefined
    && input.attr("min") !==false
    // checking to make sure the parameters are met
  ){
    var max=input.attr("max")
    // taken from html
    var min=input.attr("min")
    // taken from html
    if (input.val()>min && input.val()<max){
      isValid=true
      // chekcing to see if the paramereter sare met between the max and min
    }
  }
  console.log(isValid)
  return isValid
  // likely not doing anything
}

$("#submit").on("click",function(event){
  // when submit has been selected and it cheks to make sure that the rules are met
  event.preventDefault();
  // limits actions which otherwise would have occured with the lis
  var gender=$("input[type=radio][name=gender]:checked");
  // radio button checker which may not be doing anything
  console.log(gender)
  var height = $("#height")
  var heightVal = parseFloat($("#height").val())
  // numeric height
  console.log(height)
  var age=$("#tester")
  // age val
  var ageVal = parseFloat($("#tester").val())
  // numeric age
  var weight=$("#weight")
  // weight val
  var weightVal= parseFloat($("#weight").val())
  // numeric val
  var woman=$("#female")
  // radio value
  var man=$("#male")
  // radio value
  // var rem
  if (gender && validateNumbers(height) && validateNumbers(age) && validateNumbers(weight) )  {

    // checks to make sure that numbes enter ed are valid

    $(".dropdown").css("display","block");
    // shows bottom
    $("#start").css("display","none")
    // hides top
    // && height[0].value<4.5 && age[0].value<5)
    if ($("#female").prop("checked")){
      // if female radio button is selected
      var caloriesW=(655+4.35*(weightVal)+4.7*(heightVal)-6.7*(ageVal))
      // does the math for total recommended calories
      var calW=parseFloat(caloriesW)
      // makes the string a number
      total = calW;
      // console.log=(caloriesW)
      $(".recommendation").text("Recommended number calaries for the day:"+caloriesW)
      // shows toal calories based on perameters



    }
    else if($("#male").prop("checked")){
      // when the radio button for men is selected
      var caloriesM=66+(6.23*(weightVal))+(12.7*(heightVal))-(6.8*(ageVal))
      // math for finding calorie recommendation for meen
      var calM=parseFloat(caloriesM)
      total = calM;
      // makes the values numeric
      $(".recommendation").text("Recommended number calaries for the day:"+caloriesM)
      // shows the total daily calories
      //
    }
    else{
    }
  }
})
$("#height"|"#tester"|"#width").keyup(function(event) {
  if (event.keyCode === 13) {
    $("#id_of_button").click();
  }
})
$("#back").on("click",function(){
  // hide section and show the past
  $(".dropdown").css("display","none")
  // display top
  $("#start").css("display","block")
  // hid bottom section
  $("ul").empty()
  // reset lis as to prevent issues with pie (may remove)
})

var number;
var nutrient;
$(".consumeFood").on("click",function(){
  var buttonId=$(this).attr('id')

  // class which indicates related actions will havient to both fields
  var result=$(".toEat").val()
  // value from the eaten food field (may be repeat)
  var productID = "meh";
  var url="https://api.nal.usda.gov/ndb/search/?format=json&q="+result+"&sort=n&max=25&offset=0&api_key=RnotMa0M8W3WBFXhhVLncgp4Ga6e5TDQNMjZ0XD5"

  // full url
  $.ajax({
    url:url,
    // get the name of the  product and the number
    // TODO: add a dropdown with the api options
    success:function(r,status){
      number=r.list.item[0].ndbno
      // takes the first of the array of foods with the word in it and gets its id
      productID = r.list.item[0].ndbno
      // takes the first of the array of foods with the word in it and gets its id
      console.log(status)
    },
    error:function(err){
      console.log(err)
    },
    complete:function(s){
      // s.responseText is the same as r in success its a paramete
      console.log(s.responseText)
      //var productID=s.responseText.list.item[0].ndbno
      // create the ajax request for the nutrients
      var apikey="RnotMa0M8W3WBFXhhVLncgp4Ga6e5TDQNMjZ0XD5"
      // key
      var urlfood="  https://api.nal.usda.gov/ndb/reports/"
      // base
      var totalCalaries=0
      $.ajax({
        url: urlfood,
        // link
        contentType:"application/json",
        // json
        data:{
          api_key: apikey,
          // api variable
          ndbno: productID,
          // food index
        },
        // gent nutrian details
        success: function(r){
          // foodSelect(r)
          // TODO figure out why its populating multiple lis
          // console.log(nutr)
          // variablevalue for what you have eaten
          nutrient=parseFloat(r.report.food.nutrients[0].value)
          // variable value for what you want to eat

          total = total - nutrient;
          var chart = new CanvasJS.Chart("chartContainer",
          // fulling the chart
          {
            animationEnabled: true,
            theme: "theme2",
            // selects which pie type will be displayed
            title:{
              text: "Calorie Pie"
              // display
            },
            data: [
              {
                type: "pie",
                startAngle:240,
                indexLabel: "#percent%",
                // makes the pie not display the numbers as going above 100%
                percentFormatString: "#0.##",
                toolTipContent: "{y} (#percent%)",
                // creates percents
                indexLabel: "{label} {y}",
                dataPoints: [
                  {  y: 5, indexLabel: "Remaining Calories" },
                  // adds calary total to the li
                ]
              }
            ]
          });
          chart.render();
          // pie appears
          var length = chart.options.data[0].dataPoints.length;
	chart.options.data[0].dataPoints.push({ y:nutrient});
	chart.render();
  var length = chart.options.data[0].dataPoints.length;
	chart.options.data[0].dataPoints[0].y = total;
	chart.render();

          if (buttonId=="eat"){
            console.log("jane")
            nutrient=parseFloat(r.report.food.nutrients[0].value)
            var inputInfo = $("#inputID").val()
            var fruits = [];
            document.getElementById("additionalCon").innerHTML = fruits;

            function myFunction() {
              fruits.push$("#totalConsumed");
              document.getElementById("additionalCon").innerHTML = fruits;
            }
            var a=0
            a=a+nutrient
            $("input[name=item]").val();

            $('#eaten').append('<li class="li">'+inputInfo+"="+nutrient+"calories"+'<button class="delete">delete</button></li>');
            $("#totalConsumed").html(a)

            $(".delete").on("click",function(){
              $(this).parent().remove();
            })

          }
          else if (buttonId=="possibleEat"){
            console.log(r.report.food.nutrients["0"].nutrient_id)
            console.log(r.report.food.nutrients[0].value)
            console.log(r.report.food.nutrients[0])
            var input = $("#wantToEat").val()
            // var length = chart.options.data[0].dataPoints.length;
            // chart.data[0].addTo("dataPoints", {y: nutrient, indexLabel: input});
            //  chart.render();
            var b=0
            b=b+nutrient
            $("input[name=item2]").val();
            $('#want').append('<li class="right">'+input+"="+nutrient+"calories"+'<button class="del">delete</button></li>');
            $(".del").on("click",function(){
              $(this).parent().remove();
            })
          }

        },
        error:function(error){
          console.log(r)
        }
      })
    }
  })
  $("#eat"||"#possibleEat").keyup(function(event) {
    if (event.keyCode === 13) {
      $("#id_of_button").click();
    }
  })
  // create an li with the value entered in the field
  $('#first').on('submit', function(event){
    console.log(number)
    console.log("nutrient inside", nutrient)
    event.preventDefault();

    // take the information from the input

  });

  $('#second').on('submit', function(event){
    event.preventDefault();
    // take the information from the input

  })
})
});
// potential additional functionality
// autofill
// on click get a list of products with a scroll through to find the appropriate amount
// portion indication
// search foods filter by least and most calories and words
