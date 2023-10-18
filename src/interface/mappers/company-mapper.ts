import { EmailAddress } from "src/entities/EmailAddress";
import { IMapper } from "src/use-cases/ports/imapper";
import { Address, Company, PriorityLevel } from "src/entities/Company";
import { PhoneNumber } from "src/entities/PhoneNumber";
import { CompanyRequestDTO } from "src/use-cases/dto/company-dto";

export class CompanyMapper implements IMapper<CompanyRequestDTO, Company> {
  toDomain(companyDTO: CompanyRequestDTO) {
    try {
      const emailObj = new EmailAddress(companyDTO.emailCorporate);  
      const phoneObj = new PhoneNumber(companyDTO.phone);
      const address = new Address(
        companyDTO.address.city, 
        companyDTO.address.state, 
        companyDTO.address.street, 
        companyDTO.address.cep
      );

      const company = new Company(
        companyDTO.name,
        companyDTO.fictitiousName,
        phoneObj,
        address,
        companyDTO.priorityLevel as PriorityLevel,
        companyDTO.userId,
        emailObj,
        companyDTO.cnpj
      );

      return { success: company };
    } catch (error) {
      return { failure: error };
    }
  }
}
