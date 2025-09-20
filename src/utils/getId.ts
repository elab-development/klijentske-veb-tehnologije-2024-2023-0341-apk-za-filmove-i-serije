export type AnyId = string | number;

export function getId(x: { id?: AnyId; _id?: AnyId; movieId?: AnyId }): string {
  const raw = x.id ?? x._id ?? x.movieId;
  if (raw === undefined || raw === null) {
    throw new Error('Item nema id/_id/movieId polje.');
  }
  return String(raw);
}
