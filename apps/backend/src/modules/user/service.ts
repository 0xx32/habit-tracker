import { findUsers } from "@/db/crud/users";

class ServiceError extends Error {
  constructor(name: string, message: string, _error?: string) {
    super(message);
    this.name = `Service: ${name}`;
  }
}

export abstract class UserService {
  static async getAll() {
    try {
      return findUsers();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        throw new ServiceError("User.getAll", "Failed to find users");
      }

      throw error;
    }
  }
}
