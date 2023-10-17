import { CompanyRequestDTO, CompanyResponseDTO } from "../dto/company-dto";

export default interface ICompanyRepository {
    findById(id: string): Promise<CompanyResponseDTO | null>;
    insert(company: CompanyRequestDTO): Promise<CompanyResponseDTO>;
    findByCNPJ(cnpj: string): Promise<CompanyResponseDTO | null>;

    // update(company: Company): Promise<void>;
    // delete(id: string): Promise<void>;
    // findAll(): Promise<Company[]>;
    // findByUserId(userId: string): Promise<Company[]>;
}
