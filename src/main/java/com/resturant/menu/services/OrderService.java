/*
 * file Name: OrderService.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Service interface for Orders
 */

package com.resturant.menu.services;

import com.resturant.menu.models.Order;

import java.util.Optional;

public interface OrderService {
    Iterable<Order> getOrders();

    Order saveOrder(Order order);

    Optional<Order> getOrderById(String id);

    Order updateOrder(String id, Order order);

    String deleteOrder(String id);

    Iterable<Order> getActiveOrders();
}
