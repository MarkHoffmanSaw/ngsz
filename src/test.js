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
