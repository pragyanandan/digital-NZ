import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({ handleClick }) {
  //const [value, setValue] = React.useState('');
  return (
    <Autocomplete
      onChange={(event: any, value: any) => handleClick(value.id)}
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Please Select ..." />
      )}
    />
  );
}
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: 'CTV Squad', id: 'CTV' },
  { label: 'Cloud Squad', id: 'DTCS' },
  { label: 'Play Squad', id: 'PLAY' },
  { label: '1News Squad', id: 'ALN' },
  { label: 'Apps Squad', id: 'ALA' },
];
