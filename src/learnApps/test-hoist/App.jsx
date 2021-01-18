import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

function MyComponent() {
  return (
    <div>
      <p>My component</p>
    </div>
  );
}

MyComponent.myStaticProp = 123;

function AnotherComponent() {
  return (
    <div>
      <p>Another component</p>
    </div>
  );
}

function Container() {
  return hoistNonReactStatics(AnotherComponent, MyComponent);
}

const App = () => {
  const Result = Container();
  const Result2 = Result();
  debugger;
  return (
    <div>
      <MyComponent/>
      <AnotherComponent/>
      <Container/>

      <br/>

      <Result2 />
      <Result />
      {Container()}
    </div>
  );
}

export { App };
