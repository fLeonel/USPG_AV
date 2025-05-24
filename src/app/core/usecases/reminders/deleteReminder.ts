import { ReminderRepository } from "@/core/domain/repositories/reminderRepository";

export class DeleteReminder {
  constructor(private repo: ReminderRepository) {}

  async execute(id: string): Promise<void> {
    return await this.repo.delete(id);
  }
}
