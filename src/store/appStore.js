import * as remx from 'remx';

const state = remx.state({
  appLoaded: false
});

export const setters = remx.setters({
  setAppStatus(isLoaded) {
    state.appLoaded = isLoaded;
  }
});

export const getters = remx.getters({
  isAppLoaded: () => state.appLoaded
});