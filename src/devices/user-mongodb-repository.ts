import { Injectable, Inject } from '@nestjs/common';
import { MongoClient, Collection, ObjectId } from 'mongodb';
import { User } from 'src/entities/User';
import { userToDTO, dtoToUser } from 'src/interface/mappers/user-converter';
import { UserRepository } from 'src/use-cases/ports/user-repository';
import { UserData } from 'src/interface/dto/user-data';
import { UserResponseDTO } from 'src/use-cases/dto/user-dto';

@Injectable()
export class UserMongoRepository implements UserRepository {
	private readonly client: MongoClient;
	private get collection(): Collection<UserData> {
		return this.client.db('clean-arch').collection('user');
	}

	constructor(@Inject('MONGO_CLIENT') client: MongoClient) {
		this.client = client;
	}

	async insertWithHashedPassword(user: User, hashedPassword: string): Promise<User> {
		const userData = userToDTO(user);
		userData.password = hashedPassword; // Use the hashed password instead
		const result = await this.collection.insertOne(userData);
		if (!result.acknowledged) {
			throw new Error('Failed to insert user.');
		}
		userData._id = result.insertedId;
		return dtoToUser(userData);
	}

	async findByEmail(email: string): Promise<User | null> {
		const userData = await this.collection.findOne({ email });
		return userData ? dtoToUser(userData) : null;
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
			email: userData.email
		};
	}
	
}
