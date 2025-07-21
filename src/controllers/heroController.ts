import { Request, Response } from 'express';
import { HeroModel } from '../models/heroModel';
// Import Database type from its module (adjust the path as needed)
import { Database } from '../path/to/database';

export class HeroController {
  private heroModel: HeroModel;

  constructor(db: Database) {
    this.heroModel = new HeroModel(db);
  }

  public async createHero(req: Request, res: Response): Promise<void> {
    try {
      const heroData = req.body;
      const newHero = await this.heroModel.save(heroData);
      res.status(201).json(newHero);
    } catch (error) {
      res.status(500).json({ message: 'Error creating hero', error });
    }
  }

  public async getHero(req: Request, res: Response): Promise<void> {
    try {
      const heroId = req.params.id;
      const hero = await this.heroModel.find(heroId);
      if (hero) {
        res.status(200).json(hero);
      } else {
        res.status(404).json({ message: 'Hero not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving hero', error });
    }
  }
}