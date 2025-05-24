import { Note } from "@/core/domain/entities/notes";
import { NoteRepository } from "@/core/domain/repositories/noteRepository";
import { createNoteService } from "@/core/services/noteService"; // o el path real

describe("noteService (unit)", () => {
  const mockRepo: jest.Mocked<NoteRepository> = {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getById: jest.fn(),
    getAllByUser: jest.fn(),
  };

  const service = createNoteService(mockRepo); // ← INYECTAMOS MOCK

  it("should get a note by ID", async () => {
    const note = new Note(
      "xyz",
      "user-1",
      "Title",
      "Content",
      false,
      [],
      new Date(),
      new Date(),
    );

    mockRepo.getById.mockResolvedValueOnce(note);

    const result = await service.getNoteById("xyz");

    expect(mockRepo.getById).toHaveBeenCalledWith("xyz");
    expect(result).toEqual(note);
  });

  it("should delete a note", async () => {
    mockRepo.delete.mockResolvedValueOnce(undefined);

    await service.deleteNote("abc");

    expect(mockRepo.delete).toHaveBeenCalledWith("abc");
  });
});
