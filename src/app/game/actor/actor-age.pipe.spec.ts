import { ActorAgePipe } from './actor-age.pipe';
import { Actor } from '../models';

describe('Pipe: ActorAge', () => {
  let pipe: ActorAgePipe;

  beforeEach(() => {
    pipe = new ActorAgePipe();
  });

  it('should return a living actor\'s age', () => {
    expect(pipe.transform(<Actor>{ name: 'John Actor', age: 35, alive: true })).toBe('35 years old');
  });

  it('should return a deceased actor\'s age at death', () => {
    expect(pipe.transform(<Actor>{ name: 'John Actor', age: 35, alive: false })).toBe('Died aged 35');
  });

  it('should assume an actor is alive', () => {
    expect(pipe.transform(<Actor>{ name: 'John Actor', age: 35 })).toBe('35 years old');
  });

  it('should handle missing data', () => {
    expect(pipe.transform(<Actor>{ name: 'John Actor' })).toBe('Age unknown');
    expect(pipe.transform(undefined)).toBe('Age unknown');
  });
});
