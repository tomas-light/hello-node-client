import { connect } from 'react-redux';
import React from 'react';
import { Actions } from './redux';

const mapStateToProps = (state) => ({
  data: state.someStore.myData,
});

const mapDispatchToProps = (dispatch) => ({
  loadData: () => dispatch(Actions.loadMyData()),
});

const Button = connect(
  mapStateToProps,
  mapDispatchToProps,
)(({ data, loadData }) => (
  <div onClick={loadData}>
    counter: {data}
  </div>
));

export { Button };
