import { ReminderRepository } from "@/core/domain/repositories/reminderRepository";
import { Reminder } from "@/core/domain/entities/reminders";

export class CreateReminder {
  constructor(private repo: ReminderRepository) {}

  async execute(reminder: Reminder): Promise<void> {
    return await this.repo.create(reminder);
  }
}
