import { format as fmt } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatDate(date, format) {
  if (!date) return "";

  return capitalizeFirstLetter(
    fmt(date, format ?? "dd/MM/yyyy HH:mm", { locale: ptBR }),
  );
}
