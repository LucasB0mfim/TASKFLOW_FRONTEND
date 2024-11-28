
import gitHub from '../../assets/images/gitHubIcon.png';

import { Container } from './styles'

type Props = {
  link: string;
  destiny: string;
  margin?: string;
}

const GitHub = ({ link, destiny, margin }: Props) => (
  <Container style={{marginTop: margin}}>
    <a href={link} target='_blank' rel="noreferrer">
      <img src={gitHub} alt="GitHub"/>
      <p>Veja o código {destiny}</p>
    </a>
  </Container>
)

export default GitHub
