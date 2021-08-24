// variables
const weightInKg = parseInt(process.argv[2]); // parseInt => parse a whole number
const heightInM = parseFloat(process.argv[3]); // parseFloat => parse a decimal number
const ageInYears = parseInt(process.argv[4]); // parseInt => parse a whole number

// calculate BMI
const BMI = weightInKg / (heightInM * heightInM);
const roundedBMI = Math.round(BMI);

// calculate the ideal weight
const idealWeight = 22.5 * heightInM * heightInM;

// Basal Metabolic Rate (BMR), daily calories
const BMR = (10 * weightInKg) + (6.25 * (heightInM * 100)) - (5 * ageInYears);
const dailyCalories = BMR * 1.4;

// losing 0.5 kg a week by eating 500 calories less
const weightToLose = weightInKg - idealWeight; // only works when the weightInKg is more than the idealWeight
const weeksToLoseWeight = weightToLose / 0.5;
const dietCalories = dailyCalories - 500;

console.log(`
BMI CALCULATOR

weight: ${weightInKg} kg
height: ${heightInM} m
age: ${ageInYears} years

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

Eat ${Math.round(dietCalories)} calories a day for ${Math.round(weeksToLoseWeight)} weeks.

`);