import './Palette.css';

function Palette({ colours }) {
  const ColourSpan = ({ colour }) => (
    <span style={{ backgroundColor: colour }}>&nbsp;</span>
  );
  return (<div className="Palette">
    {colours.map(colour =>
      <ColourSpan colour={colour} />
    )}
  </div>);
}

export default Palette;
