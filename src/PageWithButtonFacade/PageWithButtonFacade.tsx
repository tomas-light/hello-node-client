import { ChevronLeft } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import classes from './PageWithButtonFacade.module.scss';

const PageWithButtonFacade = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <BackButton
        onClick={() => {
          navigate('/');
        }}
        icon={{ color: 'secondary' }}
      />

      <CancelButton
        onClick={() => {
          console.log('cancel');
        }}
      />

      <ApplyButton
        onClick={() => {
          console.log('apply');
        }}
        applyText={'условия соглашения'}
      />
    </div>
  );

  // todo: replace with
  // return (
  //   <div className={classes.root}>
  //     <Button
  //       variant={'back'}
  //       onClick={() => {
  //         navigate('/');
  //       }}
  //       icon={{ color: 'secondary' }}
  //     />
  //
  //     <Button
  //       variant={'cancel'}
  //       onClick={() => {
  //         console.log('cancel');
  //       }}
  //     />
  //
  //     <Button
  //       variant={'apply'}
  //       onClick={() => {
  //         console.log('apply');
  //       }}
  //       applyText={'условия соглашения'}
  //     />
  //   </div>
  // );
};

// todo:
type ButtonProps = {
  variant: 'back' | 'cancel' | 'apply';
};

const Button = (props: ButtonProps) => {
  const {} = props;

  // todo:

  return <div></div>;
};

type BackButtonProps = {
  onClick: () => void;
  icon: SvgIconProps;
};

const BackButton = (props: BackButtonProps) => {
  const { onClick, icon } = props;

  return (
    <button className={classes.back} onClick={onClick}>
      <ChevronLeft {...icon} />
      Назад
    </button>
  );
};

type CancelButtonProps = {
  onClick: () => void;
};

const CancelButton = (props: CancelButtonProps) => {
  const { onClick } = props;

  return (
    <button className={classes.cancel} onClick={onClick}>
      Отмена
    </button>
  );
};

type ApplyButtonProps = {
  onClick: () => void;
  applyText: string;
};

const ApplyButton = (props: ApplyButtonProps) => {
  const { onClick, applyText } = props;

  return (
    <button className={classes.apply} onClick={onClick}>
      Принять {applyText}
    </button>
  );
};

export { PageWithButtonFacade };
