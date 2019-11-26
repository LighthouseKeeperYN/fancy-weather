const utilities = require('../js/utilities');

test('TimeFormatter: converts timestamp into appropriate format', () => {
  const timeFormatter = new utilities.TimeFormatter('2019-11-26T13:01:40.235Z', 'en', 'Europe/Minsk');

  expect(timeFormatter.getDay()).toBe('Tue');
  expect(timeFormatter.getFullDay()).toBe('Tuesday');
  expect(timeFormatter.getDate()).toBe('26');
  expect(timeFormatter.getMonth()).toBe('November');
  expect(timeFormatter.getTime()).toBe('16:01');
  expect(timeFormatter.getHours()).toBe('16');
});

test('TimeFormatter: translates timestamp into appropriate language', () => {
  let timeFormatter = new utilities.TimeFormatter('2019-11-26T13:01:40.235Z', 'en', 'Europe/Minsk');

  expect(timeFormatter.getDay()).toBe('Tue');
  expect(timeFormatter.getFullDay()).toBe('Tuesday');
  expect(timeFormatter.getMonth()).toBe('November');

  timeFormatter = new utilities.TimeFormatter('2019-11-26T13:01:40.235Z', 'ru', 'Europe/Minsk');

  expect(timeFormatter.getDay()).toBe('вт');
  expect(timeFormatter.getFullDay()).toBe('вторник');
  expect(timeFormatter.getMonth()).toBe('ноябрь');

  timeFormatter = new utilities.TimeFormatter('2019-11-26T13:01:40.235Z', 'be', 'Europe/Minsk');

  expect(timeFormatter.getDay()).toBe('аў');
  expect(timeFormatter.getFullDay()).toBe('аўторак');
  expect(timeFormatter.getMonth()).toBe('лістапад');
});

test('TimeFormatter: offset time to appropriate timezone', () => {
  let timeFormatter = new utilities.TimeFormatter('2019-11-26T13:01:40.235Z', 'en', 'America/New_York');

  expect(timeFormatter.getDay()).toBe('Tue');
  expect(timeFormatter.getFullDay()).toBe('Tuesday');
  expect(timeFormatter.getTime()).toBe('8:01');
  expect(timeFormatter.getHours()).toBe('8');

  timeFormatter = new utilities.TimeFormatter('2019-11-26T13:01:40.235Z', 'en', 'Europe/London');

  expect(timeFormatter.getDay()).toBe('Tue');
  expect(timeFormatter.getFullDay()).toBe('Tuesday');
  expect(timeFormatter.getTime()).toBe('13:01');
  expect(timeFormatter.getHours()).toBe('13');

  timeFormatter = new utilities.TimeFormatter('2019-11-26T13:01:40.235Z', 'en', 'Asia/Hong_Kong');

  expect(timeFormatter.getDay()).toBe('Tue');
  expect(timeFormatter.getFullDay()).toBe('Tuesday');
  expect(timeFormatter.getTime()).toBe('21:01');
  expect(timeFormatter.getHours()).toBe('21');

  timeFormatter = new utilities.TimeFormatter('2019-11-26T13:01:40.235Z', 'en', 'Pacific/Auckland');

  expect(timeFormatter.getDay()).toBe('Wed');
  expect(timeFormatter.getFullDay()).toBe('Wednesday');
  expect(timeFormatter.getTime()).toBe('2:01');
  expect(timeFormatter.getHours()).toBe('2');
});

test('TimeFormatter: works without specifying locale and timezone', () => {
  const timeFormatter = new utilities.TimeFormatter('2019-11-26T13:01:40.235Z');

  expect(timeFormatter.getDay()).toBe('Tue');
  expect(timeFormatter.getFullDay()).toBe('Tuesday');
  expect(timeFormatter.getDate()).toBe('26');
  expect(timeFormatter.getMonth()).toBe('November');
  expect(timeFormatter.getTime()).toBe('16:01');
  expect(timeFormatter.getHours()).toBe('16');
});

test('imageApiKeySwitcher: returns correct key', () => {
  const keys = utilities.imageApiKeySwitcher;

  expect(keys.getKey()).toBe('9ffe44f80e9a5ea908c596de07f24b01145a79018daa172974cc961a79583a87');
});

test('imageApiKeySwitcher: switches keys correctly', () => {
  const keys = utilities.imageApiKeySwitcher;

  expect(keys.updateKey()).toBe('83dfa940e6a660199c7e7b4bf33902c1f04fc8e958272bd4308dcec97db1bfc3');
  keys.updateKey();
  keys.updateKey();
  keys.updateKey();
  keys.updateKey();
  keys.updateKey();
  expect(keys.updateKey()).toBe('265194590fc47c0b078386361fe497ea5c31d56d34ccf9bd1e0330fa4383df91');
  expect(keys.updateKey()).toBe('9ffe44f80e9a5ea908c596de07f24b01145a79018daa172974cc961a79583a87');
  expect(keys.updateKey()).toBe('83dfa940e6a660199c7e7b4bf33902c1f04fc8e958272bd4308dcec97db1bfc3');
});

test('decimalToDegrees: converts decimal correctly', () => {
  const decToDeg = utilities.decimalToDegrees;

  expect(decToDeg('51.1573').degrees).toBe('51');
  expect(decToDeg('51.1573').minutes).toBe('9');

  expect(decToDeg('-81.123123').degrees).toBe('-81');
  expect(decToDeg('-81.123123').minutes).toBe('7');

  expect(decToDeg('0').degrees).toBe('0');
  expect(decToDeg('0').minutes).toBe('0');
});

test('bgImageTemplate: returns correct bg style string', () => {
  const template = utilities.bgImageTemplate;

  expect(template.getString('123test')).toBe('linear-gradient(180deg, rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%) center center fixed, url(123test) no-repeat center center fixed');

  expect(template.getString(123)).toBe('linear-gradient(180deg, rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%) center center fixed, url(123) no-repeat center center fixed');
});

test('generateKeywords: returns appropriate keyword according to month', () => {
  const words = utilities.generateKeywords;

  expect(words(1)[0]).toBe('winter');
  expect(words(3)[0]).toBe('spring');
  expect(words('07')[0]).toBe('summer');
  expect(words('10')[0]).toBe('autumn');
});

test('generateKeywords: returns appropriate keyword according to day', () => {
  const words = utilities.generateKeywords;

  expect(words(null, 11)[1]).toBe('day');
  expect(words(null, 5)[1]).toBe('morning');
  expect(words(null, '18')[1]).toBe('evening');
  expect(words(null, '02')[1]).toBe('night');
});
