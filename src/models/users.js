import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
		},
		nombre: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
		},
		cuit: {
			type: String,
			required: true,
		},
		celular: {
			type: Number,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		licencia: {
			type: Date,
			required: true,
		},
		roles: [
			{
				ref: 'Role',
				type: Schema.Types.ObjectId,
			},
		],
		padre: {
			type: String,
			requiered: true,
		},
		estado: {
			type: String,
			required: true,
		},
		modulos: [{ type: Boolean, required: false }],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

userSchema.statics.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
	return await bcrypt.compare(password, receivedPassword);
};

export default model('User', userSchema);
