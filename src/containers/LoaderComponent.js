import {compose, branch, renderComponent} from 'recompose'
import {connect} from 'remx';
import {AbsolutePreloader} from '../components/AbsolutePreloader';
import {getters as appStore} from '../store/appStore'

const spinnerWhileLoading = isLoading =>
  branch(
    isLoading,
    renderComponent(AbsolutePreloader)
  );

const enhance = spinnerWhileLoading(props => !props.appLoaded);

const mapStateToProps = () => ({
  appLoaded: appStore.isAppLoaded()
});

export default compose(
  connect(mapStateToProps),
  enhance
);