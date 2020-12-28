import { connect } from 'react-redux';

import { UserPage } from './UserPage';
import { UserActions } from './redux';

const mapStateToProps = (state) => ({
  usersAreLoading: state.user.usersAreLoading,
});

const mapDispatchToProps = (dispatch) => ({
  loadUsers: () => dispatch(UserActions.loadUsers()),
});

const UserPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPage);

export { UserPageContainer };
