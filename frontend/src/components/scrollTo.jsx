export function scrollTo(ref) {
  ref.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
