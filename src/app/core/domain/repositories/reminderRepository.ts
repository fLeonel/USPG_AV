import { Reminders } from "@/core/domain/entities/reminders";

/**
 * Define las operaciones de acceso a datos para recordatorios (`Reminders`).
 */
export interface ReminderRepository {
  /**
   * Crea un nuevo recordatorio.
   *
   * @param reminder - El recordatorio a crear.
   * @returns Una promesa que se resuelve cuando la operación finaliza.
   */
  create(reminder: Reminders): Promise<void>;
  /**
   * Actualiza un recordatorio existente.
   *
   * @param reminder - El recordatorio con los datos actualizados.
   * @returns Una promesa que se resuelve cuando la operación finaliza.
   */
  update(reminder: Reminders): Promise<void>;
  /**
   * Elimina un recordatorio por su ID.
   *
   * @param id - El ID del recordatorio a eliminar.
   * @returns Una promesa que se resuelve cuando la operación finaliza.
   */
  delete(id: string): Promise<void>;
  /**
   * Obtiene todos los recordatorios de un usuario.
   *
   * @param userId - El ID del usuario cuyas recordatorios se desean obtener.
   * @returns Una promesa que resuelve con un array de recordatorios del usuario.
   */
  getByUser(userId: string): Promise<Reminders[]>;
  /**
   * Obtiene un recordatorio por su ID.
   *
   * @param id - El ID del recordatorio a obtener.
   * @returns Una promesa que resuelve con el recordatorio encontrado o null si no existe.
   */
  getById(id: string): Promise<Reminders | null>;
}
