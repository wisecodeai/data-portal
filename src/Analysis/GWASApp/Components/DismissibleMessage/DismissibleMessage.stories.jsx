import React, { useState, useReducer } from 'react';
import { rest } from 'msw';

import DismissibleMessage from './DismissibleMessage';

export default {
  title: 'Tests3/GWASApp/DismissibleMessage/DismissibleMessage',
  component: DismissibleMessage,
};

const Template = (args) => (
  <div className='GWASApp'>
    <h1 style={{ textAlign: 'center' }}>Dismissible Message</h1>
    <DismissibleMessage {...args} />
  </div>
);

export const success = Template.bind({});
success.args = {
  title: 'Congratulations on your submission for Job Name userInputName',
  description: 'Dismissible Message Description',
  messageType: 'success',
};

export const warning = Template.bind({});
warning.args = {
  title: 'Warning',
  messageType: 'warning',
};

export const caution = Template.bind({});
caution.args = {
  title: 'Caution',
  messageType: 'caution',
};
