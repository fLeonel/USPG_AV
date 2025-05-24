import { Reminder } from "@/core/domain/entities/reminders";

export interface ReminderRepository {
  create(reminder: Reminder): Promise<void>;
  update(reminder: Reminder): Promise<void>;
  delete(id: string): Promise<void>;
  getByUser(userId: string): Promise<Reminder[]>;
  getById(id: string): Promise<Reminder | null>;
}
