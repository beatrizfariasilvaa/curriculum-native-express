const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

export function formatarMes(data) {
  if (!data) {
    return "atual";
  }
  const [ano, mes] = data.split("-");
  return `${MESES[Number(mes) - 1]}/${ano}`;
}

export function formatarPeriodo(inicio, fim) {
  return `${formatarMes(inicio)} – ${formatarMes(fim)}`;
}