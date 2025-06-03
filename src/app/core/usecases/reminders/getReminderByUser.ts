import { ReminderRepository } from "@/core/domain/repositories/reminderRepository";
import { Reminders } from "@/core/domain/entities/reminders";

/**
 * Caso de uso: Obtener todos los recordatorios de un usuario.
 *
 * Esta clase encapsula la lógica para recuperar todos los recordatorios asociados a un usuario específico.
 */
export class GetReminderByUser {
  /**
   * Crea una instancia del caso de uso `GetReminderByUser`.
   *
   * @param repo - Repositorio encargado de las operaciones relacionadas con recordatorios.
   */
  constructor(private repo: ReminderRepository) {}

  /**
   * Ejecuta el caso de uso para obtener los recordatorios de un usuario.
   *
   * @param userId - ID del usuario cuyas recordatorios se desean obtener.
   * @returns Una promesa que resuelve con un arreglo de recordatorios del usuario.
   */
  async execute(userId: string): Promise<Reminders[]> {
    return await this.repo.getByUser(userId);
  }
}
