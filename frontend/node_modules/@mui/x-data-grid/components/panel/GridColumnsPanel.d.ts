/// <reference types="react" />
import { GridPanelWrapperProps } from './GridPanelWrapper';
export interface GridColumnsPanelProps extends GridPanelWrapperProps {
    sort?: 'asc' | 'desc';
}
declare function GridColumnsPanel(props: GridColumnsPanelProps): JSX.Element;
declare namespace GridColumnsPanel {
    var propTypes: any;
}
export { GridColumnsPanel };
