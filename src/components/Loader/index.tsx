import { MoonLoader } from 'react-spinners'

import { Container } from './styles'

type Props = {
  size: number;
}

const Loader = ( { size }:Props ) => (
  <Container>
    <MoonLoader size={size} color="#fff" />
  </Container>
)

export default Loader
