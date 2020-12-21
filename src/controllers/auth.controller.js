import User from '../models/users';
import Role from '../models/roles';
import jwt from 'jsonwebtoken';
import config from '../config';
import nodemailer from 'nodemailer';
export const signIn = async (req, res) => {
	const userFound = await User.findOne({ email: req.body.email }).populate('roles');
	if (!userFound) {
		res.status(400).json({ message: 'user not found' });
	}

	const matchPassword = await User.comparePassword(req.body.password, userFound.password);

	if (!matchPassword) return res.status(401).json({ token: null, message: 'validar datos ingresados' });

	const token = jwt.sign({ id: userFound._id }, config.SECRET, {
		expiresIn: 86400,
	});

	res.json({ token });
};
export const signUp = async (req, res) => {
	const { username, modulos, email, cuit, celular, password, roles, nombre, estado, padre } = req.body;
	console.log(User.encryptPassword(password));
	console.log(password);
	let d = new Date();
	const newUser = new User({
		username,
		email,
		cuit,
		nombre,
		celular,
		estado,
		padre,
		modulos,
		licencia: d.setDate(d.getDate() + 30),
		password: await User.encryptPassword(password),
	});

	if (padre) {
		newUser.padre = padre;
	} else {
		newUser.padre = 'Admin';
	}

	if (!estado) {
		newUser.estado = 'Activo';
	} else {
		newUser.estado = estado;
	}

	if (roles) {
		const foundRole = await Role.find({ name: { $in: roles } });
		newUser.roles = foundRole.map((role) => role._id);
	} else {
		const role = await Role.findOne({ name: 'Vendedor' });
		newUser.roles = [role._id];
	}
	const savedUser = await newUser.save();

	const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
		expiresIn: 86400,
	});
	console.log(savedUser);
	enviar(email).catch(console.error);
	res.json({ token });
};

async function enviar(email) {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: 'smtp.hostinger.com.ar',
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: 'info@ventas-online.xyz', // generated ethereal user
			pass: 'Welcome01', // generated ethereal password
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"Fred Foo 👻" <info@ventas-online.xyz>', // sender address
		to: email, // list of receivers
		subject: 'Hello ✔', // Subject line
		text: 'Hello world?', // plain text body
		html: '<b>Hello world?</b>', // html body
	});

	console.log('Message sent: %s', info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
