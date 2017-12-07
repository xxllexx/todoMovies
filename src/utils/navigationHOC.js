import _ from 'lodash';
import React, {Component, createFactory} from 'react';
import {toClass} from 'recompose'

const navigationHOC = events => BaseComponent => {
  const Factory = toClass(BaseComponent);
  class NavClass extends Component {
    constructor(props) {
      super(props);
      if (this.props.navigator) {
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
      }
    }

    onNavigatorEvent(event) {
      if (events[event.id] && _.isFunction(events[event.id])) {

        events[event.id](this, event, {
          ...this.props,
          ...this.state
        }, this.ref);
      }
    }

    render() {
      return <Factory {...{...this.props, ...this.state}} ref={r => this.ref = r}/>
    }
  }
  return NavClass
};

export default navigationHOC;