import { EmailAddress } from "src/entities/EmailAddress";
import { FullName } from "src/entities/FullName";
import { IMapper } from "src/use-cases/ports/imapper";
import { Password } from "src/entities/Password";
import { PhoneNumber } from "src/entities/PhoneNumber";
import { Roles } from "src/entities/roles";
import { EmployeeRequestDTO } from "src/use-cases/dto/employee-dto";
import { Employee } from "src/entities/Employee";

export class EmployeeMapper implements IMapper<EmployeeRequestDTO, Employee> {
  toDomain(employee: EmployeeRequestDTO) {
    try {
      const fullName = new FullName(employee.firstName, employee.lastName, employee.middleName);
      const email = new EmailAddress(employee.email);
      const password = new Password(employee.password);

      // Convertendo os phones do DTO para uma lista de PhoneNumber
      const phones = employee.phone.map(phoneDTO => {
        return new PhoneNumber(phoneDTO.corporatePhone, phoneDTO.cellPhone, phoneDTO.homePhone);
      });

      const person = new Employee(
        fullName,
        email,
        password,
        phones,
        Roles.EMPLOYEE,
        employee.companyId,
        employee.userId,
      );

      return { success: person };
    } catch (error) {
      return { failure: error };
    }
  }
}
