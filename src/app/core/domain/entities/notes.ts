export class Note {
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
