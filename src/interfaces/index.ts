export interface StatsPonteNova {
  meta: Meta;
  bairros: Bairro[];
  focos: number[][];
  stats: Stats;
}

export interface Stats {
  totalFocos: string;
  mediaFocos: string;
  aumentoMesmoPeriodoPerc: string;
  aumentoMesmoPeriodoQtde: string;
  mesComMaiorNumero: string;
  mesComMaiorNumeroQtde: string;
}

export interface Bairro {
  name: string;
  value: number;
}

export interface Meta {
  tenant: string;
  start: string;
  end: string;
  swX: number;
  swY: number;
  neX: number;
  neY: number;
}
