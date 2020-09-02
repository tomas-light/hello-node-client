import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

import { IEntityPerMonth } from './models';
import './Charts.css';

interface IChartsProps {
    studies: IEntityPerMonth[];
    users: IEntityPerMonth[];
}

type Props = IChartsProps;

const Charts = (props: Props) => {
    const { studies, users } = props;

    return (
        <>
            <LineChart width={600} height={300} data={studies}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
            </LineChart>
            <div>
                {studies.map((entity) => (
                    <p key={`study-${entity.name}`}>
                        {entity.name}
                    </p>
                ))}
            </div>

            <div>
                {users.map((entity) => (
                    <p key={`user-${entity.name}`}>
                        {entity.name}
                    </p>
                ))}
            </div>
        </>
    );
    return (
        <h1 className="title">hello</h1>
    );
};

export { Charts };
