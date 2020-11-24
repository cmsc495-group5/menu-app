package com.resturant.menu.services;

import com.resturant.menu.models.OrderItem;

import java.util.Optional;

public interface OrderItemService {
    Iterable<OrderItem> getOrders();
    OrderItem saveOrder(OrderItem order);
    Optional<OrderItem> getOrderById(String id);
    OrderItem updateOrder(String id, OrderItem order);
    String deleteOrder(String id);
}
