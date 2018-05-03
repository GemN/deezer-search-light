import React from 'react';
import FontAwesome from 'react-fontawesome';
import { pure } from 'recompose';

const Icon = props => (<FontAwesome {...props} />);

export default pure(Icon);
