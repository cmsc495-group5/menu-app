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

    private OrdersRepository ordersRepository;
    private OrderItemService orderItemService;

    @Autowired
    public OrderServiceImpl(OrdersRepository ordersRepository, OrderItemService orderItemService) {
        this.ordersRepository = ordersRepository;
        this.orderItemService = orderItemService;
    }

    public Iterable<Order> getOrders(){
        return ordersRepository.findAll();
    }

    public Order saveOrder(Order order) {
        order.setUpdated(new Date().toString());
        OrderItem[] orderItems = new OrderItem[order.getOrderItems().length];

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
        Optional<Order> optSec = ordersRepository.findById(id);
        Order s = optSec.get();

        if (order.getStatus() != null) {
            s.setStatus(order.getStatus());
        }

        if (order.getOrderItems() != null) {
            s.setOrderItems(order.getOrderItems());
        }

        if (order.getTable() != null) {
            s.setTable(order.getTable());
        }

        s.setUpdated(new Date().toString());
        ordersRepository.save(s);
        return s;
    }

    public String deleteOrder(String id) {
        Optional<Order> optItem = ordersRepository.findById(id);
        Order sec = optItem.get();
        ordersRepository.delete(sec);
        return "";
    }

    @Override
    public Iterable<Order> getActiveOrders() {
        return ordersRepository.findByStatusNot(Order.COMPLETE);
    }
}
