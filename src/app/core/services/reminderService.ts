import { Reminders } from "@/core/domain/entities/reminders";
import { ReminderRepositoryImpl } from "@/core/infra/repositories/firebaseReminderRepository";
import { CreateReminder } from "@/usecases/reminders/createReminder";
import { UpdateReminder } from "@/usecases/reminders/updateReminder";
import { DeleteReminder } from "@/usecases/reminders/deleteReminder";
import { GetReminderByUser } from "@/usecases/reminders/getReminderByUser";
import { GetReminderById } from "@/usecases/reminders/getReminderById";

const repo = new ReminderRepositoryImpl();

export const createReminder = async (reminder: Reminders) => {
  const useCase = new CreateReminder(repo);
  return await useCase.execute(reminder);
};

export const updateReminder = async (reminder: Reminders) => {
  const useCase = new UpdateReminder(repo);
  return await useCase.execute(reminder);
};

export const deleteReminder = async (id: string) => {
  const useCase = new DeleteReminder(repo);
  return await useCase.execute(id);
};

export const getRemindersByUser = async (userId: string) => {
  const useCase = new GetReminderByUser(repo);
  return await useCase.execute(userId);
};

export const getReminderById = async (id: string) => {
  const useCase = new GetReminderById(repo);
  return await useCase.execute(id);
};
