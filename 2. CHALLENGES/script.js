'strict mode';
///////////////////////////////////////
// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.
*/
const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

//1
const huskyWeight = breeds.find((el) => el.breed==='Husky').averageWeight;
console.log(huskyWeight)
//-----------------------------------------------------------------------------------------------------------------------------
//2
const dogBothActivities= breeds.find((el) => el.activities.includes('running') && el.activities.includes('fetch')).breed;
console.log(dogBothActivities)
//-----------------------------------------------------------------------------------------------------------------------------
//3 --> First try
const allActivities = [];
breeds.forEach(el => allActivities.push(...el.activities));
console.log(allActivities);
//-----------------------------------------------------------------------------------------------------------------------------
//3 --> Better solution
const allActivities2 = breeds.map(el => el.activities).flat();
console.log(allActivities2);
//3 --> Clean code solution
const allActivities3 = breeds.flatMap(el => el.activities);
console.log(allActivities3);
//-----------------------------------------------------------------------------------------------------------------------------
//4
const uniqueActivities= [...new Set(allActivities)];
console.log(uniqueActivities)
//-----------------------------------------------------------------------------------------------------------------------------
//5
console.log('----- 5 -------')
const swimmingAdjacent = [...new Set(breeds.filter(el=> el.activities.includes('swimming')).flatMap(el=>el.activities.filter(el=>el!=='swimming')))]
console.log(swimmingAdjacent)
//-----------------------------------------------------------------------------------------------------------------------------
//6 --> First try
console.log(breeds.findIndex(el=> el.averageWeight<10)<0 ? 'True' : 'False');
//6 --> Better solution
console.log(breeds.every(el=>el.averageWeight>=10));
//-----------------------------------------------------------------------------------------------------------------------------
//7 --> First try
console.log('Breed with 3+ activities: ' + (breeds.findIndex(el=> el.activities.length>=3)>0 ? 'True' : 'False'));
//7 --> Better solution
console.log('Breed with 3+ activities: ' + (breeds.some(el=>el.activities.length>=3)));
//Bonus
console.log(Math.max(...breeds.filter(el=> el.activities.includes('fetch')).map(el=> el.averageWeight)))