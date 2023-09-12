export function createMessage(type = "error", message = "Ooops! An error has occured.") {
  const html = `<div class="message" ${type}">${message}</div>`;

  return html;
}
