let sport: string ="run";
//let distance: number = "yes"; // This will cause a type error because distance is declared as a number but assigned a string value.
let distance: number = 6.5;

let isRestDay: boolean = false;

function logWorkout(sport: string, distance: number, isRestDay: boolean): void {
    if (isRestDay) {
        console.log(`Today is a rest day. No ${sport} workout.`);
    } else {
        console.log(`Today's workout: ${sport} for ${distance} km.`);
    }
}

logWorkout("cycle", 15, false);
//logWorkout("cycle", "15", false);

interface Workout {
  sport: string;
  distance?: number;
  duration?: number;
  isRestDay: boolean;
}

const myWorkout1: Workout = {
  sport: "swim",
  distance: 1,
  duration: 45,
  isRestDay: false
};

const restDay: Workout = {
  sport: "rest",
  isRestDay: true
};

/*
const myWorkout2: Workout = {
  // sport: "run",  missing sport property, but it's required
  //distance: 0,    missing distance property, but it's optional
  duration: 35,
  isRestDay: false
};*/

type Sport = "run" | "cycle" | "swim" | "badminton" | "strength" | "rest";

interface WorkoutWithSport {
  sport: Sport;
  distance?: number;
  duration?: number;
  isRestDay: boolean;
}

const myWorkout3: WorkoutWithSport = {
  sport: "run",
  distance: 5,
  duration: 30,
  isRestDay: false
};

/*
const myWorkout4: WorkoutWithSport = {
  sport: "banana", // This will cause a type error because "banana" is not a valid Sport type.
  distance: 5,
  duration: 30,
  isRestDay: false
};*/

function identity<T>(value: T): T {
  return value;
}


identity<string>("cycle");
const num = identity(6.5);
//num.toUpperCase(); // This will cause a type error because num is of type number, which does not have a toUpperCase method.
identity(false);
identity<Workout>({sport: "swim", distance: 1, duration: 45, isRestDay: false});

function describeSport<T extends {sport: string}>(item: T): string {
  return `This is a ${item.sport} workout.`;
}

describeSport({sport: "run", distance: 5, duration: 30, isRestDay: false});
//describeSport({distance: 15, duration: 45, isRestDay: false});  // This will cause a type error because the object does not have a sport property.

function updateWorkout<T extends Workout>(id: number, changes: Partial<Workout>): void {
  console.log(`Updating workout ${id} with`, changes);
}

updateWorkout(1, {distance: 7})
//updateWorkout(2, {sport: 5}); // This will cause a type error because sport is expected to be a string, but a number is provided. 

function updateWorkoutWithSport<T extends WorkoutWithSport>(id: number, changes: Partial<WorkoutWithSport>): void {
  console.log(`Updating workout ${id} with`, changes);
}

//updateWorkoutWithSport(2, {sport: "banana", isRestDay: true});