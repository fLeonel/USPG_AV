import { ReminderRepository } from "@/core/domain/repositories/reminderRepository";
import { Reminder } from "@/core/domain/entities/reminders";

export class UpdateReminder {
  constructor(private repo: ReminderRepository) {}

  async execute(reminder: Reminder): Promise<void> {
    return await this.repo.update(reminder);
  }
}
