import _ from 'lodash/fp';
import {Component, createElement} from 'react'

const _connectRealm = (realmObject, mapRealmSchema, WrappedComponent) => {

  const subscription = {
    callback: () => {
    },
    listener: (data, {deletions, insertions, modifications}) => {
      if ([deletions, insertions, modifications].every(_.isEmpty)) return;
      subscription.callback(data, {deletions, insertions, modifications})
    }
  };

  class RealmConnect extends Component {
    constructor(props, context) {
      super(props, context);

      const realmProps = mapRealmSchema(realmObject, props);

      this.superProps = _.keys(realmProps || {})
        .reduce((a, k) => ({
            ...a,
            [k]: realmProps[k]
          }
        ), {});
      this.initSubscription();
    }

    componentWillUnmount() {
      this.removeListeners();
    }

    initSubscription() {
      subscription.callback = (data) => {
        this.onStateChange(data);
      };

      _.keys(this.superProps).forEach((k) => {
        this.superProps[k].addListener(subscription.listener);
      });
    }

    onStateChange() {
      //forComponentUpdate
      this.setState({});
    }

    removeListeners() {
      _.keys(this.superProps).forEach((k) => {
        this.superProps[k].removeListener(subscription.listener);
      });
    }

    render() {
      return createElement(
        WrappedComponent, {
          changeTime: +new Date,
          ...this.props,
          ...this.superProps
        }
      );
    }
  }

  RealmConnect.WrappedComponent = WrappedComponent;
  RealmConnect.displayName = `RealmConnect(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return RealmConnect;
};

const connectRealm = _.curry(_connectRealm);

export default connectRealm;