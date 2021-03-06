import { describe, it } from 'mocha'
import { expect } from 'chai'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducerName } from '../../src/names'
import { sendPageView, sendEvent, SEND_EVENT } from '../../src/actions'
import reducer from '../../src/reducer'
import analyticsMiddleware from '../../src/analyticsMiddleware'
import { mockState1 } from '../_data/state'
import { mapStateToVariables } from '../_data/mapFunction'
import { eventPayloadMixins, eventMixins } from '../_data/mixins'
import { withEventPayload, withEventPayloadAfterPageView } from '../_data/middlewareOutput'
import { eventVariables, pageViewVariables } from '../_data/variables'


describe('without options, before pageView', () => {
  let store
  let testApply
  beforeEach(() => {
    const analytics = analyticsMiddleware({
    })
    store = createStore(combineReducers({
      [reducerName]: reducer,
      article: (state) => ({ ...state }),
      routing: (state) => ({ ...state }),
    }), mockState1, applyMiddleware(analytics))
    testApply = analytics(store)((action) => action)
  })

  it('with only variables', () => {
    const action = sendEvent(eventVariables)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayload['[],[],*'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = array', () => {
    const action = sendEvent(eventVariables, eventPayloadMixins)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayload['[],eventPayloadMixins,'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = true', () => {
    const action = sendEvent(eventVariables, true)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayload['*,true,'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = false', () => {
    const action = sendEvent(eventVariables, false)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayload['*,false,*'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = [], eventName="top:event1"', () => {
    const action = sendEvent(eventVariables, [], 'top:event1')
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayload['[],[],*'],
        eventName: 'top:event1',
      },
    })
  })
})


describe('without options, after pageView', () => {
  let store
  let testApply
  beforeEach(() => {
    const analytics = analyticsMiddleware({
    })
    store = createStore(combineReducers({
      [reducerName]: reducer,
      article: (state) => ({ ...state }),
      routing: (state) => ({ ...state }),
    }), mockState1, applyMiddleware(analytics))
    testApply = analytics(store)((action) => action)
    store.dispatch(sendPageView(pageViewVariables))
  })

  it('with only variables', () => {
    const action = sendEvent(eventVariables)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayloadAfterPageView['[],[],*'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = array', () => {
    const action = sendEvent(eventVariables, eventPayloadMixins)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayloadAfterPageView['[],eventPayloadMixins,'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = true', () => {
    const action = sendEvent(eventVariables, true)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayloadAfterPageView['*,true,'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = false', () => {
    const action = sendEvent(eventVariables, false)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayloadAfterPageView['*,false,*'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = [], eventName="top:event1"', () => {
    const action = sendEvent(eventVariables, [], 'top:event1')
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayloadAfterPageView['[],[],*'],
        eventName: 'top:event1',
      },
    })
  })
})

describe('with option eventMixins = array, before pageView', () => {
  let store
  let testApply
  beforeEach(() => {
    const analytics = analyticsMiddleware({
      eventMixins,
    })
    store = createStore(combineReducers({
      [reducerName]: reducer,
      article: (state) => ({ ...state }),
      routing: (state) => ({ ...state }),
    }), mockState1, applyMiddleware(analytics))
    testApply = analytics(store)((action) => action)
  })

  it('with only variables', () => {
    const action = sendEvent(eventVariables)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayload['eventMixins,[],'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = array', () => {
    const action = sendEvent(eventVariables, eventPayloadMixins)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayload['eventMixins,eventPayloadMixins,'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = true', () => {
    const action = sendEvent(eventVariables, true)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayload['*,true,'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = false', () => {
    const action = sendEvent(eventVariables, false)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayload['*,false,*'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = [], eventName="top:event1"', () => {
    const action = sendEvent(eventVariables, [], 'top:event1')
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayload['eventMixins,[],'],
        eventName: 'top:event1',
      },
    })
  })
})

describe('with option eventMixins = array, after pageView', () => {
  let store
  let testApply
  beforeEach(() => {
    const analytics = analyticsMiddleware({
      eventMixins,
    })
    store = createStore(combineReducers({
      [reducerName]: reducer,
      article: (state) => ({ ...state }),
      routing: (state) => ({ ...state }),
    }), mockState1, applyMiddleware(analytics))
    testApply = analytics(store)((action) => action)
    store.dispatch(sendPageView(pageViewVariables))
  })

  it('with only variables', () => {
    const action = sendEvent(eventVariables)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayloadAfterPageView['eventMixins,[],'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = array', () => {
    const action = sendEvent(eventVariables, eventPayloadMixins)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayloadAfterPageView['eventMixins,eventPayloadMixins,'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = true', () => {
    const action = sendEvent(eventVariables, true)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayloadAfterPageView['*,true,'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = false', () => {
    const action = sendEvent(eventVariables, false)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayloadAfterPageView['*,false,*'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = [], eventName="top:event1"', () => {
    const action = sendEvent(eventVariables, [], 'top:event1')
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayloadAfterPageView['eventMixins,[],'],
        eventName: 'top:event1',
      },
    })
  })
})

describe('with option mapStateToVariables, before pageView', () => {
  let store
  let testApply
  beforeEach(() => {
    const analytics = analyticsMiddleware({
      mapStateToVariables,
    })
    store = createStore(combineReducers({
      [reducerName]: reducer,
      article: (state) => ({ ...state }),
      routing: (state) => ({ ...state }),
    }), mockState1, applyMiddleware(analytics))
    testApply = analytics(store)((action) => action)
  })

  it('with only variables', () => {
    const action = sendEvent(eventVariables)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayload['[],[],*'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = array', () => {
    const action = sendEvent(eventVariables, eventPayloadMixins)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayload['[],eventPayloadMixins,mapStateToVariables'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = true', () => {
    const action = sendEvent(eventVariables, true)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayload['*,true,mapStateToVariables'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = false', () => {
    const action = sendEvent(eventVariables, false)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayload['*,false,*'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = [], eventName="top:event1"', () => {
    const action = sendEvent(eventVariables, [], 'top:event1')
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayload['[],[],*'],
        eventName: 'top:event1',
      },
    })
  })
})

describe('with option mapStateToVariables, after pageView', () => {
  let store
  let testApply
  beforeEach(() => {
    const analytics = analyticsMiddleware({
      mapStateToVariables,
    })
    store = createStore(combineReducers({
      [reducerName]: reducer,
      article: (state) => ({ ...state }),
      routing: (state) => ({ ...state }),
    }), mockState1, applyMiddleware(analytics))
    testApply = analytics(store)((action) => action)
    store.dispatch(sendPageView(pageViewVariables))
  })

  it('with only variables', () => {
    const action = sendEvent(eventVariables)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayloadAfterPageView['[],[],*'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = array', () => {
    const action = sendEvent(eventVariables, eventPayloadMixins)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayloadAfterPageView['[],eventPayloadMixins,mapStateToVariables'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = true', () => {
    const action = sendEvent(eventVariables, true)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayloadAfterPageView['*,true,mapStateToVariables'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = false', () => {
    const action = sendEvent(eventVariables, false)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayloadAfterPageView['*,false,*'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = [], eventName="top:event1"', () => {
    const action = sendEvent(eventVariables, [], 'top:event1')
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayloadAfterPageView['[],[],*'],
        eventName: 'top:event1',
      },
    })
  })
})

describe('with option eventMixins = array, mapStateToVariables, before pageView', () => {
  let store
  let testApply
  beforeEach(() => {
    const analytics = analyticsMiddleware({
      eventMixins,
      mapStateToVariables,
    })
    store = createStore(combineReducers({
      [reducerName]: reducer,
      article: (state) => ({ ...state }),
      routing: (state) => ({ ...state }),
    }), mockState1, applyMiddleware(analytics))
    testApply = analytics(store)((action) => action)
  })

  it('with only variables', () => {
    const action = sendEvent(eventVariables)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayload['eventMixins,[],mapStateToVariables'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = array', () => {
    const action = sendEvent(eventVariables, eventPayloadMixins)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayload['eventMixins,eventPayloadMixins,mapStateToVariables'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = true', () => {
    const action = sendEvent(eventVariables, true)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayload['*,true,mapStateToVariables'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = false', () => {
    const action = sendEvent(eventVariables, false)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayload['*,false,*'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = [], eventName="top:event1"', () => {
    const action = sendEvent(eventVariables, [], 'top:event1')
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayload['eventMixins,[],mapStateToVariables'],
        eventName: 'top:event1',
      },
    })
  })
})


describe('with option eventMixins = array, mapStateToVariables, after pageView', () => {
  let store
  let testApply
  beforeEach(() => {
    const analytics = analyticsMiddleware({
      eventMixins,
      mapStateToVariables,
    })
    store = createStore(combineReducers({
      [reducerName]: reducer,
      article: (state) => ({ ...state }),
      routing: (state) => ({ ...state }),
    }), mockState1, applyMiddleware(analytics))
    testApply = analytics(store)((action) => action)
    store.dispatch(sendPageView(pageViewVariables))
  })

  it('with only variables', () => {
    const action = sendEvent(eventVariables)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayloadAfterPageView['eventMixins,[],mapStateToVariables'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = array', () => {
    const action = sendEvent(eventVariables, eventPayloadMixins)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayloadAfterPageView['eventMixins,eventPayloadMixins,mapStateToVariables'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = true', () => {
    const action = sendEvent(eventVariables, true)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayloadAfterPageView['*,true,mapStateToVariables'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = false', () => {
    const action = sendEvent(eventVariables, false)
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayloadAfterPageView['*,false,*'],
        eventName: null,
      },
    })
  })

  it('with variables, mixins = [], eventName="top:event1"', () => {
    const action = sendEvent(eventVariables, [], 'top:event1')
    const action2 = testApply(action)
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: withEventPayloadAfterPageView['eventMixins,[],mapStateToVariables'],
        eventName: 'top:event1',
      },
    })
  })
})

describe('with composeEventName', () => {
  const createMiddleware = (options) => {
    const analytics = analyticsMiddleware({
      ...options,
      composeEventName: (composedVariables, state) =>
      `${composedVariables.prop15 || '0'}:${composedVariables.prop10 || '0'}:${composedVariables.events[0]}`,
    })
    const store = createStore(combineReducers({
      [reducerName]: reducer,
      article: (state) => ({ ...state }),
      routing: (state) => ({ ...state }),
    }), mockState1, applyMiddleware(analytics))
    const testApply = analytics(store)((action) => action)
    return { store, testApply, analytics }
  }
  it('without other options, no payload mixins, after pageView', () => {
    const { testApply, store } = createMiddleware({})
    store.dispatch(sendPageView(pageViewVariables))
    const action = sendEvent(eventVariables)
    const action2 = testApply(action)
    const expectedVars = withEventPayloadAfterPageView['[],[],*']
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: expectedVars,
        eventName: `0:0:${expectedVars.events[0]}`,
      },
    })
  })

  it('with mapStateToVariables, payload mixins = array, before pageView', () => {
    const { testApply } = createMiddleware({ mapStateToVariables })
    const action = sendEvent(eventVariables, eventPayloadMixins)
    const action2 = testApply(action)
    const expectedVars = withEventPayload['[],eventPayloadMixins,mapStateToVariables']
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: expectedVars,
        eventName: `0:${expectedVars.prop10}:${expectedVars.events[0]}`,
      },
    })
  })

  it('with eventMixins, no payload mixins, after pageView', () => {
    const { testApply, store } = createMiddleware({ eventMixins })
    store.dispatch(sendPageView(pageViewVariables))
    const action = sendEvent(eventVariables)
    const action2 = testApply(action)
    const expectedVars = withEventPayloadAfterPageView['eventMixins,[],']
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: expectedVars,
        eventName: `${expectedVars.prop15}:0:${expectedVars.events[0]}`,
      },
    })
  })

  it('with eventMixins and mapStateToVariables, payload mixins = true, after pageView', () => {
    const { testApply, store } = createMiddleware({ mapStateToVariables, eventMixins })
    store.dispatch(sendPageView(pageViewVariables))
    const action = sendEvent(eventVariables, true)
    const action2 = testApply(action)
    const expectedVars = withEventPayloadAfterPageView['*,true,mapStateToVariables']
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: expectedVars,
        eventName: `${expectedVars.prop15}:${expectedVars.prop10}:${expectedVars.events[0]}`,
      },
    })
  })

  it('with eventMixins and mapStateToVariables, mixins = [], eventName="top:event1"', () => {
    const { testApply, store } = createMiddleware({ mapStateToVariables, eventMixins })
    store.dispatch(sendPageView(pageViewVariables))
    const action = sendEvent(eventVariables, [], 'top:event1')
    const action2 = testApply(action)
    const expectedVars = withEventPayloadAfterPageView['eventMixins,[],mapStateToVariables']
    expect(action2).to.deep.equal({
      type: SEND_EVENT,
      payload: {
        variables: expectedVars,
        eventName: 'top:event1',
      },
    })
  })
})

