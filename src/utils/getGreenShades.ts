export default function getGreenShades(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);

  return values.map((value) => {
    const factor = (value - min) / (max - min); // Normaliza o valor entre 0 e 1
    const greenValue = Math.floor(186 * (1 - factor) + 70 * factor); // Ajusta o brilho da cor verde
    return `rgb(74, ${greenValue}, 106)`; // Baseado na cor #4AB96A
  });
}
