import { ChevronLeft } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';
import React, { ComponentProps, FC } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './PageWithButtonFacade.module.scss';

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
        applyText={'условия соглашения'}
      />

      <Button
        variant={'apply1'}
        onClick={() => {
          console.log('apply1');
        }}
        applyText={'условия соглашения 1'}
      />
    </div>
  );
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

// type ButtonProps = {
//   variant: 'back' | 'cancel' | 'apply';
// };
// type ButtonVariants = ButtonProps['variant'];

const components = {
  back: BackButton,
  cancel: CancelButton,
  apply: ApplyButton,
  apply1: ApplyButton,
};
type ButtonKeys = keyof typeof components;

type A<T extends ButtonKeys> = typeof components[T];
type B<T extends ButtonKeys> = ComponentProps<A<T>> & { variant: T };

const Button = <T extends ButtonKeys>(props: B<T>) => {
  const { variant, ...rest } = props;

  if (!variant) {
    throw new Error(`Invalid variant ${variant}`);
  }

  const Component = components[variant] as FC<typeof rest>;
  if (!Component) {
    throw new Error('Some error occurred');
  }
  return <Component {...rest} />;
};

export { PageWithButtonFacade };
