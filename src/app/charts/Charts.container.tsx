import React from 'react';

import { Charts } from './Charts';

const ChartsContainer = () => {

    return (
        <Charts
            studies={[
                {
                    name: 'study 1',
                    startAt: new Date(2019, 1, 1),
                },
                {
                    name: 'study 2',
                    startAt: new Date(2019, 1, 1),
                },
            ]}
            users={[
                {
                    name: 'User 1',
                    startAt: new Date(2019, 1, 1),
                },
                {
                    name: 'User 2',
                    startAt: new Date(2019, 1, 1),
                },
            ]}
        />
    );
};

export { ChartsContainer };
