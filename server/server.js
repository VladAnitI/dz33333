const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.CONNECTION_LINK, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: 'GET, POST, PUT',
		credentials: true
	})
);

const userSchema = new mongoose.Schema({
	id: { type: String },
	nickname: { type: String, require },
	email: { type: String, require },
	products: { type: [{ name: String, price: Number, quantity: Number }] },
	rating: { type: Number, require }
});

const userModel = mongoose.model('users', userSchema);

app.get('/users', async (req, res) => {
	const users = await userModel.find();
	res.json(users);
});

app.get('/users/:user', async (req, res) => {
	const user = await userModel.findById(req.params.user); // параметры
	res.json(user);
});

app.get('/users/:nickname/:email/:rating', async (req, res) => {
	const user = await userModel.find({
		email: req.params.email,
		nickname: req.params.nickname
	});
	if (user.length) {
		await userModel.findByIdAndUpdate(user[0]['_id'], {
			rating: req.params.rating
		});
		const userUpd = await userModel.findOne({
			_id: user[0]._id
		});
		res.json(userUpd);
	} else {
		const userN = new userModel({
			nickname: req.params.nickname,
			email: req.params.email,
			rating: req.params.rating
		});
		await userN.save();
		res.json(userN);
	}
});

app.get('/delete/:rait', async (req, res) => {
	const rait = req.params.rait;
	const users = await userModel.find();

	res.json(
		users.filter((el) => {
			return el.rating > rait;
		})
	);
});

app.get('/sort/:sort', async (req, res) => {
	switch (req.params.sort) {
		case 'nickname':
			const user1 = await userModel.find().sort({ nickname: 1 });
			res.json(user1);
			break;

		case 'rating':
			const user2 = await userModel.find().sort({ rating: 1 });
			res.json(user2);
			break;

		case 'number':
			const user3 = await userModel.find();
			const users3 = user3.sort((a, b) => {
				const a1 = a.products.reduce((acc, el) => acc + el.quantity, 0);
				const b1 = b.products.reduce((acc, el) => acc + el.quantity, 0);
				return b1 - a1;
			});
			res.json(users3);
			break;

		case 'price':
			const user4 = await userModel.find();
			const users4 = user4.sort((a, b) => {
				const a1 = a.products.reduce(
					(acc, el) => acc + el.price * el.quantity,
					0
				);
				const b1 = b.products.reduce(
					(acc, el) => acc + el.price * el.quantity,
					0
				);
				return b1 - a1;
			});
			res.json(users4);
			break;
	}
});

app.listen(3002, () => {
	console.log("Сервер запущен на 'http://localhost:3002'");
});
