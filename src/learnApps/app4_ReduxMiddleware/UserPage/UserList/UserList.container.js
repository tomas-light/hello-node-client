import { connect } from 'react-redux';
import { UserList } from './UserList';

const mapStateToProps = (state) => ({
  users: state.user.users,
});

const UserListContainer = connect(
  mapStateToProps,
)(UserList);

export { UserListContainer };
