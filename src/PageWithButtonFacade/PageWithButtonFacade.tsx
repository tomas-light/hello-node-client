import { ChevronLeft } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import classes from './PageWithButtonFacade.module.scss';
import { ComponentProps, VFC } from "react";

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

const variants = {
  back: BackButton,
  cancel: CancelButton,
  apply: ApplyButton
}

type ButtonVariant = keyof typeof variants;
type ButtonProps<T extends ButtonVariant> = { variant: T } & ComponentProps<typeof variants[T]>;

const Button = <T extends ButtonVariant>(props: ButtonProps<T>) => {
  const { variant, ...componentProps } = props;

  if (!variant) {
    return null;
  }

  const Component = variants[variant] as VFC<typeof componentProps> | undefined;

  if (!Component) {
    throw new Error(`variant (${variant}) is not supported`);
  }

  return <Component {...componentProps} />;
};

const PageWithButtonFacade = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <Button
        variant={'back'}
        onClick={() => {
          navigate('/');
        }}
        icon={{ color: 'secondary' }}
      />

      <Button
        variant={'cancel'}
        onClick={() => {
          console.log('cancel');
        }}
      />

      <Button
        variant={'apply'}
        onClick={() => {
          console.log('apply');
        }}
        applyText={'the terms of agreement'}
      />
    </div>
  );
};

export { PageWithButtonFacade };
