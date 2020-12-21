import { response } from 'express';
import Users from '../models/users';

export const getUsers = async (req, res) => {
	const users = await Users.find();
	res.json(users);
};

export const getUserById = async (req, res) => {
	const user = await Users.findById(req.params.userId);
	res.status(200).json(user);
};

export const updateUserById = async (req, res) => {
	const userActualizado = await Users.findByIdAndUpdate(req.params.userId, req.body, {
		new: true,
	});
	res.status(204).json(userActualizado);
};
export const deleteUserById = async (req, res) => {
	// const userEliminado = await Users.findByIdAndDelete(req.params.userId);
	const userEliminado = await Users.deleteMany();
	res.status(204).json();
};

export const reasignarUserById = async (req, res) => {
	var myquery = { padre: req.body.padre };
	var newvalues = { $set: { padre: req.body.nuevoPadre } };

	const usuarioActualizado = await Users.updateMany(myquery, newvalues, {
		new: true,
	});
	console.log(usuarioActualizado);
	res.status(204).json();
};

export const desactivar = async (req, res) => {
	var newvalues = { $set: { estado: 'Inactivo' } };
	const userActualizado = await Users.findByIdAndUpdate(req.params.userId, newvalues, {
		new: true,
	});
	res.status(204).json(userActualizado);
};

export const pertenecen = async (req, res) => {
	const userFound = await Users.find({ padre: req.body.padre }, function (err, user) {
		if (err) {
			res.send(err);
		}
		console.log(user);
		res.json(user);
	});
};

export const revendedores = async (req, res) => {
	const userFound = await Users.find({ roles: '5fcb8124b424572820441a01' }, function (err, user) {
		if (err) {
			res.send(err);
		}
		console.log(user);
		res.json(user);
	});
	if (!userFound) {
		res.status(400).json({ message: 'Sin vendedores asignados' });
	}
	response.status(200).json(userFound);
};

export const topten = async (req, res) => {
	const users = await Users.aggregate([{ $group: { _id: '$padre', vendedores: { $sum: 1 } } }]);
	users.sort(function (a, b) {
		if (a.vendedores < b.vendedores) {
			return 1;
		}
		if (a.vendedores > b.vendedores) {
			return -1;
		}
		// a must be equal to b
		return 0;
	});

	res.json(users);
};

export const vencimiento = async (req, res) => {
	let d = new Date();
	const vencimiento = await Users.findOne({ fecha: { $eq: d } }).exec((err, act) => {
		if (err) {
			console.log('hubo un error');
			return res.status(500).json({ error: err.message }); //debes enviar una respuesta o llamar al manejador de errores (return next(err))
		}
		console.log(act);
		return res.status(200).json(act); // en este ejemplo se envía el resultado
	});

	res.json(users);
};
