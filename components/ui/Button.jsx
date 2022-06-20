import { classNames } from '../../utils/utils';

export default function Button(props) {
  return (
    <div
      onClick={() => props.onClick?.()}
      className={classNames(
        props.containerClasses,
        'flex justify-center items-center h-11 md:h-12 rounded-full cursor-pointer'
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
          'flex justify-center items-center text-xs lg:text-sm font-bold tracking-tight'
        )}
      >
        {props.buttonText}
      </div>
    </div>
  );
}
