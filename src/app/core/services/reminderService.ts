import { Reminders } from "@/core/domain/entities/reminders";
import { ReminderRepositoryImpl } from "@/core/infra/repositories/firebaseReminderRepository";
import { CreateReminder } from "@/usecases/reminders/createReminder";
import { UpdateReminder } from "@/usecases/reminders/updateReminder";
import { DeleteReminder } from "@/usecases/reminders/deleteReminder";
import { GetReminderByUser } from "@/usecases/reminders/getReminderByUser";
import { GetReminderById } from "@/usecases/reminders/getReminderById";

const repo = new ReminderRepositoryImpl();

/**
 * Crea un nuevo recordatorio usando el caso de uso correspondiente.
 *
 * @param reminder - Objeto `Reminders` con los datos del nuevo recordatorio.
 * @returns Una promesa con el resultado de la operación.
 */
export const createReminder = async (reminder: Reminders) => {
  const useCase = new CreateReminder(repo);
  return await useCase.execute(reminder);
};

/**
 * Actualiza un recordatorio existente usando el caso de uso correspondiente.
 *
 * @param reminder - Objeto `Reminders` con los datos actualizados del recordatorio.
 * @returns Una promesa con el resultado de la operación.
 */
export const updateReminder = async (reminder: Reminders) => {
  const useCase = new UpdateReminder(repo);
  return await useCase.execute(reminder);
};

/**
 * Elimina un recordatorio por su ID usando el caso de uso correspondiente.
 *
 * @param id - ID del recordatorio a eliminar.
 * @returns Una promesa con el resultado de la operación.
 */
export const deleteReminder = async (id: string) => {
  const useCase = new DeleteReminder(repo);
  return await useCase.execute(id);
};

/**
 * Obtiene todos los recordatorios de un usuario específico usando el caso de uso correspondiente.
 *
 * @param userId - ID del usuario cuyos recordatorios se desean obtener.
 * @returns Una promesa con la lista de recordatorios del usuario.
 */
export const getRemindersByUser = async (userId: string) => {
  const useCase = new GetReminderByUser(repo);
  return await useCase.execute(userId);
};

/**
 * Obtiene un recordatorio por su ID.
 *
 * @param id - ID del recordatorio.
 * @returns Una promesa que resuelve con el recordatorio correspondiente (si existe).
 */
export const getReminderById = async (id: string) => {
  const useCase = new GetReminderById(repo);
  return await useCase.execute(id);
};
