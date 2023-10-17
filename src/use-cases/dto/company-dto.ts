// src/use-cases/dto/company-dto.ts

export interface AddressDTO {
  city: string;
  state: string;
  street: string;
  cep: string;
}

export interface CompanyRequestDTO {
  id?: string; // Supondo que você possa querer fornecer um ID, mas tornando-o opcional.
  name: string; // Supondo que o nome seja uma string simples, se for um objeto completo como FullName, ajuste conforme necessário.
  fictitiousName: string;
  phone: string; // Supondo que o telefone seja uma string simples. Se for um objeto, ajuste conforme necessário.
  address: AddressDTO;
  priorityLevel: string; // Usando string aqui. Se tiver um enum específico para o nível de prioridade, use-o em vez de string.
  userId: string;
  emailCorporate: string;
  cnpj: string; // Supondo que o CNPJ seja uma string simples. Se for um objeto, ajuste conforme necessário.
}

export interface CompanyResponseDTO {
  id: string;
  name: string; 
  fictitiousName: string;
  phone: string; 
  address: AddressDTO;
  priorityLevel: string; 
  userId: string;
  emailCorporate: string;
  createdDate?: Date; // Uma suposição, caso queira incluir uma data de criação na resposta.
  cnpj?: string; // Uma suposição, caso queira incluir o CNPJ na resposta.
}
