export function getFutureDate(monthsToAdd: number): string {
  if (monthsToAdd < 1 || monthsToAdd > 12) {
    throw new Error("Le chiffre doit être compris entre 1 et 12");
  }

  const months: string[] = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const currentDate: Date = new Date();
  const futureDate: Date = new Date(currentDate);
  futureDate.setMonth(currentDate.getMonth() + monthsToAdd);

  const day: number = futureDate.getDate();
  const month: string = months[futureDate.getMonth()];
  const year: number = futureDate.getFullYear();

  return `${day} ${month} ${year}`;
}