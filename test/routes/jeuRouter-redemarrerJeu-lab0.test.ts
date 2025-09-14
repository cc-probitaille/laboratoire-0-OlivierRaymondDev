import supertest from 'supertest';
import 'jest-extended';
import app from '../../src/app';
import { jeuRoutes } from '../../src/routes/jeuRouter';

const request = supertest(app);

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  beforeAll(async () =>{
    jeuRoutes.controleurJeu.demarrerJeu("Joueur1")
    jeuRoutes.controleurJeu.demarrerJeu("Joueur2")
  });

  it("devrait appeler redemarrerJeu avec succesès", async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu');
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });

  it("devrait supprimer toutes les instances de joueurs", async () => {
    await request.get('/api/v1/jeu/redemarrerJeu');
    const joueursJSON = jeuRoutes.controleurJeu.joueurs;
    const joueursArray = JSON.parse(joueursJSON);
    expect(joueursArray.length).toBe(0);
  });
});

