import { ReminderRepository } from "@/core/domain/repositories/reminderRepository";
import { Reminder } from "@/core/domain/entities/reminders";

export class GetReminderById {
  constructor(private repo: ReminderRepository) {}

  async execute(id: string): Promise<Reminder | null> {
    return await this.repo.getById(id);
  }
}
