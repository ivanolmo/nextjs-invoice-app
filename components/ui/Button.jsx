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
      {props.icon ? (
        <div className='bg-[white] p-[11px] flex rounded-full'>
          {props.icon}
        </div>
      ) : null}
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
