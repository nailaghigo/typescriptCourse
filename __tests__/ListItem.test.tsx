import 'react-native';
import React from 'react';
import ListItem from '../src/Components/Shared/ListItem/ListItem';
import {fireEvent, render} from '@testing-library/react-native';

const id = 3;
const name = 'naila';
const email = 'naila@asd.com';

describe('ListItem', () => {
  it('renders correctly', async () => {
    const onDelete = jest.fn();
    const onUpdate = jest.fn();

    const {getByText, getByTestId} = render(
      <ListItem
        id={id}
        name={name}
        email={email}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />,
    );

    const deleteButton = getByTestId('delete-button');
    fireEvent.press(deleteButton);

    const updateButton = getByTestId('update-button');
    fireEvent.press(updateButton);

    expect(getByText('Name:')).toBeTruthy();
    expect(getByText(`${name}`)).toBeTruthy();
    expect(onDelete).toBeCalled();
    expect(onUpdate).toBeCalled();
  });
});
