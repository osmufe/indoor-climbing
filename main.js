var climbAttemptDescent, climbTotalAscent, climbTotalDescent, climbDurationDescent;

function evaluate(input, output) {
   if ((output.climbAttemptAscent == climbAttemptDescent &&  output.climbAttemptAscent != 0) || (output.climbAttemptAscent == climbAttemptDescent &&  climbAttemptDescent != 0)) {
     output.climbAttempts = output.climbAttempts + 1
 
     climbTotalAscent = input.AscentMeters.toFixed(0);
     climbTotalDescent = input.DescentMeters.toFixed(0);

     output.climbAttemptAscent = 0;
     climbAttemptDescent = 0;
     // Trigger lap once
     $.put("/Activity/Trigger", 0);
   }
   
   if (input.AscentMeters != null || input.DescentMeters != null) {
    // .toFixed(0) Without decimals
    output.climbAttemptAscent = input.AscentMeters.toFixed(0) - climbTotalAscent;
    climbAttemptDescent = input.DescentMeters.toFixed(0) - climbTotalDescent;
    output.climbDurationAscent = input.DurationAscent;
    climbDurationDescent = input.DurationDescent;
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
   // .toFixed(0) Without decimals
   climbTotalAscent = 0;
   climbTotalDescent = 0;
   output.climbAttemptAscent = 0;
   climbAttemptDescent = 0;   
 }
 
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
 
 function getUserInterface() {
   return {
     template: 't',
     ascent: { input: 'output/climbAttemptAscent' , format: 'Count_Fourdigits' },
     ascent_time: { input: 'output/climbDurationAscent' , format: 'Duration_FourdigitsFixed' },
     ascent_descent_duration: { input: 'output/climbDurationAscentDescent' , format: 'Duration_FourdigitsFixed' },
     ascents: { input: 'output/climbAttempts', format: 'Count_Sixdigits' },
     duration: { input: '/Activity/Activity/-1/Duration/Current', format: 'Duration_Training' }
 
   };
 }
 
 // This is called also when user backs from exercise start panel without starting
 // exercise. onExerciseEnd() is not working at all as zapp gets disabled before
 // it is called (and it would be called only when exercise is really started).
 function getSummaryOutputs(input, output) {
   return [
     {
      id: 'climbAttempts',
      name: "Climb attempts",
      format: 'Count_Fourdigits',
      value: output.climbAttempts
     }
   ];
 }
 