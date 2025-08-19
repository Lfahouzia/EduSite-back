import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthRepository } from "./auth.repository";
import { CreateUserDTO, UpdateUserDTO, User } from "./auth.model";
import { config } from "../../environnement/env.config";
import { validateEmail, validatePassword } from "../../shared/utils/validators";

export class AuthService {
  private repository: AuthRepository;

  constructor() {
    this.repository = new AuthRepository();
  }

  async register(data: CreateUserDTO): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    if (!validateEmail(data.email)) {
      throw new Error("Email invalide");
    }

    if (!validatePassword(data.password)) {
      throw new Error("Mot de passe invalide");
    }
    const user = await this.repository.createUser({
      ...data,
      password: hashedPassword,
    });

    return user;
  }

  async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: User }> {
    const user = await this.repository.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id, roles: {} }, config.jwtSecret, {
      expiresIn: "7d",
    });

    return { token, user };
  }

  async getAllUsers(): Promise<User[]> {
    return this.repository.getUsers();
  }

  async getUser(id: string): Promise<User | null> {
    return this.repository.getUserById(id);
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<User | null> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.repository.updateUser(id, data);
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.repository.deleteUser(id);
  }
}
