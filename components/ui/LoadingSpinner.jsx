import { DotLoader } from 'react-spinners';

export default function LoadingSpinner(props) {
  return <DotLoader color='#7c5dfa' size={props.size || 80} />;
}
