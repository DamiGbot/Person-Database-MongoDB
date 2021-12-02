const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Person = require("./Person");

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

main().catch((err) => console.log(err));

async function main() {
	await mongoose.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
}

run();
async function run() {
	const person = new Person({
		name: "Ray",
		age: 27,
		favoriteFoods: ["Rice", "Pizza"],
	});

	//Create and Save a Record of a model
	await person.save((error, record) => {
		if (error) {
			console.log(error);
		} else {
			console.log(record);
		}
	});
	console.log(person);

	//Create Many Records with model.create()
	const persons = await Person.create(
		{ name: "Sola", age: 22 },
		{ name: "Liam", age: 45, favoriteFoods: ["Yams", "Beans"] },
		{ name: "Mary", age: 45, favoriteFoods: ["Yams", "Custard"] }
	);

	//Use model.find() to search your database
	const People = await Person.find({}, (error, record) => {
		if (error) {
			console.log(error);
		} else {
			console.log(record);
		}
	});
	// console.log(People);

	//Use model.findOne() to return a single matching document from your database
	const thePerson = await Person.findOne(
		{ favorite: "Yam" },
		(error, record) => {
			if (error) {
				console.log(error);
			} else {
				console.log(record);
			}
		}
	);
	// console.log(thePerson);

	//Use model.findById() to search your Database By_id
	const Dealer = await Person.findById(
		"61a8f82f4cc783c3da66c026",
		(error, record) => {
			if (error) {
				console.log(error);
			} else {
				console.log(record);
			}
		}
	);
	console.log(Dealer);

	//Perform Classic Updates by Running Find, Edit, then Save
	await Person.findById("61a8f80c00823e0b113dd3ce", (error, result) => {
		if (error) {
			console.log(error);
		} else {
			result.favoriteFoods.push("hamburger");
			result.save();
		}
	});

	//Perform New Updates on a Document Using model.findOneAndUpdate()
	await Person.findOneAndUpdate(
		{ name: "Sola" },
		{ age: 20 },
		(error, record) => {
			if (error) {
				console.log(error);
			} else {
				console.log(record);
			}
		}
	);

	//Delete One Document Using model.findByIdAndRemove
	await Person.findByIdAndRemove(
		"61a8f82f4cc783c3da66c026",
		(error, record) => {
			if (error) {
				console.log(error);
			} else {
				console.log(record);
			}
		}
	);

	//Delete many Documents with model.remove()
	await Person.remove({ name: "Mary" }, (error, record) => {
		if (error) {
			console.log(error);
		} else {
			done(null, record);
		}
	});

	//Chain Search Query Helpers to Narrow Search Results
	await Person.find({ favoriteFoods: { $all: ["burrito"] } })
		.sort({ name: "asc" })
		.limit(2)
		.select("-age")
		.exec((error, record) => {
			if (error) {
				console.log(error);
			} else {
				done(null, record);
			}
		});
}
console.log("working new data");
