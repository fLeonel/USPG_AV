import { ReminderRepository } from "@/core/domain/repositories/reminderRepository";
import { Reminder } from "@/core/domain/entities/reminders";

export class GetReminderByUser {
  constructor(private repo: ReminderRepository) {}

  async execute(userId: string): Promise<Reminder[]> {
    return await this.repo.getByUser(userId);
  }
}
