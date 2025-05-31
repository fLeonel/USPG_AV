import { ReminderRepository } from "@/core/domain/repositories/reminderRepository";
import { Reminders } from "@/core/domain/entities/reminders";

export class GetReminderByUser {
  constructor(private repo: ReminderRepository) {}

  async execute(userId: string): Promise<Reminders[]> {
    return await this.repo.getByUser(userId);
  }
}
