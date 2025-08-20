export function scrollTo(ref) {
  ref.current?.scrollIntoView({
    behavior: "auto",
    block: "start",
  });
}
