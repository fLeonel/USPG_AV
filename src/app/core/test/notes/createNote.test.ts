import { describe, it, expect, vi } from "vitest";
import { CreateNote } from "@/usecases/notes/createNote";
import { Note } from "@/domain/entities/notes";
import type { NoteRepository } from "@/domain/repositories/noteRepository";

describe("CreateNote", () => {
  const getMockRepo = (): NoteRepository => ({
    create: vi.fn().mockResolvedValue(undefined),
    update: vi.fn(),
    delete: vi.fn(),
    getById: vi.fn(),
    getAllByUser: vi.fn(),
  });

  it("should call repository.create with a valid note", async () => {
    const mockRepo = getMockRepo();
    const useCase = new CreateNote(mockRepo);

    const validNote = new Note(
      "note_id",
      "user_id",
      "Title",
      "Content",
      false,
      [],
      new Date(),
      new Date(),
    );

    await useCase.execute(validNote);

    expect(mockRepo.create).toHaveBeenCalledTimes(1);
    expect(mockRepo.create).toHaveBeenCalledWith(validNote);
  });

  it("should throw if the note has invalid id", async () => {
    const mockRepo = getMockRepo();
    const useCase = new CreateNote(mockRepo);

    const invalidNote = new Note(
      false as unknown as string,
      "user_id",
      "Title",
      "Content",
      false,
      [],
      new Date(),
      new Date(),
    );

    await expect(() => useCase.execute(invalidNote)).rejects.toThrowError();
    expect(mockRepo.create).not.toHaveBeenCalled();
  });

  it("should not call repository.create if title is empty", async () => {
    const mockRepo = getMockRepo();
    const useCase = new CreateNote(mockRepo);

    const note = new Note(
      "note_id",
      "user_id",
      "",
      "Content",
      false,
      [],
      new Date(),
      new Date(),
    );

    await expect(() => useCase.execute(note)).rejects.toThrowError();
    expect(mockRepo.create).not.toHaveBeenCalled();
  });
});
