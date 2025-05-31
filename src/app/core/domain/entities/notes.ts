/**
 * Representa una nota creada por un usuario.
 */
export class Note {
  /**
   * Crea una nueva instancia de la clase Note.
   * 
   * @param id - Identificador único de la nota.
   * @param userId - ID del usuario que creó la nota.
   * @param title - Título de la nota.
   * @param content - Contenido de la nota.
   * @param isPinned - Indica si la nota está fijada.
   * @param tags - Lista de etiquetas asociadas a la nota.
   * @param createdAt - Fecha de creación de la nota.
   * @param updatedAt - Fecha de última modificación de la nota.
   */
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly title: string,
    public readonly content: string,
    public readonly isPinned: boolean,
    public readonly tags: string[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  /**
   * Crea una instancia de `Note` a partir de un objeto JSON.
   * 
   * @param id - Identificador único de la nota.
   * @param json - Objeto con los datos provenientes de una fuente externa (por ejemplo, Firebase).
   * @returns Una nueva instancia de `Note`.
   */
  static fromJson(id: string, json: Record<string, unknown>): Note {
    return new Note(
      id,
      json["user_id"] as string,
      json["title"] as string,
      json["content"] as string,
      json["isPinned"] as boolean,
      json["tags"] as string[],
      (json["createAt"] as { toDate: () => Date }).toDate(),
      (json["updateAt"] as { toDate: () => Date }).toDate(),
    );
  }

  /**
   * Convierte la instancia de `Note` en un objeto JSON listo para ser guardado.
   * 
   * @returns Objeto con las propiedades serializadas.
   */
  toJson(): Record<string, unknown> {
    return {
      user_id: this.userId,
      title: this.title,
      content: this.content,
      isPinned: this.isPinned,
      tags: this.tags,
      createAt: this.createdAt,
      updateAt: this.updatedAt,
    };
  }
}
