/*
 function onLap() { trace('--- onLap ---'); }
 function onAutoLap() { trace('--- onAutoLap ---'); }
 function onInterval() { trace('--- onInterval ---'); }
 function onPoolLength() { trace('--- onPoolLength ---'); }
 function onExerciseStart() { trace('--- onExerciseStart ---'); }
 function onExercisePause() { trace('--- onExercisePause ---'); }
 function onExerciseContinue() { trace('--- onExerciseContinue ---'); }
 function onExerciseEnd() { trace('--- onExerciseEnd ---'); }
 function onExercisePause() { trace('--- onExerciseEnd ---'); }
 function onExerciseContinue() { trace('--- onExerciseEnd ---'); }
 */

// Output var climbAttempts: Number of times you make a route or ascent/descent in indoor climbing.
// Output var climbDurationAscentDescent: The time it takes to complete a route or ascent/descent in indoor climbing.
// Output var climbDurationAscent: The ascent in meters in indoor climbing.
// main.js var climbDurationDescent: The time it takes to descend in indoor climbing.
// main.js var climbTotalAscent: Total training climb minus current climb.
// main.js var climbTotalDescent: Total training decrease minus current decrease.
// Output var climbAttemptAscent: Ascent in meters of actual ascent or indoor climbing route.
// main.js var climbAttemptDescent: Descent in meters of actual descent or indoor climbing route.
// Watch var DurationAscent: Total time in the workout that the watch calculate Ascent Time.
// Watch var DurationDescent: Total time in the workout that the watch calculate Descent Time.
// Watch var AscentMeters: Total Ascent meters in the workout.
// Watch var DescentMeters: Total Descent meters in the workout.

var currentTemplate, climbAttemptDescent, climbTotalAscent, climbTotalDescent, climbDurationDescent;

function evaluate(input, output) {  
  if ((output.climbAttemptAscent <= climbAttemptDescent) && 
   ((output.climbAttemptAscent > 0) || (climbAttemptDescent > 0))) {
    // Trigger lap once
    $.put("/Activity/Trigger", 0);
  }

  // .toFixed(0) Without decimals & Update the Ascent&Descent Meters if change
  output.climbAttemptAscent = input.AscentMeters.toFixed(0) - climbTotalAscent;
  climbAttemptDescent = input.DescentMeters.toFixed(0) - climbTotalDescent;
  // Save the Distance in meters when ascensing because later generate the angle of each Attempt

  if ((output.climbAttemptAscent > 0) && (climbAttemptDescent == 0)) {
    // Condition that you can make actions in Ascent period
    output.climbDurationAscent = input.DurationAscent;
    // Use this var to save the data on SA for each lap 
    output.climbDurationAscentDescent = input.DurationAscent + input.DurationDescent;     
  } else if (climbAttemptDescent > 0) {
    // Condition that you can make actions in Descent period
    climbDurationDescent = input.DurationDescent;
    // Use this var to save the data on SA for each lap 
    output.climbDurationAscentDescent = input.DurationAscent + input.DurationDescent;
  }
}
 
function onExerciseStart(input, output) {
  // Initializing Variables 
  output.climbAttempts = 0;
  output.climbDurationAscentDescent = 0;
  output.climbDurationAscent = 0;
  climbDurationDescent = 0;
  climbTotalAscent = 0;
  climbTotalDescent = 0;
  output.climbAttemptAscent = 0;
  climbAttemptDescent = 0;
}

function onLap(input, output) { 
  if (output.climbAttemptAscent != climbAttemptDescent) {
    // Collect the latest data
    // .toFixed(0) Without decimals
    output.climbAttemptAscent = input.AscentMeters.toFixed(0) - climbTotalAscent;
    climbAttemptDescent = input.DescentMeters.toFixed(0) - climbTotalDescent;
    output.climbDurationAscent = input.DurationAscent;
    climbDurationDescent = input.DurationDescent;
    // Use this var to save the data on SA for each lap
    output.climbDurationAscentDescent = input.DurationAscent + input.DurationDescent;
  }

  // Initializing Variables for new Ascent and increase output.climbAttempts Variable
  output.climbAttemptAscent = 0;
  climbAttemptDescent = 0;
  climbTotalAscent = input.AscentMeters.toFixed(0);
  climbTotalDescent = input.DescentMeters.toFixed(0);
  output.climbAttempts = output.climbAttempts + 1;
}
 
 function getUserInterface(input, output) {
   return {
    template: 't'
   };
 }
 
 // This is called also when user backs from exercise start panel without starting
 // exercise. onExerciseEnd() is not working at all as zapp gets disabled before
 // it is called (and it would be called only when exercise is really started).
 function getSummaryOutputs(input, output) {
   return [
     {
      // Save the data of number of times you make a route or ascent/descent in indoor climbing into SA.
      id: 'climbAttempts',
      name: "Number of Ascent",
      format: 'Count_Threedigits',
      value: output.climbAttempts
     },
   ];
 }
