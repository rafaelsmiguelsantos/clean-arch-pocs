import { ObjectId } from "mongodb";
import { CompanyRequestDTO } from "src/use-cases/dto/company-dto";

export interface AddressData {
  city: string;
  state: string;
  street: string;
  cep: string;
}

export interface CompanyData {
  _id?: ObjectId;
  name: string;
  fictitiousName: string;
  phone: string;
  address: AddressData;
  priorityLevel: string;
  userId: ObjectId;
  emailCorporate: string;
  createdDate?: Date;
  cnpj: string;
}

export function companyDtoToData(company: CompanyRequestDTO): CompanyData {
  const { id, ...rest } = company;
  return {
    ...rest,
    _id: id ? new ObjectId(id) : undefined,
    userId: new ObjectId(company.userId)
  };
}
