import { classNames } from '../../utils';

export default function Button(props) {
  return (
    <button
      type={props.type || 'button'}
      onClick={() => props.onClick?.()}
      className={classNames(
        props.containerClasses,
        'flex justify-center items-center h-11 md:h-12 rounded-full cursor-pointer'
      )}
      disabled={props.disabled}
    >
      {props.icon && props.icon}
      <div
        className={classNames(
          props.textClasses,
          'flex justify-center items-center text-xs lg:text-sm font-bold tracking-tight'
        )}
      >
        {props.buttonText}
      </div>
    </button>
  );
}
