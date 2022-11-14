import { ChevronLeft } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import classes from './PageWithButtonFacade.module.scss';

type BackButtonProps = {
  onClick: () => void;
  icon: SvgIconProps;
};

const BackButton = (props: BackButtonProps) => {
  const { onClick, icon } = props;

  return (
    <button className={classes.back} onClick={onClick}>
      <ChevronLeft {...icon} />
      Back
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
      Cancel
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
      Accept {applyText}
    </button>
  );
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
        applyText={'the terms of agreement'}
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
  //       applyText={'the terms of agreement'}
  //     />
  //   </div>
  // );
};

export { PageWithButtonFacade };
