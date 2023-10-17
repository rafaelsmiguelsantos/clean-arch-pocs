import { Injectable, Inject } from '@nestjs/common';
import { MongoClient, Collection, ObjectId } from 'mongodb';
import { CompanyRequestDTO, CompanyResponseDTO } from 'src/use-cases/dto/company-dto';
import ICompanyRepository from 'src/use-cases/ports/company-repository';
import { CompanyData, companyDtoToData } from '../dto/company-data';

@Injectable()
export class CompanyMongoRepository implements ICompanyRepository {
	private readonly client: MongoClient;
	private get collection(): Collection<CompanyData> {
		return this.client.db('clean-arch').collection('company');
	}

	constructor(@Inject('MONGO_CLIENT') client: MongoClient) {
		this.client = client;
	}

	async insert(company: CompanyRequestDTO): Promise<CompanyResponseDTO> {
		const companyData = companyDtoToData(company);

		const result = await this.collection.insertOne(companyData);
		if (!result.acknowledged) {
			throw new Error('Failed to insert company.');
		}

		const idString: string = (result.insertedId instanceof ObjectId) ? result.insertedId.toHexString() : String(result.insertedId);

		return {
			...company,
			id: idString
		};
	}

	async findById(id: string): Promise<CompanyResponseDTO | null> {
		const companyData = await this.collection.findOne({ _id: new ObjectId(id) });

		if (!companyData) {
			return null;
		}

		return this.companyDataToDto(companyData);
	}

	async findByCNPJ(cnpj: string): Promise<CompanyResponseDTO | null> {
    const companyData = await this.collection.findOne({ cnpj });

    if (!companyData) {
        return null;
    }

    return this.companyDataToDto(companyData);
}

	private companyDataToDto(companyData: CompanyData): CompanyResponseDTO {
		return {
			id: companyData._id.toHexString(),
			name: companyData.name,
			fictitiousName: companyData.fictitiousName,
			phone: companyData.phone,
			address: companyData.address,
			priorityLevel: companyData.priorityLevel,
			userId: companyData.userId.toHexString(),
			emailCorporate: companyData.emailCorporate,
			createdDate: companyData.createdDate,
			cnpj: companyData.cnpj
		};
	}

}
