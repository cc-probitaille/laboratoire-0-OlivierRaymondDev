import 'jest-extended';
import { JeuDeDes } from '../../src/core/jeuDeDes';

describe('JeuDeDesTest', () => {
  let jdd: JeuDeDes;
  beforeEach(async () => {
    jdd = new JeuDeDes();
  });

  it(`devrait n'avoir aucun joueur au début`, async () => {
    expect(jdd.joueurs).toEqual("[]")
  })

  it('devrait retourner une valeur entre 3 et 18', () => {
    for (let i = 0; i < 200; i++) {
      expect(jdd.brasser()).toBeWithin(3, 19);
    }
  })

  it('devrait retourner finalement toutes les valeurs entre 3 et 18', () => {
    const resultats = new Set();
    // Brasse les dés jusqu'à 2000 fois mais sors de la boucle une fois que tous les résultats possibles sont obtenus.
    for (let i = 0; i < 2000 && resultats.size <16; i++) {
      resultats.add(jdd.brasser())
    }
    expect(resultats.size).toBe(16);
    for (let i = 3; i < 17; i++) {
      expect(resultats.has(i + 1)).toBeTrue();
    }
    // cas particuliers
    expect(resultats.has(1)).toBeFalsy();
    expect(resultats.has(2)).toBeFalsy();
    expect(resultats.has(19)).toBeFalsy();
  })
});
