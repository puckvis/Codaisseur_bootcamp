// variables
const weightInKg = parseInt(process.argv[2]); // parseInt => parse a whole number
const heightInM = parseFloat(process.argv[3]); // parseFloat => parse a decimal number
const ageInYears = parseInt(process.argv[4]); // parseInt => parse a whole number
const dailyExercise = process.argv[5]; // yes or no
const gender = process.argv[6]; // m or f

// calculate BMI
const BMI = weightInKg / (heightInM * heightInM);
const roundedBMI = Math.round(BMI);

// calculate the ideal weight > ideal BMI = 22.5
const idealWeight = 22.5 * heightInM * heightInM;

// Basal Metabolic Rate (BMR), based on gender
let BMR;

if (gender === "m") {
    BMR = (10 * weightInKg) + (6.25 * (heightInM * 100)) - (5 * ageInYears) + 50;
} 
else {
    BMR = (10 * weightInKg) + (6.25 * (heightInM * 100)) - (5 * ageInYears) - 150
};

// daily calories, based on daily exercise

// if (dailyExercise === "yes") { // true
//    dailyCalories = BMR * 1.6;
// } else { // false
//    dailyCalories = BMR * 1.4;
//};

// Ternary expression
const dailyCalories = dailyExercise === "yes" ? BMR * 1.6 : BMR * 1.4;

// losing 0.5 kg a week by eating 500 calories less or
// gaining 0.5 kg a week by eating 500 calories more

const weightToLose = weightInKg - idealWeight; 
const weeksToLoseWeight = Math.abs(weightToLose / 0.5);

let dietCalories;

if (weightToLose > 0) {
    dietCalories = dailyCalories - 500;
}
else {
    dietCalories = dailyCalories + 500;
}

if (process.argv.length !== 7) {
    console.log(`
      You gave ${process.argv.length - 2} arguments(s) to the program
  
      Please provide 5 arguments for
      
      weight (kg), 
      height (m), 
      age (years), 
      whether you exercise daily (yes or no)
      and your gender (m or f)
      
      Example:
  
    node script.js 60 1.68 31 no f
    `);
  
    process.exit();
  }

  if (isNaN(weightInKg) || isNaN(heightInM) || isNaN(ageInYears)) {
    console.log(`
      Please make sure your weight, height and age are numbers:
  
      weight (kg) example: 60 | your input: ${process.argv[2]}
      height (m) example 1.68 | your input: ${process.argv[3]}
      age (years) example 31  | your input: ${process.argv[4]} 
  
      node script.js 60 1.68 31 no f
    `);
  
    process.exit();
  }

if (ageInYears <= 20) {

    console.log(`
Sorry!
This BMI calculator is designed for people over 20

`);
    process.exit();
};

if (weightInKg < 30 || weightInKg > 300) {
    console.log(`
    Please provide a number for weight in kilograms between 30 and 300
    
    weight (kg) example: 60 | your input: ${process.argv[2]}
    `);
        process.exit();
};
    
if (dailyExercise != "yes" && dailyExercise != "no") {
    console.log(`
    Please specify if you exercise daily with "yes" or "no"
    
    daily exercise: yes | your input: ${process.argv[5]}
    `);
        process.exit();
    };

console.log(`
BMI CALCULATOR

weight: ${weightInKg} kg
height: ${heightInM} m
age: ${ageInYears} years
gender: ${gender}
daily exercise? ${dailyExercise}

***

HERE WE GO...

Your BMI is: ${roundedBMI}

A BMI under 18.5 is considered underweight
A BMI above 25 is considered overweight

Your ideal weight is: ${Math.round(idealWeight)} kg
With a normal lifestyle you burn ${Math.round(dailyCalories)} calories a day

***

DIET PLAN

Do you want to reach your ideal weight of ${Math.round(idealWeight)} kg?

Eat ${Math.round(dietCalories)} calories a day 
for ${Math.round(weeksToLoseWeight)} weeks

`);