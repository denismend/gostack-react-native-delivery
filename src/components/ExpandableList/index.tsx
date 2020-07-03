/* Example of Expandable ListView in React Native */
import React, { Component, useState } from 'react';
import { Text, ViewProps } from 'react-native';

import { Container, ExtraContent, ExtraName } from './styles';

interface ExtrasFood {
  id: number;
  name: string;
  value: number;
  quantity: number;
}

interface ExpandableItemProps extends ViewProps {
  isExpanded?: boolean;
  extras: ExtrasFood[];
}

const ExpandableItemComponent: React.FC<ExpandableItemProps> = ({
  isExpanded,
  extras,
  ...rest
}) => {
  return (
    <Container {...rest}>
      {isExpanded && (
        <ExtraContent>
          {extras.map(({ name }) => (
            <ExtraName>{name}</ExtraName>
          ))}
        </ExtraContent>
      )}
    </Container>
  );
};

export default ExpandableItemComponent;
