/*
 * file Name: OrderServiceImpl.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Implementation of the Order service interface
 */

package com.resturant.menu.services;

import com.resturant.menu.models.Order;
import com.resturant.menu.models.OrderItem;
import com.resturant.menu.repositories.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrdersRepository ordersRepository;
    private final OrderItemService orderItemService;

    @Autowired
    public OrderServiceImpl(OrdersRepository ordersRepository, OrderItemService orderItemService) {
        this.ordersRepository = ordersRepository;
        this.orderItemService = orderItemService;
    }

    public Iterable<Order> getOrders() {
        return ordersRepository.findAll();
    }

    public Order saveOrder(Order order) {
        String placed = new Date().toString();
        order.setUpdated(placed);
        order.setPlaced(placed);
        OrderItem[] orderItems = new OrderItem[order.getOrderItems().length];
        // save order items so they can be attached to the order
        for (int i = 0; i < order.getOrderItems().length; i++) {
            orderItems[i] = orderItemService.saveOrder(order.getOrderItems()[i]);
        }
        order.setOrderItems(orderItems);
        ordersRepository.save(order);
        return order;
    }

    public Optional<Order> getOrderById(String id) {
        return ordersRepository.findById(id);
    }

    public Order updateOrder(String id, Order order) {
        Optional<Order> optOrder = ordersRepository.findById(id);
        Order orderToUpdate = optOrder.get();

        if (order.getStatus() != null) {
            orderToUpdate.setStatus(order.getStatus());
        }

        if (order.getOrderItems() != null) {
            orderToUpdate.setOrderItems(order.getOrderItems());
        }

        if (order.getTable() != null) {
            orderToUpdate.setTable(order.getTable());
        }
        if (order.getCanceled() != null) {
            orderToUpdate.setCanceled(order.getCanceled());
        }

        orderToUpdate.setUpdated(new Date().toString());
        ordersRepository.save(orderToUpdate);
        return orderToUpdate;
    }

    public String deleteOrder(String id) {
        Optional<Order> optItem = ordersRepository.findById(id);
        Order order = optItem.get();
        ordersRepository.delete(order);
        return "";
    }

    @Override
    public Iterable<Order> getActiveOrders() {
        return ordersRepository.findByStatusNot(Order.COMPLETE);
    }
}
