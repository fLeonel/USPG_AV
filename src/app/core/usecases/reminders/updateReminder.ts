import { ReminderRepository } from "@/core/domain/repositories/reminderRepository";
import { Reminders } from "@/core/domain/entities/reminders";

export class UpdateReminder {
  constructor(private repo: ReminderRepository) {}

  async execute(reminder: Reminders): Promise<void> {
    return await this.repo.update(reminder);
  }
}
