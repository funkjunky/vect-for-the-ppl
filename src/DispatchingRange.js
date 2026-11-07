import { useDispatch } from 'react-redux';

function DispatchingRange(props) {
  const d = useDispatch();
  const { label, min, max, action } = props;
  const onChange = ({ target: { value }}) => d(action(value));

  return (
    <fieldset><legend>{label} | <input type="number" {...{ ...props, onChange }} /></legend>
      {min}<input type="range" {...{ ...props, onChange }} />{max}
    </fieldset>
  );
}

export default DispatchingRange;
