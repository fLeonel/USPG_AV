export class User {
  constructor(
    public readonly id: string,
    public readonly carrera: string,
    public readonly createAt: Date,
    public readonly edad: number,
    public readonly name: string,
    public readonly email: string,
    public readonly user_pic: string
  ) { }

  static fromJson(id: string, json: Record<string, unknown>): User {
    return new User(
      id,
      json["carrera"] as string,
      (json["createAt"] as { toDate: () => Date }).toDate(),
      json["edad"] as number,
      json["name"] as string,
      json["email"] as string,
      json["user_pic"] as string
    );
  }
}
