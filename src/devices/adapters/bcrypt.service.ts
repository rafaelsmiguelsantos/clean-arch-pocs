import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { IHasher } from "src/use-cases/ports/hasher";

@Injectable()
export class BcryptAdapter implements IHasher {
  async hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, 12);
  }

  async compare(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }
}