// src/devices/dto/company-data.ts

import { ObjectId } from "mongodb";
import { CompanyRequestDTO } from "src/use-cases/dto/company-dto";

export interface AddressData {
  city: string;
  state: string;
  street: string;
  cep: string;
}

export interface CompanyData {
  _id?: ObjectId; // Usar ObjectId aqui para representar o ID como ele aparece no MongoDB.
  name: string;
  fictitiousName: string;
  phone: string;
  address: AddressData;
  priorityLevel: string;
  userId: ObjectId; // Supondo que userId é armazenado como ObjectId no banco de dados.
  emailCorporate: string;
  createdDate?: Date;
  cnpj: string;
}

// Para facilitar a conversão entre DTO e Data, podemos criar uma função helper:

export function companyDtoToData(company: CompanyRequestDTO): CompanyData {
  const { id, ...rest } = company; // Desestruturando e excluindo o id
  return {
    ...rest,
    _id: id ? new ObjectId(id) : undefined,
    userId: new ObjectId(company.userId) // Convertendo userId para ObjectId
  };
}
