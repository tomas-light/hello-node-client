import React from 'react';

const emptyFn = () => undefined;

const Button = props => {
  const { component, onClick, menu } = props;
  const hasMenu = menu && menu.length;

  return (
    <div
      onClick={hasMenu ? emptyFn : onClick}
    >
      {component}

      {!hasMenu ? null : (
        <ul>
          {menu.map((item, index) =>
            <li key={`sub-button-${index}`}>
              <Button
                component={item.component}
                onClick={item.onClick}
                menu={item.menu}
              />
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export { Button };
