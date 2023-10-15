import { Injectable, Inject } from '@nestjs/common';
import { MongoClient, Collection } from 'mongodb';
import { User } from 'src/entities/User';
import { UserDTO, userToDTO, dtoToUser } from 'src/interface/dto/user-converter';
import { UserRepository } from 'src/use-cases/ports/user-repository';

@Injectable()
export class UserMongoRepository implements UserRepository {
	private readonly client: MongoClient;
	private get collection(): Collection<UserDTO> {
		return this.client.db('clean-arch').collection('user');
	}

	constructor(@Inject('MONGO_CLIENT') client: MongoClient) {
		this.client = client;
	}

	async insert(user: User): Promise<UserDTO> {
		const userDTO = userToDTO(user);
		const result = await this.collection.insertOne(userDTO);
		if (!result.acknowledged) {
			throw new Error('Failed to insert user.');
		}
		userDTO._id = result.insertedId;
		return userDTO;
	}

	async findByEmail(email: string): Promise<User | null> {
		const dto = await this.collection.findOne({ email });
		return dto ? dtoToUser(dto) : null;
	}
}
