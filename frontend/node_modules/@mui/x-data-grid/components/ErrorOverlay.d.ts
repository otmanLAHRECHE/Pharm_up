import * as React from 'react';
import { GridOverlayProps } from './containers/GridOverlay';
export interface ErrorOverlayProps extends GridOverlayProps {
    message?: string;
    hasError: boolean;
    errorInfo: any;
}
export declare const ErrorOverlay: React.ForwardRefExoticComponent<ErrorOverlayProps & React.RefAttributes<HTMLDivElement>>;
