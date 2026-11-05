import './Palette.css';

function Palette({ colours, value, onChange }) {
  const ColourSpan = ({ colour }) => (
    <span
      style={{ backgroundColor: colour, border: (value === colour ? 'black 2px dotted' : 'none')}}
      onClick={() => onChange(colour)}
    >&nbsp;</span>
  );
  return (<div className="Palette">
    {colours.map(colour =>
      <ColourSpan colour={colour} key={colour} />
    )}
  </div>);
}

export default Palette;
