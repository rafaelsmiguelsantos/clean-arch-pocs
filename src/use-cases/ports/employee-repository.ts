import { EmployeeResponseDTO } from "../dto/employee-dto";
import { Employee } from "src/entities/Employee";

export interface EmployeeRepository {
  insert(user: Employee, hashedPassword: string): Promise<EmployeeResponseDTO>;
  findByEmail(email: string): Promise<EmployeeResponseDTO | null>;
  findById(id: string): Promise<EmployeeResponseDTO | null>;
}

