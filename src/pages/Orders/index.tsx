import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import {
  Container,
  Header,
  HeaderTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
  ExtraContainer,
  ExtraList,
} from './styles';

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  formattedValue: string;
  thumbnail_url: string;
  extras: ExtrasFood[];
}

interface ExtrasFood {
  id: number;
  name: string;
  value: number;
  quantity: number;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Food[]>([]);

  useEffect(() => {
    async function loadOrders(): Promise<void> {
      const response = await api.get<Food[]>('orders');

      const data = response.data.map(order => {
        return {
          ...order,
          formattedValue: formatValue(order.price),
        };
      });

      setOrders(data);
    }

    loadOrders();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>Meus pedidos</HeaderTitle>
      </Header>

      <FoodsContainer>
        <FoodList
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <>
              <Food key={item.id} activeOpacity={0.6}>
                <FoodImageContainer>
                  <Image
                    style={{ width: 88, height: 88 }}
                    source={{ uri: item.thumbnail_url }}
                  />
                </FoodImageContainer>
                <FoodContent>
                  <FoodTitle>{item.name}</FoodTitle>
                  <FoodDescription>{item.description}</FoodDescription>
                  <FoodPricing>{item.formattedValue}</FoodPricing>
                </FoodContent>
              </Food>
              {/* <ExtraList isExpanded>{item.formattedValue}</ExtraList>
              <ExtraContainer>
                <Icon size={15} color="#6C6C80" name="chevron-down" />
              </ExtraContainer> */}
              {/* <ExtraList>{item.formattedValue}</ExtraList> */}
            </>
          )}
        />
      </FoodsContainer>
    </Container>
  );
};

export default Orders;
