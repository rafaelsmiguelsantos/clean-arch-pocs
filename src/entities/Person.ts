import { Address } from "./Address";
import { Department } from "./Department";
import { EmailAddress } from "./EmailAddress";
import { FullName } from "./FullName";
import { PhoneNumber } from "./PhoneNumber";
import { ProfilePicture } from "./ProfilePicture";

export class Person {
  private name: FullName;
  private prefix?: string;
  private suffix?: string;
  private email: EmailAddress;
  private phoneNumber: PhoneNumber;
  private address?: Address;
  private jobTitle: string;
  private department: Department;
  private startDate: Date;
  private endDate?: Date;
  private employeeID: string;
  private userName: string;
  private dateOfBirth: Date;
  private gender: string;
  private nationality: string;
  private memberOf: string[];
  private role: string;
  private profilePicture?: ProfilePicture;
  private notes: string;

  constructor(
    name: FullName,
    email: EmailAddress,
    phoneNumber: PhoneNumber,
    jobTitle: string,
    department: Department,
    startDate: Date,
    employeeID: string,
    userName: string,
    dateOfBirth: Date,
    gender: string,
    nationality: string,
    memberOf: string[],
    role: string,
    notes: string,
    prefix?: string,
    suffix?: string,
    address?: Address,
    endDate?: Date,
    profilePicture?: ProfilePicture,
  ) {
    // Basic validations (we assume the value objects handle their internal validations)
    if (!name || !email || !phoneNumber || !jobTitle || !department || !startDate || !employeeID || !userName 
        || !dateOfBirth || !gender || !nationality || !memberOf || !role || !notes) {
      throw new Error('Some required fields are missing.');
    }

    this.name = name;
    this.prefix = prefix;
    this.suffix = suffix;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.jobTitle = jobTitle;
    this.department = department;
    this.startDate = startDate;
    this.endDate = endDate;
    this.employeeID = employeeID;
    this.userName = userName;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.nationality = nationality;
    this.memberOf = memberOf;
    this.role = role;
    this.notes = notes;
    this.profilePicture = profilePicture;
  }

  // Getter methods
  getName(): FullName {
    return this.name;
  }

  getPrefix(): string | undefined {
    return this.prefix;
  }

  getSuffix(): string | undefined {
    return this.suffix;
  }

  getEmail(): EmailAddress {
    return this.email;
  }

  getPhoneNumber(): PhoneNumber {
    return this.phoneNumber;
  }

  getAddress(): Address | undefined {
    return this.address;
  }

  getJobTitle(): string {
    return this.jobTitle;
  }

  getDepartment(): Department {
    return this.department;
  }

  getStartDate(): Date {
    return this.startDate;
  }

  getEndDate(): Date | undefined {
    return this.endDate;
  }

  getEmployeeID(): string {
    return this.employeeID;
  }

  getUserName(): string {
    return this.userName;
  }

  getDateOfBirth(): Date {
    return this.dateOfBirth;
  }

  getGender(): string {
    return this.gender;
  }

  getNationality(): string {
    return this.nationality;
  }

  getMemberOf(): string[] {
    return this.memberOf;
  }

  getRole(): string {
    return this.role;
  }

  getProfilePicture(): ProfilePicture | undefined {
    return this.profilePicture;
  }

  getNotes(): string {
    return this.notes;
  }
}
