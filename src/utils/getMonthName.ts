export default function getMonthName(month: number | string) {

  try {
    
    if (typeof month === "string") {
    
      month = parseInt(month, 10);
    }
    
    return [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ][month-1];
  } catch (error) {
    return "nenhum"
  }
}