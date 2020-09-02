import React from 'react';

import { Charts } from './Charts';
import { IEntityPerMonth } from './models';

function Entity(name: string, year: number, month: number, day: number) {
    this.name = name;
    this.startAt = new Date(year, month, day);
}



const ChartsContainer = () => {

    return (
        <Charts
            studies={[
                new Entity('study 1', 2019, 1, 1),
                new Entity('study 2', 2019, 1, 10),
                new Entity('study 3', 2019, 1, 20),
                new Entity('study 4', 2019, 1, 30),
                new Entity('study 5', 2019, 2, 30),
            ]}
            users={[
                {
                    name: 'User 1',
                    startAt: new Date(2019, 3, 1),
                },
                {
                    name: 'User 2',
                    startAt: new Date(2019, 4, 1),
                },
            ]}
        />
    );
};

export { ChartsContainer };
