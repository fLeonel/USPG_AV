import { ReminderRepository } from "@/core/domain/repositories/reminderRepository";
import { Reminders } from "@/core/domain/entities/reminders";

export class GetReminderById {
  constructor(private repo: ReminderRepository) {}

  async execute(id: string): Promise<Reminders | null> {
    return await this.repo.getById(id);
  }
}
