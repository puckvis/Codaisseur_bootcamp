// function calculate BMI

function calculateBMI(weight, height) {
  const BMI = weight / (height * height);
  return BMI;
}

// function calculate BMR
function calculateBMR(weight, height, ageOfUser, genderOfUser) {
  const heightInCm = height * 100;

  let BMR;

  if (genderOfUser === "m") {
    BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser + 50;
  } else {
    BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser - 150;
  }
  return BMR;
}

// function calculate idealWeight
function calculateIdealWeight(height) {
  const idealWeight = 22.5 * height * height;
  return idealWeight;
}

// function calculate dailyCalories
function calculateDailyCalories(basalMetabolicRate, doesUserExercise) {
  if (doesUserExercise === "yes") {
    dailyCalories = basalMetabolicRate * 1.6;
  } else {
    dailyCalories = basalMetabolicRate * 1.4;
  }
  return dailyCalories;
}

// function calculate dietWeeks
function calculateDietWeeks(weightLose) {
  const dietWeeks = Math.abs(weightLose / 0.5);
  return dietWeeks;
}

// function calculateDietCalories
function calculateDietCalories(weightLose, dailyUsedCalories) {
  if (weightLose < 0) {
    dietCalories = dailyUsedCalories + 500;
  } else {
    dietCalories = dailyUsedCalories - 500;
  }
  return dietCalories;
}

// function validate number of input
function validateNumberOfInputs(argv) {
  if (argv.length !== 7) {
    console.log(`
      You gave ${argv.length - 2} argument(s) to the program
  
      Please provide 5 arguments for
      
      weight (kg), 
      height (m), 
      age (years), 
      do you exercise daily? (yes or no)
      your gender (m or f)
      
      Example:
  
      $ node index.js 60 1.68 31 yes f
    `);

    process.exit();
  }
}

// function validate weight height age
function validateWeightHeightAge(weight, height, ageOfUser, argv) {
  if (isNaN(weight) || isNaN(height) || isNaN(ageOfUser)) {
    console.log(`
          Please make sure your weight, height and age are numbers:
      
          weight (kg) example: 60 | your input: ${argv[2]}
          height (m) example 1.68 | your input: ${argv[3]}
          age (years) example 31  | your input: ${argv[4]} 
      
          node script.js 60 1.68 31 yes f
        `);

    process.exit();
  }
  if (ageOfUser < 20) {
    console.log(`
          Sorry! This BMI calculator was designed to be used by people older than 20.
      
        `);

    process.exit();
  }

  if (weight < 30 || weight > 300) {
    console.log(`
          Please enter a weight in kgs from 30 to 300 kgs.          
          Your weight of ${argv[2]} kgs does not fall in the range between 30 kg and 300 kg
      
        `);

    process.exit();
  }
}

// function validate daily exercise
function validateDailyExercise(doesUserExercise, argv) {
  if (doesUserExercise != "yes" && doesUserExercise != "no") {
    console.log(`
        Please specify if you exercise daily with "yes" or "no"
        
        daily exercise example: yes | your input: ${argv[5]}
        `);
    process.exit();
  }
}

// function validate gender
function validateGender(genderOfUser, argv) {
  if (genderOfUser != "m" && genderOfUser != "f") {
    console.log(`
            Please specify your gender with "f" (female) or "m" (male)
            
            gender example: f | your input: ${argv[6]}
            `);
    process.exit();
  }
}

// function format output
function formatOutput(userObject) {
  return `
    **************
    BMI CALCULATOR
    **************

    age: ${userObject.ageInYears} years
    gender: ${userObject.gender}
    height: ${userObject.heightInM} m
    weight: ${userObject.weightInKg} kg
    do you exercise daily? ${userObject.dailyExercise}

    ****************
    FACING THE FACTS
    ****************

    Your BMI is ${userObject.BMI}

    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight

    Your ideal weight is ${userObject.idealWeight} kg
    With a normal lifestyle you burn ${userObject.dailyCalories} calories a day

    **********
    DIET PLAN
    **********

    If you want to reach your ideal weight of ${userObject.idealWeight} kg:

    Eat ${userObject.dietCalories} calories a day
    For ${userObject.dietWeeks} weeks
    `;
}

// main function
function bmiCalculator() {
  validateNumberOfInputs(process.argv);

  const weightInKg = parseInt(process.argv[2]);
  const heightInM = parseFloat(process.argv[3]);
  const ageInYears = parseInt(process.argv[4]);
  const dailyExercise = process.argv[5];
  const gender = process.argv[6];

  validateWeightHeightAge(weightInKg, heightInM, ageInYears, process.argv);
  validateDailyExercise(dailyExercise, process.argv);
  validateGender(gender, process.argv);

  const BMI = calculateBMI(weightInKg, heightInM);
  const BMR = calculateBMR(weightInKg, heightInM, ageInYears, gender);
  const idealWeight = calculateIdealWeight(heightInM);
  const dailyCalories = calculateDailyCalories(BMR, dailyExercise);
  const weightToLose = weightInKg - idealWeight;
  const dietWeeks = calculateDietWeeks(weightToLose);
  const dietCalories = calculateDietCalories(weightToLose, dailyCalories);

  const user = {
    weightInKg: weightInKg,
    heightInM: heightInM,
    ageInYears: ageInYears,
    dailyExercise: dailyExercise,
    gender: gender,
    BMI: BMI,
    idealWeight: idealWeight,
    dailyCalories: dailyCalories,
    weightToLose: weightToLose,
    dietWeeks: dietWeeks,
    dietCalories: dietCalories,
  };

  const output = formatOutput(user);
  console.log(output);
}

bmiCalculator();
