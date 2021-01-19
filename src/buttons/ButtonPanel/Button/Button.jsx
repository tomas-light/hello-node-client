import React from 'react';

const Button = props => {
  const { Component, menu } = props;
  const hasMenu = menu && menu.length;

  return (
    <div>
      <Component/>

      {!hasMenu ? null : (
        <ul>
          {menu.map((item, index) =>
            <li key={`sub-button-${index}`}>
              <Button
                Component={item.Component}
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
