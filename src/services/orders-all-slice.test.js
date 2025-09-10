import reducer, {
  connectionStart,
  connectionSuccess,
  connectionError,
  connectionClosed,
  messageReceived,
  clearError,
} from './orders-all-slice';
import { initialState } from './orders-all-slice';

describe('orders-all-slice', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, { type: 'UNKNOWN' })).toEqual(initialState);
  });

  it('handles connectionStart', () => {
    const s = reducer(initialState, connectionStart({ url: 'wss://test' }));
    expect(s.connecting).toBe(true);
    expect(s.error).toBe(null);
  });

  it('handles connectionSuccess', () => {
    const s = reducer({ ...initialState, connecting: true }, connectionSuccess());
    expect(s.connected).toBe(true);
    expect(s.connecting).toBe(false);
  });

  it('handles connectionError', () => {
    const s = reducer(initialState, connectionError('err'));
    expect(s.error).toBe('err');
    expect(s.connected).toBe(false);
    expect(s.connecting).toBe(false);
  });

  it('handles connectionClosed', () => {
    const s = reducer(
      { connected: true, connecting: true, error: 'e', message: { success: true, orders: [], total: 0, totalToday: 0 } },
      connectionClosed()
    );
    expect(s.connected).toBe(false);
    expect(s.connecting).toBe(false);
    expect(s.error).toBe(null);
    expect(s.message).toBe(null);
  });

  it('handles messageReceived', () => {
    const payload = { success: true, orders: [], total: 2, totalToday: 1 };
    const s = reducer(initialState, messageReceived(payload));
    expect(s.message).toEqual(payload);
  });

  it('handles clearError', () => {
    const s = reducer({ ...initialState, error: 'e' }, clearError());
    expect(s.error).toBe(null);
  });
});
