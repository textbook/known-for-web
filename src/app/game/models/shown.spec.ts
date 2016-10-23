import { allShown, compareShown, showAll, showDefault, Shown } from './shown';

describe('Model: Shown', () => {
  let example: Shown;

  beforeEach(() => {
    example = { poster: true, title: false, releaseYear: true, synopsis: false };
  });

  describe('compareShown function', () => {
    it('should return true for two objects with the same attributes', () => {
      expect(compareShown(example, example)).toBeTruthy();
    });

    it('should return false for two objects with any different attributes', () => {
      expect(compareShown(example, showAll)).toBeFalsy();
      expect(compareShown(example, showDefault)).toBeFalsy();
    });

    it('should return false if either object is null or undefined', () => {
      expect(compareShown(example, null)).toBeFalsy();
      expect(compareShown(undefined, example)).toBeFalsy();
    });
  });

  describe('allShown function', () => {
    it('should return true for showAll', () => {
      expect(allShown(showAll)).toBeTruthy();
    });

    it('should return false for other Shown objects', () => {
      expect(allShown(example)).toBeFalsy();
      expect(allShown(showDefault)).toBeFalsy();
    });
  });
});
