import * as moment from 'moment';

import { AgePipe } from './age.pipe';

describe('Pipe: Age', () => {
  let pipe = new AgePipe();

  it('should convert a ISO8601 string to number of years', () => {
    let thirty_eight = moment().subtract(38, 'years').subtract(2, 'weeks');
    expect(pipe.transform(thirty_eight.format('YYYY-MM-DDT00:00:00Z'))).toEqual('38 years old');
  });

  it('should round the number of years up', () => {
    let thirty_eight = moment().subtract(38, 'years').subtract(50, 'weeks');
    expect(pipe.transform(thirty_eight.format('YYYY-MM-DDT00:00:00Z'))).toEqual('38 years old');
  });

  it('should convert null to an empty string', () => {
    expect(pipe.transform(null)).toEqual('');
  });
});
