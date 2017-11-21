# Calorie App
This app uses user input to generate recommended calories for said user using a mathematical algorithm. This information then generates a pie chart with the calories. The user than can enter the foods they have eaten and the foods they want to eat and see the chart fluctuate as a result of these foods.
## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Jquery, APIs, canvasjs

When the user inputs their sex, age, weight and height the system generates a recommended calorie amount and displays the information on a chart as well as two more input fields one for foods eaten and one for foods which a person wants to eat. When the user inputs values into either of these fields and presses the correlating button the pie chart is updated to show the change in calories remaining to consume and those which have been consumed. Under the input a list of food items and the calories associated with them is created. The calories are based on the first value outputted from the USDA related to the term searched. These values are then taken and added together to create a running total for the calories consumed and the calories wanted to be consumed. These lis can also be deleted to alter results and the user may also back track to their input about their sex, height etc.

## Optimizations:

Create more error messages, improve labeling in the pie chart, correct issue with calorie output for foods the user wants to eat. Fix the running total of calories consumed.

## Lessons Learned:

This was a good practice for a variety of forms features and allowed me to use graph libraries extensively.

## Examples:

Take a look at these couple examples that I have in my own portfolio:

**Animal Farm:** https://github.com/mardelvalle/Animal-Farm

**Wikipedia and NYT API:** https://github.com/mardelvalle/Wikipedia-and-NYT-API
