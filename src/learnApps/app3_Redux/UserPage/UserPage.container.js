import { connect } from 'react-redux';

import { UserPage } from './UserPage';
import { loadUsers } from './redux/loadUsers';

const mapStateToProps = (state) => ({
  usersAreLoading: state.user.usersAreLoading,
});

const mapDispatchToProps = (dispatch) => ({
  loadUsers: () => loadUsers(dispatch),
});

const UserPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPage);

export { UserPageContainer };
