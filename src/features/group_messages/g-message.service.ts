import { GroupMessageRepository } from "./g-message.repository";
import {
  CreateGroupMessageDTO,
  UpdateGroupMessageDTO,
  GroupMessage,
} from "./g-message.model";

export class GroupMessageService {
  private repository: GroupMessageRepository;

  constructor() {
    this.repository = new GroupMessageRepository();
  }

  async create(data: CreateGroupMessageDTO): Promise<GroupMessage> {
    return this.repository.create(data);
  }

  async list(): Promise<GroupMessage[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<GroupMessage | null> {
    return this.repository.findById(id);
  }

  async update(
    id: string,
    data: UpdateGroupMessageDTO
  ): Promise<GroupMessage | null> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
