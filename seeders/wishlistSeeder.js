const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const faker = require('faker');
const Comander = require("../models/comander")
const Pilot = require("../models/pilot")

mongoose.connect(
    `mongodb+srv://igorg:ibmix4@cluster0.aev79.azure.mongodb.net/IBMiX4?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
);

const Schema = mongoose.Schema;

const wishlist = Schema({
  dateOfApplication: { type: Date },
  wishlistPriority: { type: [String], default: undefined},
  flightDirection: { type: String },
  workOverTime: { type: Boolean },
  workShiftDuration: { type: String },
  preferenceDepartureTime: { type: String },
  weekends: { type: [Date], default: undefined}
});

const Wishlist = mongoose.model("Wishlist", wishlist);

let past = []
let octWeekends = ['2020-10-01', '2020-10-02', '2020-10-03', '2020-10-04', '2020-10-05', '2020-10-06', '2020-10-07', '2020-10-08', '2020-10-09', '2020-10-10', '2020-10-11', '2020-10-12', '2020-10-13', '2020-10-14', '2020-10-15', '2020-10-16', '2020-10-17', '2020-10-18', '2020-10-19', '2020-10-20', '2020-10-23', '2020-10-29', '2020-10-30',]
let departurePref = ["night", "morning", "day", "evening"]
let priorities = ["flightDirection", "workOverTime", "workShiftDuration", "preferenceDepartureTime", "weekends"]
let duration = ["long", "short"]

for (let i = 0; i < 100; i++) {
 past[i] =  faker.date.between('2020-01-01', '2020-08-01');
}

shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

seedWishlist = async () => {

  const comander = await Comander.find();
  const pilot = await Pilot.find();
  const users = comander + pilot;
  const data = JSON.stringify(users);
    for (let i in data) {
      data[i]['wishForm'] = [];
      for (let j = 0; j < 4; j++) {
        let date = faker.random.arrayElement(past);
        const list = new Wishlist({
          dateOfApplication: date,
          wishlistPriority: shuffle(priorities),
          flightDirection: faker.random.arrayElement(duration),
          workOverTime: faker.random.boolean(),
          workShiftDuration: faker.random.arrayElement(duration),
          preferenceDepartureTime: shuffle(departurePref),
          weekends: [
              faker.date.between('2020-' + JSON.stringify(date)[6] + JSON.stringify(date)[7] + '-01', '2020-' + JSON.stringify(date)[6] + JSON.stringify(date)[7] + '-28'),
              faker.date.between('2020-' + JSON.stringify(date)[6] + JSON.stringify(date)[7] + '-01', '2020-' + JSON.stringify(date)[6] + JSON.stringify(date)[7] + '-28'),
              faker.date.between('2020-' + JSON.stringify(date)[6] + JSON.stringify(date)[7] + '-01', '2020-' + JSON.stringify(date)[6] + JSON.stringify(date)[7] + '-28'),
              faker.date.between('2020-' + JSON.stringify(date)[6] + JSON.stringify(date)[7] + '-01', '2020-' + JSON.stringify(date)[6] + JSON.stringify(date)[7] + '-28'),
              faker.date.between('2020-' + JSON.stringify(date)[6] + JSON.stringify(date)[7] + '-01', '2020-' + JSON.stringify(date)[6] + JSON.stringify(date)[7] + '-28'),
              faker.date.between('2020-' + JSON.stringify(date)[6] + JSON.stringify(date)[7] + '-01', '2020-' + JSON.stringify(date)[6] + JSON.stringify(date)[7] + '-28'),
          ]
        });
        data[i]['wishForm'] += list;
      }
      const list = new Wishlist({
        dateOfApplication: faker.date.between('2020-09-01', '2020-09-30'),
        wishlistPriority: shuffle(priorities),
        flightDirection: faker.random.arrayElement(duration),
        workOverTime: faker.random.boolean(),
        workShiftDuration: faker.random.arrayElement(duration),
        preferenceDepartureTime: shuffle(departurePref),
        weekends: faker.random.arrayElements(octWeekends, 8),
      })
      data[i]['wishForm'] += list;
      data[i].save().then(() => console.log(`+ data ${i}`));
      console.log(i);
    }

}

seedWishlist();

usersCall = async () => {
  const comander = await Comander.find();
  const pilot = await Pilot.find();
  const Users = comander + pilot;
  const users = await JSON.stringify(Users);
  console.log(Users);
  }

//usersCall();