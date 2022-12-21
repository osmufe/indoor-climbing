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

var climbAttemptDescent, climbTotalAscent, climbTotalDescent, climbDurationDescent;

function evaluate(input, output) {
   if ((output.climbAttemptAscent == climbAttemptDescent &&  output.climbAttemptAscent != 0) || (output.climbAttemptAscent == climbAttemptDescent &&  climbAttemptDescent != 0)) {
     // Trigger lap once
     $.put("/Activity/Trigger", 0);
   }
   
   if (input.AscentMeters != null || input.DescentMeters != null) {
    // .toFixed(0) Without decimals
    output.climbAttemptAscent = input.AscentMeters.toFixed(0) - climbTotalAscent;
    climbAttemptDescent = input.DescentMeters.toFixed(0) - climbTotalDescent;
    output.climbDurationAscent = input.DurationAscent;
    climbDurationDescent = input.DurationDescent;
    // Use this var to save the data on SA for each lap(if is possible)  
    output.climbDurationAscentDescent = input.DurationAscent + input.DurationDescent;
   } 
   //output.climbAttempts = output.climbAttempts +1;
   //output.climbAttemptAscent = output.climbAttemptAscent +1;
   //output.climbDurationAscent = 60;
   //output.climbDurationDescent = 62;
 }
 
 function onLoad(input, output) {
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
   // Initializing Variables for new Ascent
   output.climbAttemptAscent = 0;
   climbAttemptDescent = 0;
   climbTotalAscent = input.AscentMeters.toFixed(0);
   climbTotalDescent = input.DescentMeters.toFixed(0);
   output.climbAttempts = output.climbAttempts + 1
 }
 
 function getUserInterface() {
   return {
     template: 't',
     ascents: { input: 'output/climbAttempts', format: 'Count_Fourdigits' },
     ascent: { input: 'output/climbAttemptAscent' , format: 'Count_Fourdigits' },
     ascent_time: { input: 'output/climbDurationAscent' , format: 'Duration_Fourdigits' },
     ascent_descent_duration: { input: 'output/climbDurationAscentDescent' , format: 'Duration_Fourdigits' },
     duration: { input: '/Activity/Activity/-1/Duration/Current', format: 'Duration_Training' }
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
 