function telephoneFormat(telephone: string | null): string | null {
  return telephone
    ? telephone // (17) 98803-9217
        .replaceAll("(", "") // (17 98803-9217
        .replaceAll(")", "") //
        .replaceAll(" ", "")
        .replaceAll("-", "")
    : null;
}

export { telephoneFormat };
