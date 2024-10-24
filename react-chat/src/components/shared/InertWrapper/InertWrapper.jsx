import PropTypes from 'prop-types';

export function InertWrapper({ enabled, children }) {
  return <div inert={enabled ? '' : undefined}>{children}</div>;
}

InertWrapper.propTypes = {
  enabled: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
