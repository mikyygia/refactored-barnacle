import { OvernightSleepData } from './overnight-sleep-data';

describe('OvernightSleepData', () => {
  it('should create an instance', () => {
    const startTime = new Date();
    const endTime = new Date();
    expect(new OvernightSleepData(startTime, endTime)).toBeTruthy();
  });
});