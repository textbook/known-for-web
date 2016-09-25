export interface Shown {
  title?: boolean;
  poster?: boolean;
  releaseYear: boolean;
  synopsis?: boolean;
}

export const showAll = <Shown>{ title: true, poster: true, releaseYear: true, synopsis: true };

export const showDefault = <Shown>{ releaseYear: true, synopsis: true };

export function allShown(shown: Shown) {
  return compareShown(shown, showAll);
}

export function compareShown(first: Shown, second: Shown): boolean {
  if (!first || !second) {
    return false;
  }
  return (first.title === second.title
    && first.poster === second.poster
    && first.releaseYear === second.releaseYear
    && first.synopsis === second.synopsis);
}
