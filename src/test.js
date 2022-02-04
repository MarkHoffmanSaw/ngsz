/*
let company = {
  sales: [
    {
      name: "John",
      salary: 1000,
    },
    {
      name: "Alice",
      salary: 1600,
    },
  ],

  development: {
    sites: [
      {
        name: "Peter",
        salary: 2000,
      },
      {
        name: "Alex",
        salary: 1800,
      },
    ],

    internals: [
      {
        name: "Jack",
        salary: 1300,
      },
    ],
  },
};

const fn = (obj) => {
  for (key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key].forEach((el) => console.log(el));
    } else {
      fn(obj[key]);
    }
  }
};

fn(company);
*/
/*
let person = {
  firstName: "John",
  lastName: "Doe",
  address: {
    street: "North 1st street",
    city: "San Jose",
    state: "CA",
    country: "USA",
  },
};

// let copyPerson = { ...person }; // REFS
// let copyPerson = Object.assign({}, person); // DEEP REFS
let copyPerson = JSON.parse(JSON.stringify(person)); // NO REFS

copyPerson.firstName = "Lala";
copyPerson.address.street = "Spb";

console.log(person, copyPerson);
*/
/*
const arr = [1, 2, 3, 4, 5];

const arr2 = arr; // REFS
const arr2 = [...arr]; // NO REFS

arr2[0] = 10;

console.log(arr, arr2);
*/
