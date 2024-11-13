import { Injectable } from "@nestjs/common"

import { AuthRepository } from "./auth.repository"

@Injectable()
export class AuthService {
  constructor(private readonly repository: AuthRepository) {}

  async getAuth(string: string) {
    return this.repository.fetch(string)
  }
}
