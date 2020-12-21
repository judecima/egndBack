import Role from '../models/roles';

export const createRole = async () => {
	console.log('llgo');
	const count = await Role.estimatedDocumentCount();
	console.log(count);
	try {
		if (count > 0) return;

		const values = await Promise.all([
			new Role({ name: 'Vendedor' }).save(),
			new Role({ name: 'ReVendedor' }).save(),
			new Role({ name: 'Admin' }).save(),
		]);

		console.log(values);
	} catch (error) {
		console.log(error);
	}
};
