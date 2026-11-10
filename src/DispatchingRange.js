import { useDispatch } from 'react-redux';

// Note action overwrites onChange
function DispatchingRange(props) {
  const d = useDispatch();
  let { label, min, max, action, onChange, ...otherProps } = props;
  onChange = onChange || (({ target: { value }}) => d(action(value)));

  return (
    <fieldset><legend>{label} | <input type="number" {...{ ...otherProps, min, max, onChange }} /></legend>
      {min}<input type="range" {...{ ...otherProps, onChange }} />{max}
    </fieldset>
  );
}

export default DispatchingRange;
