import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import classes from './HomePage.module.scss';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.myClassName}>
      <p>Домашняя страница</p>

      <MyComponent text="какой-то текст" />

      <Button onClick={() => navigate('/another-page')}>Открыть другую страницу</Button>

      <Button onClick={() => navigate('/buttons')}>Buttons</Button>
    </div>
  );
};

// так можно описать, какой набор полей принимает твой компонент
type Props = {
  text: string;
};

const MyComponent = (props: Props) => {
  const { text } = props;

  return (
    <Typography>
      {text} {/* вместо этог оможно просто написать {props.text} */}
    </Typography>
  );
};

export { HomePage };
