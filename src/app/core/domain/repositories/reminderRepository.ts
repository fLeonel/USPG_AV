import { Reminders } from "@/core/domain/entities/reminders";

export interface ReminderRepository {
  create(reminder: Reminders): Promise<void>;
  update(reminder: Reminders): Promise<void>;
  delete(id: string): Promise<void>;
  getByUser(userId: string): Promise<Reminders[]>;
  getById(id: string): Promise<Reminders | null>;
}
