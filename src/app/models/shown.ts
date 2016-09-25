export interface Shown {
  title?: boolean;
  poster?: boolean;
  releaseYear: boolean;
  synopsis?: boolean;
}

export const showAll: Shown = { poster: true, releaseYear: true, synopsis: true, title: true };

export const showDefault: Shown = {
  poster: false,
  releaseYear: false,
  synopsis: false,
  title: false,
};

export function allShown(shown: Shown) {
  return compareShown(shown, showAll);
}

export function compareShown(first: Shown, second: Shown): boolean {
  if (!first || !second) {
    return false;
  }
  return (first.poster === second.poster
    && first.releaseYear === second.releaseYear
    && first.synopsis === second.synopsis
    && first.title === second.title);
}

export function assign(current: Shown, newValue: any): Shown {
  let returnVal = <Shown>{
    poster: false,
    releaseYear: false,
    synopsis: false,
    title: false,
  };
  for (let key in returnVal) {
    if (newValue.hasOwnProperty(key)) {
      returnVal[key] = newValue[key];
    } else {
      returnVal[key] = current[key];
    }
  }
  return returnVal;
}
