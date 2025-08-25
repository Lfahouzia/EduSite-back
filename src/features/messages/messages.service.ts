import { MessageRepository } from "./messages.repository";
import { CreateMessageDTO, UpdateMessageDTO } from "./messages.model";

export class MessageService {
  private repo: MessageRepository;

  constructor() {
    this.repo = new MessageRepository();
  }

  create(data: CreateMessageDTO) {
    return this.repo.create(data);
  }

  list() {
    return this.repo.list();
  }

  getById(id: string) {
    return this.repo.getById(id);
  }

  update(id: string, data: UpdateMessageDTO) {
    return this.repo.update(id, data);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}
