import 'styled-components';
import { StyleClosetTheme } from '../core/base/models/theme.model';

declare module 'styled-components' {
  export interface DefaultTheme extends StyleClosetTheme{}
}

export default styled
