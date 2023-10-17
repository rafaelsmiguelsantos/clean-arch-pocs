import { Injectable, Inject } from '@nestjs/common';
import { MongoClient, Collection, ObjectId } from 'mongodb';
import { userToDTO } from 'src/interface/mappers/user-converter';
import { UserRepository } from 'src/use-cases/ports/user-repository';
import { UserData } from 'src/devices/dto/user-data';
import { UserResponseDTO } from 'src/use-cases/dto/user-dto';
import { User } from 'src/entities/User';

@Injectable()
export class UserMongoRepository implements UserRepository {
	private readonly client: MongoClient;
	private get collection(): Collection<UserData> {
		return this.client.db('clean-arch').collection('user');
	}

	constructor(@Inject('MONGO_CLIENT') client: MongoClient) {
		this.client = client;
	}

	async insert(user: User, hashedPassword: string): Promise<UserResponseDTO> {
		const userData = userToDTO(user, hashedPassword);

		const result = await this.collection.insertOne(userData);
		if (!result.acknowledged) {
			throw new Error('Failed to insert user.');
		}

		// Verificar se result.insertedId é um ObjectId e converter para string
		const idString: string = (result.insertedId instanceof ObjectId) ? result.insertedId.toHexString() : String(result.insertedId);

		return {
			id: idString,
			firstName: user.getName().firstName,    // Use getters aqui
			lastName: user.getName().lastName,
			middleName: user.getName().middleName,
			email: user.getEmail().getValue(),
			phone: user.getPhones().map(phone => ({
					cellPhone: phone.cellPhone,
					homePhone: phone.homePhone,
					corporatePhone: phone.corporatePhone
			})),
			roles: user.getRole()  // Adicione a role aqui
	};
	}

	async findByEmail(email: string): Promise<UserResponseDTO | null> {
		const userData = await this.collection.findOne({ email });
		return userData ? this.userDataToUserResponseDTO(userData) : null;
	}

	async findById(id: string): Promise<UserResponseDTO | null> {
		const userData = await this.collection.findOne({ _id: new ObjectId(id) });
		console.log(userData);
		return userData ? this.userDataToUserResponseDTO(userData) : null;
	}

	private userDataToUserResponseDTO(userData: UserData): UserResponseDTO {
		return {
			id: typeof userData._id === 'string' ? userData._id : userData._id.toHexString(),
			firstName: userData.firstName,
			lastName: userData.lastName,
			middleName: userData.middleName,
			email: userData.email,
			password: userData.password,
			phone: userData.phones.map(phone => ({
				cellPhone: phone.cellPhone,
				homePhone: phone.homePhone,
				corporatePhone: phone.corporatePhone
			}))
		};
	}
}
