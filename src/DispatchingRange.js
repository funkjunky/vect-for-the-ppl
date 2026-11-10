import { useDispatch } from 'react-redux';

function DispatchingRange(props) {
  const d = useDispatch();
  const { label, min, max, action, ...otherProps } = props;
  const onChange = ({ target: { value }}) => d(action(value));

  return (
    <fieldset><legend>{label} | <input type="number" {...{ ...otherProps, min, max, onChange }} /></legend>
      {min}<input type="range" {...{ ...otherProps, onChange }} />{max}
    </fieldset>
  );
}

export default DispatchingRange;
