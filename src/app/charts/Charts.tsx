import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

import { IEntityPerMonth } from './models';
import classes from './Charts.css';

interface IChartsProps {
    studies: IEntityPerMonth[];
    users: IEntityPerMonth[];
}

type Props = IChartsProps;

const Charts = (props: Props) => {
    const { studies, users } = props;

    return (
        <div className={classes.container}>
            <div className={classes.charts}>
                <LineChart width={600} height={300} data={studies}>
                    <Line type="monotone" dataKey={nameof<IEntityPerMonth>(o => o.startAt)} stroke="#8884d8"/>
                    <CartesianGrid stroke="#ccc"/>
                    <XAxis dataKey={nameof<IEntityPerMonth>(o => o.startAt)}/>
                    <YAxis dataKey={nameof<IEntityPerMonth>(o => o.name)}/>
                </LineChart>
            </div>

            <div className={classes.list}>
                <div>
                    {studies.map((entity) => (
                        <p key={`study-${entity.name}`}>
                            <b>{entity.name}</b>
                            <span>{entity.startAt.toLocaleDateString()}</span>
                        </p>
                    ))}
                </div>

                <div>
                    {users.map((entity) => (
                        <p key={`user-${entity.name}`}>
                            <b>{entity.name}</b>
                            <span>{entity.startAt.toLocaleDateString()}</span>
                        </p>
                    ))}
                </div>
            </div>

            <img className={classes.task} src="/img/chart-tasks.png"/>
        </div>
    );
};

export { Charts };
