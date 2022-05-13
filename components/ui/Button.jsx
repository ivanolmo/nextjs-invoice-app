import { classNames } from '../../lib/formatUtils';

export default function Button(props) {
  return (
    <div
      onClick={() => props.onClick?.()}
      className={classNames(
        props.containerClasses,
        'flex justify-center items-center h-12 rounded-full cursor-pointer'
      )}
      disabled={props.disabled}
    >
      <div
        className={classNames(
          props.textClasses,
          'flex justify-center items-center text-xs font-bold tracking-tight'
        )}
      >
        {props.buttonText}
      </div>
    </div>
  );
}
