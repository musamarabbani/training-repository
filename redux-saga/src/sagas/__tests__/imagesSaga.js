import { getPage } from '../imagesSaga';

test('selector gives back the page', () => {
	const nextPage = 1;
	const state = { nextPage };
	const res = getPage(state);
	expect(res).toBe(nextPage);
});
