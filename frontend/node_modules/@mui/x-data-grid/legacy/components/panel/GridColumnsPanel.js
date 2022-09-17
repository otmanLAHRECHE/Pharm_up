import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var _excluded = ["sort"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { switchClasses } from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import { gridColumnDefinitionsSelector, gridColumnVisibilityModelSelector } from '../../hooks/features/columns/gridColumnsSelector';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { GridDragIcon } from '../icons';
import { GridPanelContent } from './GridPanelContent';
import { GridPanelFooter } from './GridPanelFooter';
import { GridPanelHeader } from './GridPanelHeader';
import { GridPanelWrapper } from './GridPanelWrapper';
import { GRID_EXPERIMENTAL_ENABLED } from '../../constants/envConstants';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['columnsPanel'],
    columnsPanelRow: ['columnsPanelRow']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

var GridColumnsPanelRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'ColumnsPanel',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.columnsPanel;
  }
})(function () {
  return {
    padding: '8px 0px 8px 8px'
  };
});
var GridColumnsPanelRowRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'ColumnsPanelRow',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.columnsPanelRow;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return _defineProperty({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1px 8px 1px 7px'
  }, "& .".concat(switchClasses.root), {
    marginRight: theme.spacing(0.5)
  });
});
var GridIconButtonRoot = styled(IconButton)({
  justifyContent: 'flex-end'
});
var collator = new Intl.Collator();

function GridColumnsPanel(props) {
  var _rootProps$components, _rootProps$components3, _rootProps$components4;

  var apiRef = useGridApiContext();
  var searchInputRef = React.useRef(null);
  var columns = useGridSelector(apiRef, gridColumnDefinitionsSelector);
  var columnVisibilityModel = useGridSelector(apiRef, gridColumnVisibilityModelSelector);
  var rootProps = useGridRootProps();

  var _React$useState = React.useState(''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      searchValue = _React$useState2[0],
      setSearchValue = _React$useState2[1];

  var ownerState = {
    classes: rootProps.classes
  };
  var classes = useUtilityClasses(ownerState);

  var sort = props.sort,
      other = _objectWithoutProperties(props, _excluded);

  var sortedColumns = React.useMemo(function () {
    switch (sort) {
      case 'asc':
        return _toConsumableArray(columns).sort(function (a, b) {
          return collator.compare(a.headerName || a.field, b.headerName || b.field);
        });

      case 'desc':
        return _toConsumableArray(columns).sort(function (a, b) {
          return -collator.compare(a.headerName || a.field, b.headerName || b.field);
        });

      default:
        return columns;
    }
  }, [columns, sort]);

  var toggleColumn = function toggleColumn(event) {
    var _ref3 = event.target,
        field = _ref3.name;
    apiRef.current.setColumnVisibility(field, columnVisibilityModel[field] === false);
  };

  var toggleAllColumns = React.useCallback(function (isVisible) {
    if (apiRef.current.unstable_caches.columns.isUsingColumnVisibilityModel) {
      if (isVisible) {
        return apiRef.current.setColumnVisibilityModel({});
      }

      return apiRef.current.setColumnVisibilityModel(Object.fromEntries(columns.filter(function (col) {
        return col.hideable !== false;
      }).map(function (col) {
        return [col.field, false];
      })));
    } // TODO v6: Remove


    return apiRef.current.updateColumns(columns.map(function (col) {
      if (col.hideable !== false) {
        return {
          field: col.field,
          hide: !isVisible
        };
      }

      return col;
    }));
  }, [apiRef, columns]);
  var handleSearchValueChange = React.useCallback(function (event) {
    setSearchValue(event.target.value);
  }, []);
  var currentColumns = React.useMemo(function () {
    if (!searchValue) {
      return sortedColumns;
    }

    var searchValueToCheck = searchValue.toLowerCase();
    return sortedColumns.filter(function (column) {
      return (column.headerName || column.field).toLowerCase().indexOf(searchValueToCheck) > -1;
    });
  }, [sortedColumns, searchValue]);
  React.useEffect(function () {
    searchInputRef.current.focus();
  }, []);
  return /*#__PURE__*/_jsxs(GridPanelWrapper, _extends({}, other, {
    children: [/*#__PURE__*/_jsx(GridPanelHeader, {
      children: /*#__PURE__*/_jsx(rootProps.components.BaseTextField, _extends({
        label: apiRef.current.getLocaleText('columnsPanelTextFieldLabel'),
        placeholder: apiRef.current.getLocaleText('columnsPanelTextFieldPlaceholder'),
        inputRef: searchInputRef,
        value: searchValue,
        onChange: handleSearchValueChange,
        variant: "standard",
        fullWidth: true
      }, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseTextField))
    }), /*#__PURE__*/_jsx(GridPanelContent, {
      children: /*#__PURE__*/_jsx(GridColumnsPanelRoot, {
        className: classes.root,
        children: currentColumns.map(function (column) {
          var _rootProps$components2;

          return /*#__PURE__*/_jsxs(GridColumnsPanelRowRoot, {
            className: classes.columnsPanelRow,
            children: [/*#__PURE__*/_jsx(FormControlLabel, {
              control: /*#__PURE__*/_jsx(rootProps.components.BaseSwitch, _extends({
                disabled: column.hideable === false,
                checked: columnVisibilityModel[column.field] !== false,
                onClick: toggleColumn,
                name: column.field,
                size: "small"
              }, (_rootProps$components2 = rootProps.componentsProps) == null ? void 0 : _rootProps$components2.baseSwitch)),
              label: column.headerName || column.field
            }), !rootProps.disableColumnReorder && GRID_EXPERIMENTAL_ENABLED && /*#__PURE__*/_jsx(GridIconButtonRoot, {
              draggable: true,
              "aria-label": apiRef.current.getLocaleText('columnsPanelDragIconLabel'),
              title: apiRef.current.getLocaleText('columnsPanelDragIconLabel'),
              size: "small",
              disabled: true,
              children: /*#__PURE__*/_jsx(GridDragIcon, {})
            })]
          }, column.field);
        })
      })
    }), /*#__PURE__*/_jsxs(GridPanelFooter, {
      children: [/*#__PURE__*/_jsx(rootProps.components.BaseButton, _extends({
        onClick: function onClick() {
          return toggleAllColumns(false);
        }
      }, (_rootProps$components3 = rootProps.componentsProps) == null ? void 0 : _rootProps$components3.baseButton, {
        children: apiRef.current.getLocaleText('columnsPanelHideAllButton')
      })), /*#__PURE__*/_jsx(rootProps.components.BaseButton, _extends({
        onClick: function onClick() {
          return toggleAllColumns(true);
        }
      }, (_rootProps$components4 = rootProps.componentsProps) == null ? void 0 : _rootProps$components4.baseButton, {
        children: apiRef.current.getLocaleText('columnsPanelShowAllButton')
      }))]
    })]
  }));
}

process.env.NODE_ENV !== "production" ? GridColumnsPanel.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  sort: PropTypes.oneOf(['asc', 'desc'])
} : void 0;
export { GridColumnsPanel };