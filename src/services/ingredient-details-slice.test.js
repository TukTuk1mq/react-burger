import reducer, { setIngredientDetails, initialState } from './ingredient-details-slice';

describe('ingredient-details-slice', () => {
  const ingredient = { _id: '1', name: 'A', type: 'bun', proteins: 0, fat: 0, carbohydrates: 0, calories: 0, price: 10, image: '', image_mobile: '', image_large: '', __v: 0 };

  it('returns initial state', () => {
    expect(reducer(undefined, { type: 'X' })).toEqual(initialState);
  });

  it('sets ingredient details', () => {
    const state = reducer(initialState, setIngredientDetails(ingredient));
    expect(state.item).toEqual(ingredient);
  });
});
