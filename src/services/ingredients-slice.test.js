import reducer, { fetchIngredients } from './ingredients-slice';

describe('ingredients-slice', () => {
  const initial = { items: [], isLoading: false, error: null };

  it('should return initial state on unknown action', () => {
    expect(reducer(undefined, { type: 'UNKNOWN' })).toEqual(initial);
  });

  it('should handle fetchIngredients.pending', () => {
    const state = reducer(initial, { type: fetchIngredients.pending.type });
    expect(state).toEqual({ items: [], isLoading: true, error: null });
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const payload = [{ _id: '1', name: 'A', type: 'bun', proteins: 0, fat: 0, carbohydrates: 0, calories: 0, price: 10, image: '', image_mobile: '', image_large: '', __v: 0 }];
    const state = reducer(initial, { type: fetchIngredients.fulfilled.type, payload });
    expect(state.items).toEqual(payload);
    expect(state.isLoading).toBe(false);
  });

  it('should handle fetchIngredients.rejected', () => {
    const state = reducer(initial, { type: fetchIngredients.rejected.type, payload: 'err', error: { message: 'err' } });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('err');
  });
});
