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

enum ButtonVariants {
  back = 'back',
  cancel = 'cancel',
  apply = 'apply'
}

type ButtonVariant = 'back' | 'cancel' | 'apply';
type ButtonVariantProp<T extends ButtonVariant> = { variant: T };
type ButtonModel<T extends ButtonVariant, V> = ButtonVariantProp<T> & V;

const back = 'back';

type ButtonProps =
  | ButtonModel<'back', BackButtonProps>
  | ButtonModel<'cancel', CancelButtonProps>
  | ButtonModel<'apply', ApplyButtonProps>;

const Button = (props: ButtonProps) => {
  const { variant } = props;

  if (variant === ButtonVariants.back) {
    const { onClick, icon } = props;
    return <BackButton onClick={onClick} icon={icon} />;
  }

  if (variant === ButtonVariants.cancel) {
    const { onClick } = props;
    return <CancelButton onClick={onClick} />;
  }

  if (variant === ButtonVariants.apply) {
    const { onClick, applyText } = props;
    return <ApplyButton onClick={onClick} applyText={applyText} />;
  }

  return <div>Button {variant} is not supported</div>;
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
