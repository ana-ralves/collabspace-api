function telephoneFormat(telephone: string | null): string | undefined {
  return telephone
    ? telephone // (17) 98803-9217
        .replaceAll("(", "") // (17 98803-9217
        .replaceAll(")", "") //
        .replaceAll(" ", "")
        .replaceAll("-", "")
    : undefined;
}

export { telephoneFormat };
