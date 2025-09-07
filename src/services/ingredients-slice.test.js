import reducer, { fetchIngredients, initialState } from './ingredients-slice';

describe('ingredients-slice', () => {
  it('should return initial state on unknown action', () => {
    expect(reducer(undefined, { type: 'UNKNOWN' })).toEqual(initialState);
  });

  it('should handle fetchIngredients.pending', () => {
    const state = reducer(initialState, { type: fetchIngredients.pending.type });
    expect(state).toEqual({ ...initialState, isLoading: true, error: null });
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const payload = [{ _id: '1', name: 'A', type: 'bun', proteins: 0, fat: 0, carbohydrates: 0, calories: 0, price: 10, image: '', image_mobile: '', image_large: '', __v: 0 }];
    const state = reducer(initialState, { type: fetchIngredients.fulfilled.type, payload });
    expect(state.items).toEqual(payload);
    expect(state.isLoading).toBe(false);
  });

  it('should handle fetchIngredients.rejected', () => {
    const state = reducer(initialState, { type: fetchIngredients.rejected.type, payload: 'err', error: { message: 'err' } });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('err');
  });
});
