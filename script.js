/* const person = {
  name: ['Bob', 'Smith'],
  age: 32,
  gender: 'male',
  interests: ['music', 'skiing'],
  bio: function() {
    alert(this.name[0] + ' ' + this.name[1] + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
  },
  greeting: function() {
    alert('Hi! I\'m ' + this.name[0] + '.');
  }
};


class Person {
  constructor(name) {
    this.name = name;
    this.greeting = function () {
      alert('Hi! I\'m ' + this.name + '.');
    };
  }
}

let person1 = new Person('Bob');
let person2 = new Person('Sarah');

console.log(person);
console.log(person1.greeting()) */

/* class Person {
  constructor(first, last, age, gender, interests) {
    this.name = {
      first: first,
      last: last
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
    this.bio = function () {
      alert(this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
    };
    this.farewell = function() {
      alert(this.name.first + ' has left the building. Bye for now!');
    }
    this.greeting = function () {
      alert('Hi! I\'m ' + this.name.first + '.');
    };
  }
}

let person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);


console.log(person1);



Person.prototype.farewell = function() {
  alert(this.name.first + ' has left the building. Bye for now!');
};


let person2 = Object.create(person1);

let person3 = new person1.constructor('Karen', 'Stephenson', 26, 'female', ['playing drums', 'mountain climbing']);


console.log(person2);
console.log(person1.constructor);
// console.log(person1.farewell()); */

class Person {
  constructor(first, last, age, gender, interests) {
    this.name = {
      first,
      last
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
  }

  greeting() {
    console.log(`Hi! I'm ${this.name.first}`);
  };

  farewell() {
    console.log(`${this.name.first} has left the building. Bye for now!`);
  };
}

class Teacher extends Person {
  constructor(first, last, age, gender, interests, subject, grade) {
    super(first, last, age, gender, interests);

    // subject and grade are specific to Teacher
    this.subject = subject;
    this.grade = grade;
  }
}

let han = new Person('Han', 'Solo', 25, 'male', ['Smuggling']);
han.greeting();

let snape = new Teacher('Severus', 'Snape', 58, 'male', ['Potions'], 'Dark arts', 5);
snape.greeting();
snape.farewell();