import {useState} from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { useNodeInfo } from 'src/hooks/useNodeInfo';

import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function NodeAddView() {
  const theme = useTheme();

  const { addNodeMutation } = useNodeInfo();

  const router = useRouter();

  const handleBackButton = () => {
    router.back();
  };

  const [nodeAddressState, setNodeAddressState] = useState('')
  const [locationState, setLocationState] = useState('');
  const [latitudeState, setLatitudeState] = useState('');
  const [longitudeState, setLongitudeState] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch(name) {
        case 'nodeAddress':
            setNodeAddressState(value);
            break;
        case 'location':
            setLocationState(value);
            break;
        case 'latitude':
            setLatitudeState(value);
            break;
        case 'longitude':
            setLongitudeState(value);
            break;
        default:
            break;
    }
  };

  const handleCompleteButton = () => {

    const newNode = {
      nodeAddress: nodeAddressState,
      location: locationState,
      latitude: latitudeState,
      longitude: longitudeState
    };

    addNodeMutation.mutate(newNode);
    router.back();
  };

  const renderForm = (
    <>
      <Stack spacing={3} sx={{ my: 3 }}>
        <TextField name="nodeAddress" label="노드 번호" value={nodeAddressState} onChange={handleChange} />

        <TextField name="location" label="노드 명칭" value={locationState} onChange={handleChange}/>

        <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Typography variant="h6">제목</Typography> */}
            <TextField name="latitude" label="위도" value={latitudeState} onChange={handleChange}/>
            <TextField name="longitude" label="경도" value={longitudeState} onChange={handleChange}/>
        </Stack>

      </Stack>

      <Stack direction="row" alignItems="center" spacing={2}>
        <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={handleBackButton}
        >
            취소
        </LoadingButton>

        <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={handleCompleteButton}
        >
            완료
        </LoadingButton>

        </Stack>

      
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
        //   imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">노드 정보 추가</Typography>

          <Divider sx={{ my: 3 }}>
            {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography> */}
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
